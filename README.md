# K'BIO Conseil — Site vitrine (`kbio-conseil.com`)

Site **Next.js** pour **K'BIO Conseil** (ingénierie biomédicale & architecture hospitalière), aligné avec le site public [kbio-conseil.com](https://kbio-conseil.com/).

> 🛠️ **Modifier le site en autonomie (textes, images, couleurs)** → voir [`GUIDE_PRATIQUE.md`](./GUIDE_PRATIQUE.md) ⭐
> 📝 **Carte d'édition rapide** → voir [`CONTENT.md`](./CONTENT.md)
> 🚀 **Publication GitHub + Vercel + domaine** → voir [`DEPLOY.md`](./DEPLOY.md)

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript 5**
- **Tailwind CSS v4** (`@theme` natif dans `globals.css`)
- **Framer Motion** (animations sobres au scroll, compteurs, transitions menu)
- **lucide-react** (icônes)
- Architecture modulaire prête pour Vercel / CMS / Supabase

## Lancer en local

```bash
cd kbio-conseil.com   # dossier projet local
nvm use 24      # ou Node 20.18+
npm install
npm run dev     # http://127.0.0.1:3090
```

Les autres commandes :

```bash
npm run build   # build production
npm run start   # serve la build
npm run lint    # ESLint
```

## Architecture

```
/app
  layout.tsx                # layout racine + JSON-LD Organization & ProfessionalService
  page.tsx                  # accueil
  a-propos/page.tsx
  expertises/page.tsx
  offres/page.tsx
  methode/page.tsx
  references/page.tsx
  portail-client/page.tsx
  contact/page.tsx
  globals.css               # tokens Tailwind v4 (@theme)
  sitemap.ts                # /sitemap.xml
  robots.ts                 # /robots.txt
  not-found.tsx · error.tsx · loading.tsx

/components
  Header.tsx · Footer.tsx · Logo.tsx · Container.tsx
  HeroSection.tsx · PageHero.tsx · SectionHeading.tsx
  StatsGrid.tsx · ServiceCard.tsx · OfferCard.tsx
  MethodTimeline.tsx · ReferenceCard.tsx
  ClientPortalPreview.tsx · CTASection.tsx
  ContactForm.tsx · AnimatedReveal.tsx · Breadcrumb.tsx · SEOJsonLd.tsx
  Button.tsx

/lib
  site-data.ts              # source unique du contenu (CMS-ready)
  seo.ts                    # buildMetadata + JSON-LD helpers

/public/images, /public/icons   # placeholders à remplir
```

## Identité visuelle (originale)

| Token | Valeur | Usage |
|---|---|---|
| `--color-ink` | `#0B2545` | Bleu encre médical, titres et CTA primaire |
| `--color-teal` | `#0FB5A6` | Accent biomédical |
| `--color-sand` | `#F6F1E7` | Fond chaud secondaire |
| `--color-soft` | `#F7F9FC` | Sections aérées |
| `--color-line` | `#E6ECF3` | Cartes et séparateurs |

Typographie : **Inter** (chargée via `next/font`), couleurs et tokens définis dans `app/globals.css` sous `@theme`.

## SEO

- `generateMetadata` par page via `lib/seo.ts` (title, description, OG, Twitter, canonical)
- `JSON-LD` Organization + ProfessionalService injectés dans le layout racine
- `app/sitemap.ts` et `app/robots.ts` générés automatiquement par Next
- `themeColor` défini dans `viewport`
- Mots-clés cibles : maintenance biomédicale Djibouti, audit équipements médicaux, ingénierie biomédicale hospitalière, GMAO hospitalière, contrat de maintenance biomédicale

## Personnalisation rapide

Toutes les données éditables sont centralisées dans `lib/site-data.ts` :

- Coordonnées, navigation, chiffres clés
- Offres, expertises, méthode, secteurs, références, témoignages
- Liens du footer

Pour brancher un CMS (Notion, Supabase, headless), remplacer les exports de ce fichier par des fonctions asynchrones côté server component.

## Déploiement Vercel

```bash
npm i -g vercel
vercel link
vercel deploy --prod
```

Variable optionnelle : `NEXT_PUBLIC_SITE_URL` (par défaut `https://kbio-conseil.com` dans `lib/site-data.ts`).

## Notes

- Aucun contenu, image, code ou élément graphique n'a été repris d'Ergéa Group ou de tiers.
- Les chiffres affichés (audits, équipements, contrats…) sont des **valeurs génériques** à remplacer par les chiffres réels validés par la direction.
- Les témoignages de la page Références sont **explicitement marqués comme illustratifs** et à remplacer.
