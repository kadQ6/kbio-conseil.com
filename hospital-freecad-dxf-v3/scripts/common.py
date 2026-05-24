"""
common.py - Utilitaires partages par tous les scripts de generation hospitaliere.

Responsabilites :
- chargement / validation legere du JSON projet ;
- chargement bibliotheque equipements ;
- definitions des calques professionnels (noms, couleurs ACI DXF, RGB) ;
- helpers geometriques 2D (rotation, polygone, bbox) ;
- resolution des coupures de murs par portes/fenetres pour le trace 2D ;
- conversion d'unites (m vers mm pour DXF).

Aucune dependance a FreeCAD : ce module est utilisable en pur Python.
Unites de travail : metres. Les exports en mm sont faits par les scripts d'export.
"""

from __future__ import annotations

import json
import math
import os
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

# ---------------------------------------------------------------------------
# Resolution des chemins du projet
# ---------------------------------------------------------------------------

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DATA_DIR     = PROJECT_ROOT / "data"
EXPORTS_DIR  = PROJECT_ROOT / "exports"

DEFAULT_LAYOUT_FILE  = DATA_DIR / "hospital_layout_example.json"
DEFAULT_LIBRARY_FILE = DATA_DIR / "equipment_library.json"
DEFAULT_TEMPLATES_FILE = DATA_DIR / "room_templates.json"


# ---------------------------------------------------------------------------
# Definition centralisee des calques
# ---------------------------------------------------------------------------
# Le code ACI (AutoCAD Color Index) est utilise par DXF. RGB sert pour FreeCAD
# et les rendus PNG/PDF. Lineweight en 1/100 mm conformement a DXF.

@dataclass(frozen=True)
class Layer:
    name: str
    aci: int
    rgb: tuple[float, float, float]
    lineweight_mm_x100: int = 25
    description: str = ""


LAYERS: dict[str, Layer] = {
    "A-MURS":               Layer("A-MURS",               7,  (0.15, 0.15, 0.15), 50, "Murs porteurs et cloisons"),
    "A-PORTES":             Layer("A-PORTES",             3,  (0.20, 0.60, 0.20), 25, "Portes (vantail + arc d'ouverture)"),
    "A-FENETRES":           Layer("A-FENETRES",           5,  (0.20, 0.40, 0.90), 25, "Fenetres"),
    "A-CIRCULATION":        Layer("A-CIRCULATION",        9,  (0.85, 0.85, 0.85), 18, "Zones de circulation"),
    "B-EQUIPEMENTS-MEDICAUX": Layer("B-EQUIPEMENTS-MEDICAUX", 1, (0.85, 0.10, 0.10), 25, "Equipements biomedicaux"),
    "B-MOBILIER":           Layer("B-MOBILIER",           42, (0.60, 0.45, 0.30), 18, "Mobilier non medical"),
    "T-ELECTRICITE":        Layer("T-ELECTRICITE",        2,  (0.95, 0.85, 0.10), 18, "Prises et reseaux electriques"),
    "T-FLUIDES-MEDICAUX":   Layer("T-FLUIDES-MEDICAUX",   4,  (0.10, 0.70, 0.70), 25, "Fluides medicaux O2 / Air / Vide"),
    "T-PLOMBERIE":          Layer("T-PLOMBERIE",          150,(0.10, 0.40, 0.85), 18, "Plomberie eau / evacuation"),
    "T-VENTILATION":        Layer("T-VENTILATION",        211,(0.60, 0.30, 0.85), 18, "Ventilation CTA / extraction"),
    "M-MAINTENANCE":        Layer("M-MAINTENANCE",        51, (0.95, 0.50, 0.10), 13, "Zones de degagement maintenance"),
    "Z-ZONES-PROPRES":      Layer("Z-ZONES-PROPRES",      131,(0.85, 0.95, 0.85), 13, "Zones propres / asepsie"),
    "Z-ZONES-SALES":        Layer("Z-ZONES-SALES",        24, (0.95, 0.85, 0.85), 13, "Zones sales / decontamination"),
    "TXT-LABELS":           Layer("TXT-LABELS",           7,  (0.10, 0.10, 0.10), 13, "Labels textuels (pieces, equipements)"),
    "COT-COTATIONS":        Layer("COT-COTATIONS",        6,  (0.85, 0.10, 0.85), 13, "Cotations dimensionnelles"),
    "A-PIECES":             Layer("A-PIECES",             253,(0.95, 0.95, 0.95), 9,  "Remplissage / contour des pieces"),
    "Z-AXES":               Layer("Z-AXES",               8,  (0.40, 0.40, 0.40), 9,  "Axes et reperes du batiment"),
}


