# Guide d'édition du contenu — Site CiMB

> Toutes les modifications de texte sont **typées** : si vous cassez la structure, TypeScript vous le signalera dans Cursor.

## 🎯 Règle d'or

**90 % du contenu se modifie dans un seul fichier : [`lib/site-data.ts`](./lib/site-data.ts)**

Ce fichier est la source unique de vérité. Tout y passe : navigation, contacts, offres, expertises, méthode, références, témoignages, footer.

---

## 📋 Carte d'édition complète

### 1️⃣ Coordonnées et identité globales
**Fichier :** `lib/site-data.ts` → bloc `site`

```ts
export const site = {
  name: "CiMB",
  longName: "Centre d'Ingénierie et de Maintenance Biomédicale",
  parent: "HORNCARE",
  baseline: "L'expertise biomédicale au service de la continuité des soins.",
  url: "https://cimb-djibouti.com",   // ← URL finale du site
  contact: {
    email: "contact@cimb-djibouti.com",
    phone: "+253 77 00 00 00",
    whatsapp: "+253 77 00 00 00",
    address: "...",
    city: "Djibouti",
    country: "Djibouti",
  },
}
```

Impact : footer, page contact, JSON-LD SEO, balise `metadataBase`.

### 2️⃣ Navigation principale
**Fichier :** `lib/site-data.ts` → `navigation`

Modifier l'ordre, ajouter/retirer un lien, renommer un libellé.

### 3️⃣ Chiffres clés (homepage)
**Fichier :** `lib/site-data.ts` → `heroStats`

Les compteurs animés. Garder le format : `value` est une chaîne (ex. `"3 200"`), `suffix` optionnel (`"+"`, `" %"`).

### 4️⃣ Offres et contrats (page `/offres`)
**Fichier :** `lib/site-data.ts` → `offers`

Tableau de 3 offres. Pour ajouter/retirer une feature : éditer `features: [...]`.
Pour ajouter une 4ᵉ offre, copier un bloc `{ slug, name, ... }` complet.

⚠️ Si vous changez le nombre d'offres, ajuster aussi le tableau comparatif dans `app/offres/page.tsx` → `compareRows[].values` (un booléen par offre).

### 5️⃣ Expertises (page `/expertises`)
**Fichier :** `lib/site-data.ts` → `expertises`

9 expertises avec titre, description courte, description longue, 4 bénéfices, icône Lucide.

