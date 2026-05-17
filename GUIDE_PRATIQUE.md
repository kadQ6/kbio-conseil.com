# 🛠️ Guide pratique — Modifier le site CiMB en autonomie

> Pas besoin d'être développeur. 90 % des modifications se font dans **un seul fichier** : `lib/site-data.ts`.

---

## 🚀 Avant de commencer — Lancer le projet

### 1. Ouvrir le projet dans Cursor

Trois façons :

**A. Depuis le menu Cursor**
- `File` → `Open Folder...` → naviguer vers `/Users/kad/Projects/cimb-site` → `Open`

**B. Depuis le terminal**
```bash
cd /Users/kad/Projects/cimb-site
cursor .
```

**C. Depuis le Finder**
- Ouvrir Finder → `Aller au dossier` (Cmd+Shift+G) → coller `/Users/kad/Projects/cimb-site` → glisser le dossier sur l'icône Cursor du dock

### 2. Lancer le serveur de prévisualisation

Dans le terminal de Cursor (`Ctrl+ù` ou `Terminal → New Terminal`) :

```bash
npm run dev
```

→ Site en local sur **http://localhost:3090**
→ **Toute modification sauvegardée** met à jour le navigateur automatiquement (hot-reload)

Pour arrêter : `Ctrl+C` dans le terminal.

---

## 🧠 Workflow complet (5 étapes)

```
1. Ouvrir le bon fichier dans Cursor
       ↓
2. Modifier le texte / l'image
       ↓
3. Sauvegarder (Cmd+S) → vérifier sur localhost:3090
       ↓
4. Commit git :  git add . && git commit -m "content: ..."
       ↓
5. Push :        git push
       → Vercel redéploie automatiquement (~90 sec)
       → Site en ligne mis à jour
```

---

## 📍 Carte d'édition — Où modifier quoi

### Le fichier maître : `lib/site-data.ts`

Ouvrez-le dans Cursor. Vous verrez des blocs comme `site`, `navigation`, `heroStats`, `expertises`, etc.

| Vous voulez modifier... | Bloc à éditer dans `lib/site-data.ts` |
|---|---|
| Téléphone, email, adresse | `site.contact` |
| Nom de la société, baseline | `site.name`, `site.longName`, `site.baseline` |
| Menu de navigation | `navigation` |
| **Les 4 chiffres clés sur la home** | `heroStats` |
| Les **9 expertises** | `expertises` |
| Les **3 offres** + tableau comparatif | `offers` (comparatif : `app/offres/page.tsx`) |
| Les **5 étapes** de la méthode | `methodSteps` |
| Les **6 raisons "Pourquoi CiMB"** | `whyCimb` |
| Les **4 modèles de service** (home) | `serviceModels` |
| Les **7 secteurs** | `sectors` |
| Les **8 fonctionnalités du portail** | `portalFeatures` |
| Les **6 références** anonymisées | `references` |
| Les **témoignages** (à remplacer) | `testimonials` |
| Les liens du **footer** | `footerColumns` |

### Les autres fichiers à connaître

| Fichier | Quoi |
|---|---|
| `lib/images.ts` | Catalogue des **13 images** thématiques (URL Unsplash ou chemin local) |
| `app/globals.css` | **Couleurs** (`@theme`) — bleu, teal, etc. |
| `app/page.tsx` | Page d'accueil (titres de sections, CTA) |
| `app/[page]/page.tsx` | Chaque page interne (titre H1, intro, structure) |
| `components/Header.tsx` | Logo, lien CTA du header |
| `components/Footer.tsx` | Texte du footer, mentions |
| `components/HeroSection.tsx` | Hero d'accueil (gros titre + dashboard mock) |
| `components/LogoWall.tsx` | Les **6 logos partenaires** fictifs |

---

## ✏️ 12 exemples concrets prêts à copier

### Exemple 1 — Changer le téléphone

**Fichier** : `lib/site-data.ts`

Trouvez :
```ts
contact: {
  email: "contact@cimb-djibouti.com",
  phone: "+253 77 00 00 00",       // ← Remplacez ici
  whatsapp: "+253 77 00 00 00",    // ← Et ici si même numéro
  ...
}
```

Sauvegardez. Le téléphone se met à jour **partout** : footer, page contact, JSON-LD SEO.

---

### Exemple 2 — Changer un chiffre clé sur la homepage