def layer_for_equipment(family: str) -> str:
    """Retourne le calque cible selon la famille d'equipement."""
    if family in ("MOBILIER",):
        return "B-MOBILIER"
    if family in ("TECHNIQUE",) :
        # les prises sont electriques ou fluides
        return "B-EQUIPEMENTS-MEDICAUX"
    return "B-EQUIPEMENTS-MEDICAUX"


def layer_for_terminal(type_id: str) -> str:
    """Affecte les prises a leur calque technique selon leur type_id."""
    if type_id.startswith("EQ-ELEC"):
        return "T-ELECTRICITE"
    if type_id.startswith(("EQ-OXY", "EQ-VAC", "EQ-AIR")):
        return "T-FLUIDES-MEDICAUX"
    return None  # pas un terminal, utiliser layer_for_equipment


# ---------------------------------------------------------------------------
# Chargement des donnees
# ---------------------------------------------------------------------------

def load_json(path: str | os.PathLike) -> dict[str, Any]:
    with open(path, "r", encoding="utf-8") as fh:
        return json.load(fh)


def load_project(path: str | os.PathLike | None = None) -> dict[str, Any]:
    """Charge le JSON projet hospitalier et valide la presence des champs cles."""
    path = Path(path) if path else DEFAULT_LAYOUT_FILE
    data = load_json(path)
    for key in ("project", "building", "level", "rooms", "walls", "doors", "equipments"):
        if key not in data:
            raise ValueError(f"Champ obligatoire absent du projet : '{key}' ({path})")
    return data


def load_equipment_library(path: str | os.PathLike | None = None) -> dict[str, dict[str, Any]]:
    """Charge la bibliotheque d'equipements et renvoie un dict indexe par type_id."""
    path = Path(path) if path else DEFAULT_LIBRARY_FILE
    raw = load_json(path)
    return {eq["type_id"]: eq for eq in raw.get("equipment", [])}


def load_room_templates(path: str | os.PathLike | None = None) -> dict[str, Any]:
    path = Path(path) if path else DEFAULT_TEMPLATES_FILE
    return load_json(path)


# ---------------------------------------------------------------------------
# Geometrie 2D
# ---------------------------------------------------------------------------

Vec2 = tuple[float, float]

def rotate_xy(point: Vec2, angle_deg: float, center: Vec2 = (0.0, 0.0)) -> Vec2:
    """Rotation 2D autour d'un centre, angle en degres trigonometrique."""
    angle = math.radians(angle_deg)
    cx, cy = center
    x, y = point
    dx, dy = x - cx, y - cy
    return (cx + dx * math.cos(angle) - dy * math.sin(angle),
            cy + dx * math.sin(angle) + dy * math.cos(angle))


def equipment_footprint(equipment: dict[str, Any],
                        eq_type: dict[str, Any]) -> list[Vec2]:
    """
    Retourne le polygone empreinte au sol (4 points) d'un equipement,
    en tenant compte de sa position et orientation.

    L'origine de l'equipement est le coin bas-gauche de sa bounding box
    non tournee. La rotation se fait autour de ce coin.
    """
    L = eq_type["dimensions"]["L"]
    l = eq_type["dimensions"]["l"]
    x0 = equipment["position"]["x"]
    y0 = equipment["position"]["y"]
    angle = float(equipment.get("orientation_deg", 0))

    raw = [(0, 0), (L, 0), (L, l), (0, l)]
    rotated = [rotate_xy(p, angle, (0, 0)) for p in raw]
    return [(x0 + rx, y0 + ry) for rx, ry in rotated]


