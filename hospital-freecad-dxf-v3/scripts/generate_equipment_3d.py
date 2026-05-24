"""
generate_equipment_3d.py
========================

Genere des modeles 3D simples (boites parametriques) pour chaque equipement
de la bibliotheque biomedicale, au format :

  - OBJ + MTL (universel, importable FreeCAD / Blender / SketchUp / Three.js)
  - STL binaire (universel CAO, importable FreeCAD / Cura / Prusa / impression 3D)
  - Un OBJ "catalogue" qui dispose tous les equipements en grille pour preview

Aucune dependance externe : tout est ecrit en pur Python.
Unites du fichier : metres (FreeCAD interpretera selon ses reglages, Blender et
Three.js sont neutres en unites). Pour STL, l'usage CAO est generalement en mm,
donc le script ecrit AUSSI une variante STL en mm (multipliee par 1000).

Usage :
    python3 generate_equipment_3d.py [chemin_bibliotheque.json] [dossier_sortie]
"""

from __future__ import annotations

import json
import struct
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from common import (
    DEFAULT_LIBRARY_FILE,
    EXPORTS_DIR,
    ensure_dir,
    load_equipment_library,
)


# ---------------------------------------------------------------------------
# Geometrie d'une boite parametrique
# ---------------------------------------------------------------------------
# Une boite a 8 sommets et 12 triangles (6 faces x 2 triangles).
# Convention : origine = coin bas-gauche-arriere. Axes : X=longueur (L),
# Y=largeur (l), Z=hauteur (H). Ordre des sommets compatible normales sortantes.

def _box_vertices(L: float, l: float, H: float) -> list[tuple[float, float, float]]:
    return [
        (0, 0, 0),  # 0
        (L, 0, 0),  # 1
        (L, l, 0),  # 2
        (0, l, 0),  # 3
        (0, 0, H),  # 4
        (L, 0, H),  # 5
        (L, l, H),  # 6
        (0, l, H),  # 7
    ]


# Faces (indices 1-based pour OBJ) avec normales sortantes :
_BOX_FACES_OBJ = [
    # bas (Z-)         haut (Z+)
    (1, 4, 3, 2),     (5, 6, 7, 8),
    # avant (Y-)       arriere (Y+)
    (1, 2, 6, 5),     (4, 8, 7, 3),
    # gauche (X-)      droite (X+)
    (1, 5, 8, 4),     (2, 3, 7, 6),
]

# Triangulation des faces (pour STL)
_BOX_TRIS = [
    # bas (z=0)
    (0, 3, 2), (0, 2, 1),
    # haut (z=H)
    (4, 5, 6), (4, 6, 7),
    # face avant (y=0)
    (0, 1, 5), (0, 5, 4),
    # face arriere (y=l)
    (3, 7, 6), (3, 6, 2),
    # face gauche (x=0)
    (0, 4, 7), (0, 7, 3),
    # face droite (x=L)
    (1, 2, 6), (1, 6, 5),
]


def _face_normal(v0, v1, v2):
    """Normale unitaire d'un triangle."""
    import math
    ux = v1[0] - v0[0]; uy = v1[1] - v0[1]; uz = v1[2] - v0[2]
    vx = v2[0] - v0[0]; vy = v2[1] - v0[1]; vz = v2[2] - v0[2]
    nx = uy * vz - uz * vy
    ny = uz * vx - ux * vz
    nz = ux * vy - uy * vx
    n = math.sqrt(nx * nx + ny * ny + nz * nz) or 1.0
    return (nx / n, ny / n, nz / n)


# ---------------------------------------------------------------------------
# Ecriture OBJ + MTL
# ---------------------------------------------------------------------------

