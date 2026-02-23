# Le Donjon de Houdan — Frontend

Site web officiel du Donjon de Houdan, un musée français. Ce dépôt contient le frontend Next.js qui consomme un CMS Strapi en backend.

## Stack technique

- **Next.js 15** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS** + `clsx` / `tailwind-merge`
- **Strapi CMS** — source de toutes les données de contenu
- **PrimeReact** — composants UI (carrousels, champs de formulaire)
- **Formik + Yup** — gestion et validation de formulaires
- **Google reCAPTCHA v3** — protection anti-spam
- **Vercel** — hébergement et déploiement

## Prérequis

- Node.js 18+
- Une instance Strapi accessible (locale ou distante)

## Installation

```bash
npm install
```

Copier le fichier d'exemple des variables d'environnement :

```bash
cp .env.example .env.local
```

Renseigner les variables dans `.env.local` (voir section [Variables d'environnement](#variables-denvironnement)).

## Commandes

| Commande | Description |
|---|---|
| `npm run dev` | Lance le serveur de développement sur le port 3000 (Turbopack) |
| `npm run build` | Compile le projet pour la production |
| `npm run start` | Lance le serveur de production |
| `npm run lint` | Analyse le code avec ESLint (`next/core-web-vitals`) |

## Variables d'environnement

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_STRAPI_URL` | URL de base de l'API Strapi (ex: `http://localhost:1337/api`) |
| `NEXT_PUBLIC_STRAPI_IMAGE` | URL du serveur d'images Strapi (ex: `http://localhost:1337`) |
| `STRAPI_API_KEY` | Clé d'authentification Strapi (côté serveur uniquement) |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Clé publique Google reCAPTCHA v3 |
| `RECAPTCHA_SECRET_KEY` | Clé secrète Google reCAPTCHA v3 (côté serveur uniquement) |

> Les variables sans préfixe `NEXT_PUBLIC_` ne sont jamais exposées au navigateur.

## Architecture

### Structure des dossiers

```
app/
├── (home)/               # Page d'accueil (layout et navbar spécifiques)
├── (content)/            # Toutes les autres pages (layout commun)
│   ├── actualites/       # Articles d'actualité (liste + [slug])
│   ├── programmation/    # Événements (liste + [slug])
│   ├── le-donjon/        # Présentation du monument
│   ├── preparez-votre-visite/
│   ├── contact/
│   ├── inscription-newsletter/
│   ├── mentions-legales/
│   └── politique-confidentialite/
├── api/                  # Routes API Next.js (formulaires, newsletter, reCAPTCHA)
└── layout.tsx            # Layout racine

components/               # Composants partagés (navbar, footer, cards…)
lib/
├── api/
│   ├── clientStrapi.ts   # Client fetch vers Strapi
│   └── resources/        # Fetchers par ressource Strapi
├── constants.ts          # Constantes et variables d'environnement centralisées
└── utils/
    └── cn.ts             # Utilitaire de fusion de classes Tailwind
```

### Flux de données

Les composants serveur récupèrent le contenu directement depuis Strapi via `lib/api/clientStrapi.ts` (fetch natif). Chaque type de ressource dispose d'un fetcher dédié dans `lib/api/resources/`.

Les routes API (`app/api/`) traitent côté serveur les soumissions de formulaires (contact, newsletter) et la validation reCAPTCHA, afin de ne jamais exposer les clés secrètes au client.

### Composants clés

| Composant | Rôle |
|---|---|
| `ImageStrapi` | Encapsule `next/image` avec la construction d'URL Strapi et les placeholders flous |
| `RichTextStrapi` | Rendu du contenu riche Strapi via `@strapi/blocks-react-renderer` |
| `navbarHome` | Variante de navigation propre à la page d'accueil |
| `navbar` / `navbarMobile` | Navigation standard desktop et mobile |

### Conventions

- Les composants spécifiques à une page se placent dans un sous-dossier `_components/` à côté de la page concernée.
- L'alias `@/*` pointe vers la racine du projet.
- La fusion de classes Tailwind se fait via `cn()` (`lib/utils/cn.ts`).

## Déploiement

Le projet est déployé sur **Vercel**. Les domaines d'images Strapi distants sont déclarés dans `next.config.mjs`.