def clearance_footprint(equipment: dict[str, Any],
                        eq_type: dict[str, Any]) -> list[Vec2]:
    """Polygone des degagements autour de l'equipement (zone de maintenance / acces)."""
    L = eq_type["dimensions"]["L"]
    l = eq_type["dimensions"]["l"]
    cl = eq_type.get("clearance_m", {"front": 0, "back": 0, "left": 0, "right": 0})
    # Convention : front = +Y dans le repere local
    x_min = -cl.get("left", 0)
    x_max = L + cl.get("right", 0)
    y_min = -cl.get("back", 0)
    y_max = l + cl.get("front", 0)
    raw = [(x_min, y_min), (x_max, y_min), (x_max, y_max), (x_min, y_max)]
    x0 = equipment["position"]["x"]
    y0 = equipment["position"]["y"]
    angle = float(equipment.get("orientation_deg", 0))
    rotated = [rotate_xy(p, angle, (0, 0)) for p in raw]
    return [(x0 + rx, y0 + ry) for rx, ry in rotated]


def maintenance_footprint(equipment: dict[str, Any],
                          eq_type: dict[str, Any]) -> list[Vec2] | None:
    """Polygone de la zone de maintenance (si non nulle)."""
    mz = eq_type.get("maintenance_zone_m")
    if not mz or all(v == 0 for v in mz.values()):
        return None
    L = eq_type["dimensions"]["L"]
    l = eq_type["dimensions"]["l"]
    x_min = -mz.get("left", 0)
    x_max = L + mz.get("right", 0)
    y_min = -mz.get("back", 0)
    y_max = l + mz.get("front", 0)
    raw = [(x_min, y_min), (x_max, y_min), (x_max, y_max), (x_min, y_max)]
    x0 = equipment["position"]["x"]
    y0 = equipment["position"]["y"]
    angle = float(equipment.get("orientation_deg", 0))
    rotated = [rotate_xy(p, angle, (0, 0)) for p in raw]
    return [(x0 + rx, y0 + ry) for rx, ry in rotated]


def polygon_centroid(points: list[Vec2]) -> Vec2:
    """Centroide d'un polygone (formule shoelace). Suppose polygone non auto-intersectant."""
    n = len(points)
    if n == 0:
        return (0.0, 0.0)
    a = 0.0
    cx = cy = 0.0
    for i in range(n):
        x0, y0 = points[i]
        x1, y1 = points[(i + 1) % n]
        cross = x0 * y1 - x1 * y0
        a += cross
        cx += (x0 + x1) * cross
        cy += (y0 + y1) * cross
    a *= 0.5
    if abs(a) < 1e-9:
        # polygone degenere : moyenne des points
        return (sum(p[0] for p in points) / n, sum(p[1] for p in points) / n)
    return (cx / (6 * a), cy / (6 * a))


def polygon_area(points: list[Vec2]) -> float:
    """Aire signee d'un polygone (positive si oriente CCW)."""
    n = len(points)
    a = 0.0
    for i in range(n):
        x0, y0 = points[i]
        x1, y1 = points[(i + 1) % n]
        a += x0 * y1 - x1 * y0
    return abs(a) / 2.0


def point_in_polygon(point: Vec2, polygon: list[Vec2]) -> bool:
    """Ray casting horizontal."""
    x, y = point
    inside = False
    n = len(polygon)
    j = n - 1
    for i in range(n):
        xi, yi = polygon[i]
        xj, yj = polygon[j]
        if ((yi > y) != (yj > y)) and (x < (xj - xi) * (y - yi) / (yj - yi + 1e-15) + xi):
            inside = not inside
        j = i
    return inside


def bbox_of_polygon(polygon: list[Vec2]) -> tuple[float, float, float, float]:
    """Renvoie (xmin, ymin, xmax, ymax)."""
    xs = [p[0] for p in polygon]
    ys = [p[1] for p in polygon]
    return (min(xs), min(ys), max(xs), max(ys))