def write_obj(path: Path, name: str, vertices, faces, material_name: str | None = None,
              mtllib: str | None = None, header_comment: str | None = None) -> None:
    """Ecrit un OBJ minimal. faces sont des tuples d'indices 1-based."""
    lines = []
    if header_comment:
        for c in header_comment.splitlines():
            lines.append(f"# {c}")
    if mtllib:
        lines.append(f"mtllib {mtllib}")
    lines.append(f"o {name}")
    for v in vertices:
        lines.append(f"v {v[0]:.6f} {v[1]:.6f} {v[2]:.6f}")
    if material_name:
        lines.append(f"usemtl {material_name}")
        lines.append("s off")
    for f in faces:
        lines.append("f " + " ".join(str(i) for i in f))
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def write_mtl(path: Path, materials: dict[str, tuple[float, float, float]]) -> None:
    """Ecrit un fichier MTL avec une couleur diffuse par materiau."""
    lines = []
    for name, (r, g, b) in materials.items():
        lines.append(f"newmtl {name}")
        lines.append(f"Ka {r * 0.3:.3f} {g * 0.3:.3f} {b * 0.3:.3f}")
        lines.append(f"Kd {r:.3f} {g:.3f} {b:.3f}")
        lines.append(f"Ks 0.100 0.100 0.100")
        lines.append("Ns 10")
        lines.append("d 1.0")
        lines.append("illum 2")
        lines.append("")
    path.write_text("\n".join(lines), encoding="utf-8")


# ---------------------------------------------------------------------------
# Ecriture STL binaire
# ---------------------------------------------------------------------------

def write_stl_binary(path: Path, vertices, triangles, scale: float = 1.0) -> None:
    """Ecrit un STL binaire. triangles = liste de tuples (i0, i1, i2) 0-based."""
    header = b"hospital-freecad-dxf-v3 equipment box"[:80].ljust(80, b"\x00")
    with open(path, "wb") as fh:
        fh.write(header)
        fh.write(struct.pack("<I", len(triangles)))
        for tri in triangles:
            v0 = tuple(c * scale for c in vertices[tri[0]])
            v1 = tuple(c * scale for c in vertices[tri[1]])
            v2 = tuple(c * scale for c in vertices[tri[2]])
            n = _face_normal(v0, v1, v2)
            fh.write(struct.pack("<3f", *n))
            fh.write(struct.pack("<3f", *v0))
            fh.write(struct.pack("<3f", *v1))
            fh.write(struct.pack("<3f", *v2))
            fh.write(struct.pack("<H", 0))


# ---------------------------------------------------------------------------
# Generateur principal
# ---------------------------------------------------------------------------

def generate_for_equipment(eq_type: dict, out_root: Path) -> dict:
    """Genere OBJ + MTL + STL (m) + STL (mm) pour un equipement donne."""
    type_id = eq_type["type_id"]
    safe_name = type_id.replace("/", "_")
    L = eq_type["dimensions"]["L"]
    l = eq_type["dimensions"]["l"]
    H = eq_type["dimensions"]["H"]
    color = tuple(eq_type.get("color_rgb", [0.7, 0.7, 0.7]))

    verts = _box_vertices(L, l, H)

    # Dossier dedie a cet equipement
    eq_dir = out_root / safe_name
    ensure_dir(eq_dir)

    # MTL
    mtl_name = f"{safe_name}.mtl"
    write_mtl(eq_dir / mtl_name, {safe_name: color})

    # OBJ (unites metres)
    obj_path = eq_dir / f"{safe_name}.obj"
    header = (
        f"Equipement biomedical : {eq_type['name']}\n"
        f"Type ID : {type_id}\n"
        f"Famille : {eq_type.get('family', '')}\n"
        f"Dimensions L x l x H (m) : {L} x {l} x {H}\n"
        f"Poids approx (kg) : {eq_type.get('weight_kg', 'N/A')}\n"
        f"Genere par hospital-freecad-dxf-v3 / generate_equipment_3d.py"
    )
    write_obj(obj_path, safe_name, verts, _BOX_FACES_OBJ,
              material_name=safe_name, mtllib=mtl_name,
              header_comment=header)

    # STL en metres (FreeCAD si reglages metres)
    write_stl_binary(eq_dir / f"{safe_name}_m.stl", verts, _BOX_TRIS, scale=1.0)
    # STL en millimetres (convention CAO classique)
    write_stl_binary(eq_dir / f"{safe_name}_mm.stl", verts, _BOX_TRIS, scale=1000.0)

    # JSON metadata associe (pratique pour Blender/Three.js)
    meta = {
        "type_id": type_id,
        "name": eq_type["name"],
        "family": eq_type.get("family"),
        "dimensions_m": {"L": L, "l": l, "H": H},
        "color_rgb": list(color),
        "weight_kg": eq_type.get("weight_kg"),
        "power_VA": eq_type.get("power_VA"),
        "fluids": eq_type.get("fluids", {}),
        "clearance_m": eq_type.get("clearance_m", {}),
        "maintenance_zone_m": eq_type.get("maintenance_zone_m", {}),
        "files": {
            "obj": str(obj_path.name),
            "mtl": mtl_name,
            "stl_m": f"{safe_name}_m.stl",
            "stl_mm": f"{safe_name}_mm.stl",
        },
    }
    (eq_dir / f"{safe_name}.json").write_text(
        json.dumps(meta, indent=2, ensure_ascii=False), encoding="utf-8"
    )

    return {
        "type_id": type_id,
        "dir": str(eq_dir.relative_to(out_root.parent.parent)),
        "obj": str((eq_dir / obj_path.name).relative_to(out_root.parent.parent)),
        "stl_m": str((eq_dir / f"{safe_name}_m.stl").relative_to(out_root.parent.parent)),
        "stl_mm": str((eq_dir / f"{safe_name}_mm.stl").relative_to(out_root.parent.parent)),
    }


