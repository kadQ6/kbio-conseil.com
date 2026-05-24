# Etat de preparation — Skills, MCP, et modeles 3D equipements

## 1. Skills Claude Code utiles a ce projet

Les skills suivants sont **deja disponibles** dans cette session (declenchables
par `/<nom>` ou automatiquement quand pertinent) :

| Skill                | Pertinence projet hospitalier                                                  |
|----------------------|--------------------------------------------------------------------------------|
| `verify`             | Verifier un script Python en l'executant et en lisant la sortie reelle.        |
| `run`                | Lancer une app (utile pour preview Three.js / Next.js future).                 |
| `code-review`        | Audit de la qualite du code des scripts FreeCAD / Python.                      |
| `security-review`    | Audit securite (utile si exposition d'un service web cote site K'BIO).         |
| `claude-api`         | Si on construit une integration Claude API a cote (annotation de plans, etc.). |
| `update-config`      | Pour configurer un hook qui regenere DXF/3D a chaque commit.                   |
| `session-start-hook` | Pour preparer la session web a re-cloner et regenerer les exports.             |
| `loop`               | Pour automatiser le re-render periodique d'un plan en cours de modification.   |
| `init`               | Generer un `CLAUDE.md` projet au moment ou la racine `/hospital-freecad-dxf-v3` sera figee. |

**Skills NON necessaires pour ce projet** : `fewer-permission-prompts`,
`keybindings-help`.

> Aucune action requise : ces skills sont prets a etre invoques `/verify`,
> `/run`, `/code-review`, etc. dans la suite de notre travail.

---

## 2. MCP — etat connectivite

### MCP connectes et utiles
| MCP                        | Usage projet                                                        |
|----------------------------|---------------------------------------------------------------------|
| `github`                   | Lire / commenter / PR sur `kadq6/kbio-conseil.com`.                 |
| `notion-*`                 | Si vous voulez stocker la nomenclature equipements dans Notion.     |
| `gmail-*` (label/draft)    | Envoi du livrable plan au client.                                   |
| `calendar` (Outlook)       | Planification reunions de validation BET / architecte.              |
| `asana-*` / `*-tasks`      | Suivi des taches (creation auto a partir des non-conformites).      |
| `supabase` (e800a30d...)   | Si la V4 doit stocker les plans en base.                            |

### MCP **PAS encore connecte** mais cle pour ce projet
- **FreeCAD MCP (`neka-nat/freecad-mcp`)** — voir `INSTALL_FREECAD_MCP.md`.
  A installer sur votre poste (FreeCAD doit y tourner).
- **Blender MCP** — optionnel, pour rendus photoreal hospitaliers.

---

## 3. Modeles 3D des equipements medicaux

### Genere maintenant
- **24 equipements** modelises comme boites parametriques L x l x H.
- Chaque equipement dans `exports/3d_models/<TYPE_ID>/` avec :
  - `<TYPE_ID>.obj` + `<TYPE_ID>.mtl` (couleur diffuse)
  - `<TYPE_ID>_m.stl`  (unites metres — pour usage Three.js / FreeCAD reglage metres)
  - `<TYPE_ID>_mm.stl` (unites millimetres — convention CAO classique)
  - `<TYPE_ID>.json` (metadonnees : poids, electricite, fluides, degagements)
- **Catalogue complet** : `exports/3d_models/equipment_catalog.obj`
  (les 24 equipements disposes en grille pour preview rapide).
- **Index global** : `exports/3d_models/index.json`.

### Bibliotheque actuelle (24 types)
Mobilier : bureau, fauteuil, chaise patient, armoire, lit d'hospitalisation
Examen : table examen, table 3 plans electrique, ECG, echographe
Monitorage : moniteur multiparametrique
Soins : chariot, pousse-seringue
Ventilation : respirateur soins critiques
Bloc : table d'operation, scialytique
Sterilisation : autoclave 130 L
Laboratoire : paillasse
Stockage medical : refrigerateur medical
Technique : compresseur air, prises O2 / Vide / Air / Electricite
Informatique : poste medical

### Comment importer ces 3D
- **FreeCAD** : `Fichier > Importer` → `.stl` ou `.obj`.
- **Blender** : `File > Import > Wavefront (.obj)` ou `STL`.
- **Three.js** : `OBJLoader`, `STLLoader` (sans dependance, fichiers texte/binaire standard).
- **SketchUp / Revit** : import OBJ disponible.

### Comment etendre la bibliotheque
1. Editer `data/equipment_library.json` (ajouter un objet dans le tableau `equipment`).
2. Relancer `python3 scripts/generate_equipment_3d.py`.
3. Le nouveau dossier sortira automatiquement dans `exports/3d_models/`.

---

## 4. Pret a recevoir le plan

Ce qui est ENVOYE et VERIFIE :
- `data/equipment_library.json` (24 equipements parametrables)
- `data/room_templates.json` (16 types de pieces hospitalieres avec exigences)
- `scripts/common.py` (utilitaires geometrie + calques pro)
- `scripts/generate_equipment_3d.py` (executable, deja genere les 24 modeles)
- `docs/INSTALL_FREECAD_MCP.md` (procedure poste local)
- `docs/SKILLS_MCP_READINESS.md` (ce document)

Ce qui est en ATTENTE de votre plan :
- Le fichier JSON layout (bibliotheque batiment, pieces, portes, fenetres,
  positions equipements) — sera derive du plan que vous transmettrez.
- Les scripts derives : `generate_freecad_model.py`, `export_dxf.py`,
  `export_pdf.py`, `generate_bom.py`, `validate_layout.py`.

### Format du plan attendu
N'importe lequel des elements suivants conviendra :
1. **Image / scan** (PNG, JPG, PDF) du plan avec dimensions visibles.
2. **DXF / DWG** existant a reverse-engineerer.
3. **Description texte** des pieces avec dimensions, portes, equipements.
4. **Croquis dimensionne** annote.
5. **PDF d'architecte** existant.

Indiquer si possible :
- les **dimensions interieures** ou **dimensions hors-tout** des pieces,
- l'**epaisseur des murs** (porteur / cloison),
- l'**emplacement des portes** (largeur, sens d'ouverture),
- les **equipements presents** ou a implanter (le mieux : reprendre les
  `type_id` de la bibliotheque, sinon decrire pour ajout).

Une fois le plan recu, le pipeline complet enchaine :
JSON projet → `generate_freecad_model.py` (FreeCAD MCP) → `export_dxf.py`
→ `export_pdf.py` → `generate_bom.py` → `validate_layout.py`.