def bbox_intersect(b1: tuple[float, float, float, float],
                   b2: tuple[float, float, float, float]) -> bool:
    return not (b1[2] < b2[0] or b2[2] < b1[0] or b1[3] < b2[1] or b2[3] < b1[1])


# ---------------------------------------------------------------------------
# Murs : decoupage par portes et fenetres
# ---------------------------------------------------------------------------

def wall_segments_with_openings(wall: dict[str, Any],
                                doors: list[dict[str, Any]],
                                windows: list[dict[str, Any]]
                                ) -> list[tuple[Vec2, Vec2]]:
    """
    Decoupe la ligne d'axe du mur en sous-segments en y soustrayant les ouvertures
    (portes et fenetres). Renvoie une liste de segments [(p1, p2), ...].

    L'ouverture est positionnee par 'position_along_wall_m' (axe du mur depuis p1)
    avec une largeur 'width_m'.
    """
    (x1, y1), (x2, y2) = wall["p1"], wall["p2"]
    dx, dy = x2 - x1, y2 - y1
    length = math.hypot(dx, dy)
    if length < 1e-9:
        return []
    ux, uy = dx / length, dy / length

    cuts: list[tuple[float, float]] = []
    for opening in [o for o in (doors + windows) if o.get("wall") == wall["id"]]:
        pos = float(opening["position_along_wall_m"])
        w = float(opening["width_m"])
        start = max(0.0, pos - w / 2)
        end   = min(length, pos + w / 2)
        if end > start:
            cuts.append((start, end))
    cuts.sort()
    # Fusion des plages chevauchantes
    merged: list[tuple[float, float]] = []
    for s, e in cuts:
        if merged and s <= merged[-1][1]:
            merged[-1] = (merged[-1][0], max(merged[-1][1], e))
        else:
            merged.append((s, e))

    segments: list[tuple[Vec2, Vec2]] = []
    cursor = 0.0
    for s, e in merged:
        if s > cursor:
            p_start = (x1 + ux * cursor, y1 + uy * cursor)
            p_end   = (x1 + ux * s,      y1 + uy * s)
            segments.append((p_start, p_end))
        cursor = e
    if cursor < length:
        p_start = (x1 + ux * cursor, y1 + uy * cursor)
        p_end   = (x2, y2)
        segments.append((p_start, p_end))
    return segments


# ---------------------------------------------------------------------------
# Calcul de positions sur murs (pour symboles portes / fenetres)
# ---------------------------------------------------------------------------

def wall_local_to_world(wall: dict[str, Any], along: float, offset: float = 0.0) -> Vec2:
    """Convertit (along, offset normal) en coordonnees monde sur la ligne d'axe du mur."""
    (x1, y1), (x2, y2) = wall["p1"], wall["p2"]
    dx, dy = x2 - x1, y2 - y1
    length = math.hypot(dx, dy) or 1.0
    ux, uy = dx / length, dy / length
    nx, ny = -uy, ux  # normale a gauche
    return (x1 + ux * along + nx * offset, y1 + uy * along + ny * offset)


def wall_normal(wall: dict[str, Any]) -> Vec2:
    (x1, y1), (x2, y2) = wall["p1"], wall["p2"]
    dx, dy = x2 - x1, y2 - y1
    length = math.hypot(dx, dy) or 1.0
    return (-dy / length, dx / length)


# ---------------------------------------------------------------------------
# Utilitaires divers
# ---------------------------------------------------------------------------

def ensure_dir(path: str | os.PathLike) -> Path:
    p = Path(path)
    p.mkdir(parents=True, exist_ok=True)
    return p


def m_to_mm(value: float) -> float:
    return value * 1000.0


def aci_to_rgb_tuple(rgb: tuple[float, float, float]) -> tuple[int, int, int]:
    return (int(rgb[0] * 255), int(rgb[1] * 255), int(rgb[2] * 255))
