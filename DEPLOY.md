# Guide de déploiement — Site CiMB

## 🚀 Recommandation : GitHub + Vercel

**Pourquoi cette stack ?**
- Vercel = créateurs de Next.js → 0 config, déploiement en 90 secondes
- Preview URL automatique sur chaque commit (utile pour validation HORNCARE/CiMB)
- HTTPS auto, CDN global, certificat SSL gratuit
- Free tier largement suffisant pour un site corporate (100 GB de bande passante/mois)
- Domaine personnalisé : ajout en 5 min, configuration DNS guidée

---

## 1️⃣ GitHub — pousser le projet

### A. Première fois (créer le repo)

```bash
cd /Users/kad/Projects/cimb-site

# Authentifier gh CLI (le token actuel est expiré)
gh auth login -h github.com -p https -w
# → choisir : "GitHub.com" → HTTPS → "Y" pour Git → "Login with a web browser"
# → copier le code, ouvrir le navigateur, valider

# Créer le repo et push
gh repo create kadQ6/Cimb --public --source=. --remote=origin --push \
  --description "Site corporate CiMB — Centre d'Ingénierie et de Maintenance Biomédicale (HORNCARE Djibouti)"
```

### B. Mises à jour suivantes

```bash
git add .
git commit -m "content: update homepage stats"
git push
```

### C. Renommer la branche par défaut (optionnel)

Le repo est en `main`, c'est déjà la convention GitHub moderne.

---

## 2️⃣ Vercel — déploiement automatique

### Option 1 — Via interface web (le plus simple)

1. Aller sur [https://vercel.com/new](https://vercel.com/new)
2. Connecter votre compte GitHub si ce n'est pas fait
3. Sélectionner le repo `kadQ6/Cimb`
4. Vercel détecte automatiquement Next.js → cliquer **Deploy**
5. ~90 secondes plus tard : URL de preview live

### Option 2 — Via CLI

```bash
npm i -g vercel
cd /Users/kad/Projects/cimb-site
vercel link            # lier au projet
vercel --prod          # déployer en production
```

### Variables d'environnement à configurer sur Vercel

Dans **Project Settings → Environment Variables** :

| Nom | Valeur | Environnement |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://votre-domaine.com` | Production |
| `NEXT_PUBLIC_SITE_URL` | `https://cimb-preview.vercel.app` | Preview |

(Ces valeurs ne sont **pas obligatoires** — le site fonctionne avec le fallback `https://cimb-djibouti.com` codé dans `lib/site-data.ts`. Mais elles permettent un canonical SEO correct par environnement.)

---

## 3️⃣ Domaine personnalisé

### Sur Vercel

1. **Project → Settings → Domains**
2. Ajouter `cimb-djibouti.com` (ou le domaine choisi)
3. Vercel donne 2 enregistrements DNS à configurer chez votre registrar :
   - `A` : `76.76.21.21`
   - `CNAME www` : `cname.vercel-dns.com`
4. Propagation DNS : 5 min à 24h
5. SSL automatique dès propagation

### Domaines suggérés
- `cimb-djibouti.com` (idéal SEO local)
- `cimb.dj` (TLD pays Djibouti)
- `cimb.horncare.com` (sous-domaine HORNCARE)

---

## 4️⃣ Backend formulaire de contact

Le formulaire actuel (`components/ContactForm.tsx`) **simule** l'envoi (UI seulement). Pour le rendre fonctionnel, 3 options recommandées :

### Option A — Resend + Server Action (recommandé)
**Coût** : gratuit jusqu'à 3 000 emails/mois
**Avantages** : code maison, données dans votre infra, HTML email contrôlé

```bash
npm i resend
```

Créer `app/contact/actions.ts` avec une Server Action `sendContact(formData)`.
Tutoriel officiel : [https://resend.com/docs/send-with-nextjs](https://resend.com/docs/send-with-nextjs)

### Option B — Formspree
**Coût** : gratuit jusqu'à 50 soumissions/mois
**Avantages** : 0 ligne de code backend, dashboard inclus

Inscription → formulaire → coller l'URL d'action dans `<form action="...">`.

### Option C — Notion API
**Coût** : gratuit
**Avantages** : centralisation dans votre Notion existant K'BIO

Créer une base "Demandes site CiMB" → utiliser Server Action + `@notionhq/client`.

---

## 5️⃣ Analytics (recommandé)

### Plausible.io (recommandé — RGPD-friendly)
- **Coût** : 9 $/mois ou self-hosted gratuit
- **Avantages** : pas de cookies, ultra-léger (1 KB), respect vie privée

```html
<!-- Ajouter dans app/layout.tsx -->
<Script defer data-domain="cimb-djibouti.com" src="https://plausible.io/js/script.js" />
```

### Vercel Analytics (alternative)
**Coût** : gratuit pour les sites de base, intégré à Vercel.

```bash
npm i @vercel/analytics
```

---

## 6️⃣ Optimisations à prévoir post-publication

### Court terme (semaine 1)
- [ ] Favicon `app/icon.png` (512×512) et `app/apple-icon.png` (180×180)
- [ ] OG image personnalisée `app/opengraph-image.png` (1200×630)
- [ ] Soumission `sitemap.xml` à Google Search Console
- [ ] Backend formulaire de contact actif
- [ ] Vérification mobile sur vrais appareils

### Moyen terme (mois 1)
- [ ] Photos terrain réelles (remplacer Unsplash)
- [ ] Vrais témoignages clients
- [ ] Vrais logos partenaires
- [ ] Page blog `/actualites` si stratégie de contenu
- [ ] Schema.org étendu (Service, FAQPage)

### Long terme
- [ ] Version anglaise `/en/...` pour bailleurs internationaux
- [ ] Espace client réel (intégration Supabase/Auth)
- [ ] CMS pour mise à jour autonome (Sanity, Notion sync, ou Supabase admin)

---

## 🆘 En cas de problème

```bash
# Build cassé localement ?
rm -rf .next node_modules
npm install
npm run build

# Vercel build cassé ?
# → Vérifier les logs sur dashboard.vercel.com
# → 95 % du temps : variable d'environnement manquante

# Page ne se met pas à jour ?
# → Hard refresh navigateur (Cmd+Shift+R)
# → Sur Vercel : Deployments → "Redeploy" sans cache
```
