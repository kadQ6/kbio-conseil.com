# Installation FreeCAD + FreeCAD MCP

Ce guide prepare la chaine **FreeCAD ↔ MCP ↔ Claude** pour piloter FreeCAD
depuis Claude Code (CLI, Desktop, Web ou Cursor).

> Audit de l'environnement actuel (sandbox cloud Claude Code) :
> - FreeCAD : **NON installe**
> - FreeCAD MCP : **NON installe**
> - Python 3.11 : OK
> - ezdxf, reportlab, openpyxl : OK (installes)
> - Blender / LibreCAD / QCAD : NON installes
>
> **Consequence :** les scripts FreeCAD Python doivent etre executes sur
> votre machine locale (Linux / macOS / Windows). Le MCP, lui, peut etre
> declare dans la config de Claude Desktop / Cursor / Claude Code CLI
> de votre poste.

---

## 1. Installer FreeCAD

### Linux (Debian / Ubuntu)
```bash
sudo apt update
sudo apt install -y freecad freecad-python3
```

### Linux (AppImage, recommande pour version recente)
```bash
# FreeCAD 1.0+ recommande (Arch Workbench moderne)
wget https://github.com/FreeCAD/FreeCAD/releases/latest/download/FreeCAD_x86_64.AppImage
chmod +x FreeCAD_x86_64.AppImage
./FreeCAD_x86_64.AppImage
```

### macOS
```bash
brew install --cask freecad
# ou telechargement : https://www.freecad.org/downloads.php
```

### Windows
Telecharger l'installateur officiel : https://www.freecad.org/downloads.php

### Verification
```bash
freecad --version
# ou
freecadcmd --version
```

Modules indispensables (livres avec FreeCAD) :
- `Part` (geometrie de base)
- `Draft` (esquisses 2D)
- `Arch` ou `BIM` (murs, sols, portes, fenetres)
- `TechDraw` (vues 2D / mise en page / cotation)
- `importDXF` (export DXF natif)

Test API Python en CLI :
```bash
freecadcmd -c "import FreeCAD, Part, Draft; print('FreeCAD', FreeCAD.Version()[:3])"
```

---

## 2. Installer FreeCAD MCP

Deux implementations sont matures aujourd'hui :

| Implementation                              | Auteur     | Transport | Avantage principal                              |
|---------------------------------------------|------------|-----------|-------------------------------------------------|
| `freecad-mcp`                               | neka-nat   | stdio     | Le plus populaire, doc claire, addon FreeCAD.   |
| `mcp-bridge` (Robust MCP Bridge Workbench)  | contextform| stdio/ws  | Lance des commandes en langage naturel.         |

### 2.A — `freecad-mcp` (neka-nat) — recommande pour commencer

1. **Cote FreeCAD : installer l'Addon `MCPAddon`**
   - Lancer FreeCAD
   - Menu `Outils → Gestionnaire des addons` (ou `Tools → Addon manager`)
   - Onglet `Workbenches`, chercher **MCPAddon** → installer
   - Redemarrer FreeCAD
   - Selectionner le workbench `MCP Addon` dans la liste des ateliers
   - Cliquer sur **Start RPC Server** (le serveur ecoute en local en XMLRPC sur `localhost:9876`)

2. **Cote shell : installer le serveur MCP Python**
   ```bash
   # uv (recommande, https://docs.astral.sh/uv)
   uv tool install freecad-mcp
   # OU via pipx
   pipx install freecad-mcp
   # OU via pip (dans un venv)
   pip install freecad-mcp
   ```

3. **Declarer le MCP dans Claude Desktop** (`~/Library/Application Support/Claude/claude_desktop_config.json`
   sur macOS, `%APPDATA%/Claude/claude_desktop_config.json` sur Windows, ou
   `~/.config/Claude/claude_desktop_config.json` sur Linux) :

   ```json
   {
     "mcpServers": {
       "freecad": {
         "command": "uvx",
         "args": ["freecad-mcp"]
       }
     }
   }
   ```

4. **Declarer le MCP dans Claude Code CLI** :
   ```bash
   claude mcp add freecad uvx freecad-mcp
   # verifier
   claude mcp list
   ```

5. **Test** : ouvrir FreeCAD, lancer le serveur RPC depuis le workbench MCPAddon,
   puis dans Claude :
   > « Liste les documents FreeCAD ouverts et cree un cube de 100 mm. »

### 2.B — `mcp-bridge` (contextform) — alternative

Voir https://github.com/contextform/mcp-bridge — meme principe mais avec un
bridge generique qui expose plus largement l'API FreeCAD. Utile si la version
neka-nat ne couvre pas un cas precis.

---

## 3. Verification croisee

Une fois la chaine prete, ces requetes doivent fonctionner depuis Claude :

```text
- Liste les workbenches disponibles dans FreeCAD.
- Cree un nouveau document FreeCAD nomme "Hopital-Demo".
- Ajoute un cube de 1000 x 500 x 800 mm a l'origine.
- Exporte ce document en STEP dans /tmp/test.step.
```

---

## 4. Limites connues

- **Headless** : FreeCAD MCP necessite que FreeCAD soit OUVERT avec le serveur
  RPC lance. Pour du headless pur (CI, scripts batch), utiliser `freecadcmd`
  directement avec les scripts du dossier `scripts/`.
- **Performances** : le pont MCP serialise toutes les commandes, evitez de
  generer des centaines d'objets par requete. Preferer un script Python
  unique passe au serveur RPC.
- **Securite** : le serveur RPC ecoute en local, ne pas exposer le port 9876
  sur Internet sans tunnel chiffre.
- **Sandbox cloud** : dans un environnement Claude Code on the web sans
  FreeCAD, seuls les scripts pur Python (DXF/STL/OBJ ezdxf) fonctionneront.
  La generation FreeCAD .FCStd se fera sur la machine de l'utilisateur.

---

## 5. Lien avec ce projet

Les modeles 3D des equipements biomedicaux sont DEJA generes dans
`exports/3d_models/` au format OBJ + STL. Pour les importer dans FreeCAD :

- **Manuel** : `Fichier → Importer` puis selectionner un `.stl` ou `.obj`.
- **Via MCP** : demander a Claude « importe `exports/3d_models/EQ-TAB-OP-01/EQ-TAB-OP-01_mm.stl`
  dans un nouveau document FreeCAD ».
- **Via script** : voir le futur `scripts/generate_freecad_model.py` (a creer
  apres reception du plan utilisateur).