def generate_catalog_obj(library: dict[str, dict], out_root: Path) -> Path:
    """
    Genere un OBJ unique contenant TOUS les equipements disposes en grille,
    pour avoir un apercu rapide du catalogue 3D.
    Espacement de 0.5 m entre chaque equipement.
    """
    import math
    n = len(library)
    cols = max(1, int(math.ceil(math.sqrt(n))))
    spacing = 0.5

    materials: dict[str, tuple[float, float, float]] = {}
    obj_lines: list[str] = [
        "# Catalogue 3D des equipements biomedicaux",
        "# Genere par generate_equipment_3d.py",
        "mtllib equipment_catalog.mtl",
    ]
    vertex_offset = 0

    # Calcul de la taille de cellule = max L ou l + spacing
    max_dim = max((max(eq["dimensions"]["L"], eq["dimensions"]["l"])
                   for eq in library.values()), default=1.0)
    cell = max_dim + spacing

    for idx, (type_id, eq) in enumerate(sorted(library.items())):
        row, col = divmod(idx, cols)
        ox = col * cell
        oy = row * cell
        L = eq["dimensions"]["L"]
        l = eq["dimensions"]["l"]
        H = eq["dimensions"]["H"]
        verts = _box_vertices(L, l, H)
        verts = [(v[0] + ox, v[1] + oy, v[2]) for v in verts]

        mat_name = type_id.replace("/", "_")
        color = tuple(eq.get("color_rgb", [0.7, 0.7, 0.7]))
        materials[mat_name] = color

        obj_lines.append(f"o {mat_name}")
        for v in verts:
            obj_lines.append(f"v {v[0]:.6f} {v[1]:.6f} {v[2]:.6f}")
        obj_lines.append(f"usemtl {mat_name}")
        obj_lines.append("s off")
        for face in _BOX_FACES_OBJ:
            obj_lines.append("f " + " ".join(str(i + vertex_offset) for i in face))
        vertex_offset += 8

    catalog_obj = out_root / "equipment_catalog.obj"
    catalog_obj.write_text("\n".join(obj_lines) + "\n", encoding="utf-8")
    write_mtl(out_root / "equipment_catalog.mtl", materials)
    return catalog_obj


def generate_all(library_path: str | None = None,
                 output_dir: str | None = None) -> dict:
    """Point d'entree : genere tous les fichiers 3D et un index."""
    library = load_equipment_library(library_path) if library_path else load_equipment_library()
    out_root = Path(output_dir) if output_dir else (EXPORTS_DIR / "3d_models")
    ensure_dir(out_root)

    index = []
    for type_id, eq in sorted(library.items()):
        info = generate_for_equipment(eq, out_root)
        index.append(info)
        print(f"  [3D] {type_id:25s}  ->  {info['dir']}")

    catalog = generate_catalog_obj(library, out_root)
    print(f"  [3D] catalogue complet : {catalog.relative_to(out_root.parent.parent)}")

    # Index global
    index_path = out_root / "index.json"
    index_path.write_text(json.dumps({
        "generated_count": len(index),
        "catalog_obj": str(catalog.name),
        "equipments": index,
    }, indent=2, ensure_ascii=False), encoding="utf-8")

    return {"count": len(index), "out_root": str(out_root), "catalog": str(catalog)}


if __name__ == "__main__":
    lib = sys.argv[1] if len(sys.argv) > 1 else None
    out = sys.argv[2] if len(sys.argv) > 2 else None
    result = generate_all(lib, out)
    print(f"\n[OK] {result['count']} equipements 3D generes dans {result['out_root']}")