**Fichier** : `lib/site-data.ts` → bloc `heroStats`

Avant :
```ts
{ value: "120", suffix: "+", label: "Audits techniques conduits", hint: "..." },
```

Après (par exemple, votre vrai chiffre 47) :
```ts
{ value: "47", suffix: "+", label: "Audits techniques conduits", hint: "..." },
```

⚠️ `value` est **toujours entre guillemets** (chaîne), pas un nombre. C'est ce qui permet l'affichage `"3 200"` avec espace.

---

### Exemple 3 — Modifier le titre du hero d'accueil

**Fichier** : `components/HeroSection.tsx`

Trouvez :
```tsx
<motion.h1 ... >
  L'expertise biomédicale
  <span className="block">
    au service de la <span className="text-...">continuité des soins</span>
  </span>
</motion.h1>
```

Remplacez les deux phrases par les vôtres. **Conservez la structure** `<span>` pour garder le mot en accent teal.

---

### Exemple 4 — Modifier une expertise (ex: "Audit technique biomédical")

**Fichier** : `lib/site-data.ts` → bloc `expertises`

Trouvez :
```ts
{
  slug: "audit-technique",
  title: "Audit technique biomédical",
  short: "Diagnostic complet du parc d'équipements...",
  description: "Nous évaluons l'état réel de chaque dispositif médical...",
  benefits: [
    "Cartographie objective du parc",
    "Hiérarchisation des risques patients",
    "Plan d'action chiffré",
    "Référentiel pour décisions d'investissement",
  ],
  icon: ClipboardCheck,
},
```