Icônes disponibles : voir [https://lucide.dev/icons](https://lucide.dev/icons)
Ajouter l'import en haut du fichier `site-data.ts` puis utiliser dans `icon`.

### 6️⃣ Méthode (5 étapes — homepage + page `/methode`)
**Fichier :** `lib/site-data.ts` → `methodSteps`

Numéro, titre, description, sous-points (`details`).

### 7️⃣ Modèles de service (4 cartes homepage)
**Fichier :** `lib/site-data.ts` → `serviceModels`

### 8️⃣ "Pourquoi CiMB" (6 raisons homepage)
**Fichier :** `lib/site-data.ts` → `whyCimb`

### 9️⃣ Secteurs accompagnés
**Fichier :** `lib/site-data.ts` → `sectors`

### 🔟 Fonctionnalités du portail client
**Fichier :** `lib/site-data.ts` → `portalFeatures`

### 1️⃣1️⃣ Références / missions anonymisées
**Fichier :** `lib/site-data.ts` → `references`

6 missions avec type, description, 3 métriques chacune.

### 1️⃣2️⃣ Témoignages
**Fichier :** `lib/site-data.ts` → `testimonials`

⚠️ Actuellement marqués comme "fictifs à remplacer". À remplacer par de vrais retours clients dès que disponibles.

### 1️⃣3️⃣ Footer (colonnes de liens)
**Fichier :** `lib/site-data.ts` → `footerColumns`

---

## 📝 Contenu spécifique aux pages

Pour modifier un titre H1 ou un paragraphe d'introduction de page :

| Page | Fichier |
|---|---|
| Accueil — Hero, intro, CTA | `app/page.tsx` + `components/HeroSection.tsx` |
| À propos | `app/a-propos/page.tsx` |
| Expertises | `app/expertises/page.tsx` |
| Offres | `app/offres/page.tsx` (titre + tableau comparatif) |
| Méthode | `app/methode/page.tsx` (incluant les 10 étapes opérationnelles) |
| Références | `app/references/page.tsx` |
| Portail client | `app/portail-client/page.tsx` |
| Contact | `app/contact/page.tsx` |

Chaque page a un `<PageHero>` en haut avec `eyebrow`, `title`, `description` éditables directement.

---

## 🖼️ Images

**Fichier :** `lib/images.ts`

Catalogue de 13 images Unsplash. Pour remplacer par vos propres photos :

### Option A — Photos hébergées en local (recommandé en production)
1. Déposer vos JPG/PNG dans `public/images/`
2. Modifier `lib/images.ts` :
```ts
hero: {
  src: "/images/votre-photo.jpg",
  alt: "Description accessible de la photo.",
}
```

### Option B — URLs externes
Garder le même format, remplacer juste l'URL Unsplash.

⚠️ Si vous utilisez un nouveau domaine d'hébergement d'images, l'ajouter dans `next.config.ts` → `images.remotePatterns`.

---

## 🔍 SEO

**Fichier :** `lib/seo.ts`

Pour modifier la **description par défaut** ou les **mots-clés cibles** :

```ts
const DEFAULT_DESCRIPTION = "...";
const DEFAULT_KEYWORDS = [
  "maintenance biomédicale Djibouti",
  ...
];
```

Pour modifier le **JSON-LD** (Organization / ProfessionalService) : fonctions `organizationJsonLd()` et `professionalServiceJsonLd()`.

Chaque page définit sa propre `metadata` en haut du fichier `page.tsx` :
```ts
export const metadata: Metadata = buildMetadata({
  title: "Titre SEO",
  description: "Description meta unique.",
  path: "/chemin",
});
```

---

## 🎨 Identité visuelle

**Fichier :** `app/globals.css` → bloc `@theme`

Pour changer une couleur :
```css
@theme {
  --color-ink: #0B2545;        /* bleu encre principal */
  --color-teal: #0FB5A6;       /* accent biomédical */
  ...
}
```

Toutes les références `[color:var(--color-ink)]` dans le code seront mises à jour automatiquement.

---

## 🤝 Logos partenaires (page `/references` + homepage)

**Fichier :** `components/LogoWall.tsx` → `partners`

Pour remplacer les 6 logos fictifs par vos vrais clients :

1. Modifier le tableau `partners`
2. Soit conserver l'option SVG (`mark: "plus" | "pulse" | ...`)
3. Soit utiliser de vraies images en remplaçant `<PartnerLogo>` par un `<Image>` Next.js

---

## ✅ Checklist avant publication finale

- [ ] Coordonnées (téléphone, email, adresse) dans `site-data.ts`
- [ ] URL finale du site (`site.url`) dans `site-data.ts`
- [ ] Chiffres réels dans `heroStats` (homepage)
- [ ] Témoignages réels (ou retirer la section)
- [ ] Logos partenaires réels (ou retirer le `LogoWall`)
- [ ] Photos terrain réelles dans `public/images/` + mises à jour dans `lib/images.ts`
- [ ] Favicon et icônes PWA (déposer `app/icon.png`, `app/apple-icon.png`)
- [ ] OG image personnalisée (déposer `app/opengraph-image.png` 1200×630)
- [ ] Variable `NEXT_PUBLIC_SITE_URL` configurée sur Vercel
- [ ] Domaine personnalisé configuré
- [ ] Backend formulaire de contact (Resend, Formspree, Notion API…)

---

## 💡 Workflow d'édition recommandé dans Cursor

1. Ouvrir `lib/site-data.ts`
2. Modifier le bloc concerné
3. Sauvegarder (`Cmd+S`) → le serveur de dev hot-reload immédiatement
4. Vérifier visuellement sur `http://localhost:3090`
5. `git add . && git commit -m "content: update offres"`
6. `git push` → déploiement automatique Vercel si configuré