Vous pouvez modifier `title`, `short`, `description` et chaque ligne de `benefits`. Gardez `slug`, `icon` (sauf si vous voulez changer d'icône — voir Exemple 11).

---

### Exemple 5 — Ajouter une 4ᵉ offre

**Fichier** : `lib/site-data.ts` → bloc `offers`

Copier-coller le bloc d'une offre existante et l'adapter :
```ts
{
  slug: "audit-express",
  name: "Audit express",
  tagline: "Diagnostic rapide en 1 semaine.",
  duration: "Mission 5 jours",
  features: [
    "Inventaire des équipements critiques",
    "Note de synthèse 10 pages",
    "Recommandations prioritaires",
  ],
  ctaLabel: "Demander un audit express",
  ctaHref: "/contact?offre=audit-express",
},
```

⚠️ Attention au **tableau comparatif** dans `app/offres/page.tsx` (`compareRows`). Si vous ajoutez une 4ᵉ offre, il faut ajouter une 4ᵉ valeur `true/false` à chaque ligne du tableau, sinon le build casse.

Solution simple : **demandez à l'agent Cursor** dans le projet `cimb-site` :
> "J'ai ajouté une 4ᵉ offre 'audit-express' dans site-data.ts, peux-tu mettre à jour le tableau comparatif dans app/offres/page.tsx en conséquence ?"

---

### Exemple 6 — Modifier les coordonnées du footer

**Fichier** : `lib/site-data.ts` → bloc `site` et `footerColumns`

Le footer prend automatiquement les coordonnées depuis `site.contact`. Pour modifier les **liens** du footer :
```ts
export const footerColumns = [
  {
    title: "Le centre",
    links: [
      { label: "À propos", href: "/a-propos" },
      { label: "Méthode", href: "/methode" },
      { label: "Références", href: "/references" },
      // ← Ajouter / retirer / renommer ici
    ],
  },
  ...
];
```

---

### Exemple 7 — Remplacer une image Unsplash par votre photo locale

**Étape 1** — Déposer la photo dans `public/images/`

Glissez-déposez votre fichier (ex. `audit-hopital-djibouti.jpg`) dans le dossier `public/images/` via le panneau "Explorer" de Cursor (à gauche).

**Étape 2** — Modifier `lib/images.ts`

Avant :
```ts
audit: {
  src: u("photo-1631815589968-fdb09a223b1e", 1400),
  alt: "Technicien biomédical en intervention sur un équipement médical.",
},
```

Après :
```ts
audit: {
  src: "/images/audit-hopital-djibouti.jpg",
  alt: "Audit technique conduit dans un hôpital régional, juin 2026.",
},
```

⚠️ Le **chemin commence par `/images/`** (pas par `public/`). Next.js sert automatiquement le dossier `public`.

**Format optimal** : JPG ou PNG, largeur 1600 px minimum, max 500 Ko.

---

### Exemple 8 — Remplacer toutes les photos par les vôtres d'un coup

1. Déposer 5-10 photos dans `public/images/`
2. Modifier `lib/images.ts` en remplaçant **toutes** les `src` Unsplash par des chemins `/images/votre-photo.jpg`
3. Mettre à jour les `alt` (descriptions accessibles)

Vous pouvez ensuite **supprimer la config Unsplash** dans `next.config.ts` :
```ts
// Avant
remotePatterns: [
  { protocol: "https", hostname: "images.unsplash.com" },
],

// Après (si toutes vos images sont locales)
// supprimer cette section ou laisser vide : remotePatterns: [],
```

---

### Exemple 9 — Modifier les couleurs

**Fichier** : `app/globals.css` → bloc `@theme`

```css
@theme {
  --color-ink: #0B2545;     /* ← Bleu encre principal — change tous les titres et CTA */
  --color-teal: #0FB5A6;    /* ← Accent biomédical — change les éléments verts */
  --color-sand: #F6F1E7;    /* Fond chaud */
  ...
}
```

Si vous voulez tester :
- **Plus institutionnel** : `--color-ink: #001F3F` (bleu marine très foncé)
- **Plus doux** : `--color-teal: #14B8A6` (teal classique Tailwind)
- **Plus chaud** : `--color-teal: #F97316` (orange accent)

Le site s'adapte automatiquement partout.

---

### Exemple 10 — Modifier les logos partenaires

**Fichier** : `components/LogoWall.tsx`

```ts
const partners = [
  { name: "MEDIVA Santé", mark: "plus" },         // ← Remplacer
  { name: "Polynord Hospital", mark: "pulse" },
  ...
];
```

Marks disponibles (formes de logo) : `"plus" | "pulse" | "ring" | "hex" | "wave" | "shield"`.

Pour utiliser un **vrai logo image** au lieu d'un mark SVG :
1. Déposez le PNG/SVG du logo dans `public/icons/`
2. Demandez à l'agent Cursor :
   > "Remplace le mark SVG du logo MEDIVA par une image en utilisant `/icons/mediva-logo.png`"

---

### Exemple 11 — Changer une icône (lucide-react)

Toutes les icônes viennent de [lucide.dev/icons](https://lucide.dev/icons). 1500+ disponibles.

**Étape 1** — Choisir une icône sur le site (par ex. `Microscope`, `Stethoscope`, `Wrench`)

**Étape 2** — Dans `lib/site-data.ts`, en haut du fichier, ajouter l'import :
```ts
import {
  Activity,
  ClipboardCheck,
  // ... existing
  Microscope,    // ← Ajouter ici
} from "lucide-react";
```

**Étape 3** — Utiliser dans le bloc concerné :
```ts
{
  title: "Nouvelle expertise",
  icon: Microscope,    // ← Au lieu de l'icône précédente
  ...
}
```

---

### Exemple 12 — Cacher / supprimer une section entière

**Cas : retirer le mur de logos partenaires de la page d'accueil**

**Fichier** : `app/page.tsx`

Trouvez :
```tsx
import { LogoWall } from "@/components/LogoWall";
...
<LogoWall />
```

**Option A — Cacher temporairement** : commentez la ligne
```tsx
{/* <LogoWall /> */}
```

**Option B — Supprimer définitivement** : supprimez la ligne et l'import en haut du fichier.

---

## 💾 Sauvegarder et publier vos modifications

### Méthode 1 — Via le terminal Cursor (recommandée)

```bash
# 1. Voir ce que vous avez modifié
git status

# 2. Tout ajouter
git add .

# 3. Commit avec un message clair
git commit -m "content: mise à jour téléphone et chiffres clés"

# 4. Push vers GitHub → Vercel redéploie automatiquement
git push
```

→ ~90 sec plus tard, votre site **https://ci-mb.vercel.app** est mis à jour.

### Méthode 2 — Via le panneau Source Control de Cursor

1. Cliquez sur l'icône **🔀 Source Control** dans la barre latérale (3ᵉ icône)
2. Tous les fichiers modifiés apparaissent
3. Tapez votre message de commit en haut
4. Cliquez sur **✓ Commit**
5. Cliquez sur **🔄 Sync Changes** (ou les `⋯` → `Push`)

---

## 🔥 Astuce ultime — Utiliser l'agent Cursor pour vous aider

Vous êtes dans **Cursor** : vous avez un agent IA intégré. **Profitez-en !**

### Exemples de demandes que vous pouvez me faire (ou à un agent dans le projet `cimb-site`)

> "Remplace le téléphone par +253 21 35 22 11 dans tout le site"

> "Change le 5ᵉ chiffre clé : on a fait 47 audits, pas 120"

> "Ajoute une 10ᵉ expertise 'Radioprotection et conformité' avec icône ShieldAlert et 3 bénéfices"

> "Remplace la palette par bleu marine (#001F3F) et orange accent (#FF8C00)"

> "Retire complètement la section témoignages de la page références"

> "Crée une nouvelle page /partenaires avec 4 cards de bailleurs"

> "Remplace toutes les images Unsplash par des photos locales dans public/images/"

L'agent va lire les fichiers concernés, faire les modifications, vérifier que ça compile, et vous montrer ce qui a changé. Vous validez, vous commitez, vous pushez.

---

## 🛟 Filet de sécurité — Si quelque chose casse

### Le site local affiche une erreur rouge ?

→ Lisez le message d'erreur. 95 % du temps, c'est une virgule manquante ou un guillemet mal fermé.

→ Demandez à l'agent : *"j'ai cette erreur : [coller l'erreur]. Peux-tu réparer ?"*

### Vous voulez annuler vos modifs **non encore commitées** ?

```bash
git checkout -- .         # ← Annule TOUTES les modifs locales
```

⚠️ **Irréversible** — vous perdrez tout ce que vous avez modifié depuis le dernier commit.

### Vous voulez annuler le DERNIER commit pushé ?

```bash
git revert HEAD            # ← Crée un commit qui annule le dernier
git push                   # ← Pousse l'annulation, Vercel redéploie l'état précédent
```

### Le build Vercel a échoué ?

→ Allez sur **https://vercel.com/kadq6s-projects/cimb/deployments**
→ Cliquez sur le déploiement échoué (en rouge)
→ Onglet "Logs" → l'erreur exacte est en bas
→ Copiez-collez à l'agent : *"build cassé, voici les logs : [...]"*

---

## 📂 Récap des fichiers à connaître par cœur

```
cimb-site/
├── lib/
│   ├── site-data.ts      ← 90 % des textes du site
│   ├── images.ts          ← Catalogue images
│   └── seo.ts             ← Description et mots-clés SEO par défaut
├── app/
│   ├── globals.css        ← Couleurs et typographie
│   ├── page.tsx           ← Page d'accueil
│   ├── a-propos/page.tsx
│   ├── expertises/page.tsx
│   ├── offres/page.tsx
│   ├── methode/page.tsx
│   ├── references/page.tsx
│   ├── portail-client/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── LogoWall.tsx
│   └── ... (autres composants)
└── public/
    └── images/             ← Déposez vos photos ici
```

---

## ✅ Votre première modification de test

Pour valider que tout fonctionne, faites cette modif simple :

1. Ouvrir `lib/site-data.ts`
2. Trouver `phone: "+253 77 00 00 00"`
3. Remplacer par votre vrai numéro
4. `Cmd+S` pour sauvegarder
5. Aller sur **http://localhost:3090/contact** → vérifier que le numéro s'affiche
6. Dans le terminal :
   ```bash
   git add .
   git commit -m "content: vrai téléphone CiMB"
   git push
   ```
7. Attendre 90 sec → recharger **https://ci-mb.vercel.app/contact** → vérifier en ligne

Si ça marche, vous savez tout ce qu'il faut savoir. 🎉

---

## 📞 Quand demander de l'aide

- Vous voulez ajouter une nouvelle page → demandez à l'agent
- Vous voulez intégrer un vrai backend de formulaire (Resend) → demandez à l'agent
- Vous voulez acheter le domaine et le configurer → demandez à l'agent
- Vous voulez ajouter une page blog/actualités → demandez à l'agent
- Vous voulez la version anglaise → demandez à l'agent
- Le build casse et vous ne savez pas pourquoi → demandez à l'agent

Tout est versionné dans Git. Tout est annulable. Vous ne pouvez **pas casser le site en ligne** sans le savoir : si le build échoue sur Vercel, l'ancienne version reste affichée.

**N'hésitez pas. Le code est conçu pour être modifié.**
