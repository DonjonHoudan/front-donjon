# Spécification — Mise à jour des dépendances front-donjon

## 1. Objectif

Mettre à jour les dépendances du projet Next.js de manière contrôlée, reproductible et vérifiable, afin de bénéficier des correctifs de sécurité, corrections de bugs et améliorations de compatibilité, sans introduire de régression fonctionnelle.

Cette spec couvre :

- la mise à jour des dépendances Next.js, React et de l'écosystème associé ;
- les vérifications techniques avant et après mise à jour ;
- les tests de non-régression visuels et fonctionnels ;
- les critères d'acceptation permettant de valider que rien ne casse.

## 2. Périmètre

### Inclus

- Audit des versions actuelles dans `package.json` et le lockfile.
- Mise à jour des packages patch et minor sans breaking changes avérés.
- Décision explicite sur les sauts majeurs (ESLint 10, TypeScript 6).
- Résolution des 3 vulnérabilités actuelles (1 moderate, 2 high) signalées par `npm audit`.
- Validation locale des pages et des appels API Strapi.

### Exclu

- Refonte fonctionnelle ou de l'architecture.
- Migration de Next.js App Router vers Pages Router ou inversement.
- Modification de l'intégration Strapi ou du schéma de données.
- Passage à un autre framework CSS que Tailwind.

## 3. État actuel des dépendances (2026-05-17)

### Résumé `npm outdated`

| Package | Installé | Voulu (range) | Dernier |
|---|---|---|---|
| `next` | 16.2.3 | 16.2.6 | 16.2.6 |
| `@next/third-parties` | 16.2.3 | 16.2.6 | 16.2.6 |
| `eslint-config-next` | 16.2.3 | 16.2.6 | 16.2.6 |
| `react` | 19.2.5 | 19.2.6 | 19.2.6 |
| `react-dom` | 19.2.5 | 19.2.6 | 19.2.6 |
| `react-toastify` | 11.0.5 | 11.1.0 | 11.1.0 |
| `tailwindcss` | 4.2.2 | 4.3.0 | 4.3.0 |
| `@tailwindcss/postcss` | 4.2.2 | 4.3.0 | 4.3.0 |
| `tailwind-merge` | 3.5.0 | 3.6.0 | 3.6.0 |
| `primereact` | 10.9.7 | 10.9.8 | 10.9.8 |
| `axios` | 1.15.0 | 1.16.1 | 1.16.1 |
| `@types/node` | 25.5.2 | 25.8.0 | 25.8.0 |
| `eslint` | 9.39.4 | 9.39.4 | 10.4.0 |
| `typescript` | 5.9.3 | 5.9.3 | 6.0.3 |

### Vulnérabilités

```text
moderate : 1
high     : 2
total    : 3
```

Identifier les packages concernés avec `npm audit` avant mise à jour.

## 4. Pré-requis

Avant toute modification :

- La branche `dev` est propre et à jour.
- Une branche dédiée est créée : `chore/update-dependencies`.
- Le projet démarre correctement avant upgrade (`npm run dev`).
- Le build passe avant upgrade (`npm run build`).
- Le typecheck passe avant upgrade (`npx tsc --noEmit`).
- Le linter passe avant upgrade (`npm run lint`).
- Node.js 20 LTS ou 22 LTS est utilisé (compatible Next.js 16).
- Le gestionnaire de paquets est `npm`.

## 5. Décisions préalables

Avant d'exécuter la mise à jour, valider explicitement les choix suivants :

```text
Mises à jour patch/minor (sans breaking changes attendus) : OUI
  - next, @next/third-parties, eslint-config-next : 16.2.3 → 16.2.6
  - react, react-dom                              : 19.2.5 → 19.2.6
  - react-toastify                                : 11.0.5 → 11.1.0
  - tailwindcss, @tailwindcss/postcss             : 4.2.2  → 4.3.0
  - tailwind-merge                                : 3.5.0  → 3.6.0
  - primereact                                    : 10.9.7 → 10.9.8
  - axios                                         : 1.15.0 → 1.16.1
  - @types/node                                   : 25.5.2 → 25.8.0

Saut majeur ESLint 9 → 10 : À DÉCIDER
  - Risque : possible breaking change sur les règles de config flat config
  - Recommandation : reporter à une mise à jour dédiée

Saut majeur TypeScript 5 → 6 : À DÉCIDER
  - Risque : breaking changes sur les types stricts
  - Recommandation : reporter à une mise à jour dédiée
```

## 6. Plan d'exécution

### 6.1 Préparation

```bash
git checkout dev
git pull
git checkout -b chore/update-dependencies
npm install
npm run build
npx tsc --noEmit
npm run lint
npm audit
```

Conserver une copie du lockfile actuel pour comparaison :

```bash
cp package-lock.json package-lock.json.bak
```

### 6.2 Mise à jour des dépendances

Mettre à jour uniquement ce qui a été validé en section 5.

#### Option A — mise à jour via la range actuelle du package.json

```bash
npm update
```

Cette commande met à jour tous les packages dans la range définie (`^`). Elle ne touchera pas ESLint ni TypeScript dont la dernière version est hors range.

#### Option B — mise à jour ciblée package par package

```bash
npm install next@latest @next/third-parties@latest eslint-config-next@latest
npm install react@latest react-dom@latest
npm install react-toastify@latest
npm install tailwindcss@latest @tailwindcss/postcss@latest tailwind-merge@latest
npm install primereact@latest
npm install axios@latest
npm install --save-dev @types/node@latest
```

#### Après mise à jour

- Relire le diff de `package.json` et `package-lock.json`.
- Vérifier qu'aucun package hors périmètre n'a été modifié.
- Vérifier la cohérence des `overrides` pour `@types/react` et `@types/react-dom`.

### 6.3 Résolution des vulnérabilités

```bash
npm audit
npm audit fix
```

Si `npm audit fix` ne suffit pas, inspecter chaque vulnérabilité et décider manuellement :

```bash
npm audit --json | jq '.vulnerabilities'
```

Ne pas utiliser `npm audit fix --force` sans revue préalable — cela peut forcer des sauts majeurs non planifiés.

## 7. Vérifications obligatoires après upgrade

### 7.1 Vérifications techniques

Toutes les commandes suivantes doivent passer :

```bash
npm install
npm run build
npx tsc --noEmit
npm run lint
npm audit
```

Résultats attendus :

- `npm run build` : exit code 0, aucune erreur TypeScript ou de compilation.
- `npx tsc --noEmit` : aucune erreur de type.
- `npm run lint` : aucune erreur bloquante (les warnings sont acceptables si identiques à avant).
- `npm audit` : 0 high, 0 critical (moderate à évaluer au cas par cas).

### 7.2 Vérifications runtime

Démarrer le serveur de développement :

```bash
npm run dev
```

Vérifier :

- le serveur démarre sans erreur dans le terminal ;
- aucune erreur bloquante n'apparaît dans la console navigateur ;
- aucune erreur hydration React n'apparaît.

### 7.3 Vérifications par page

Tester manuellement chaque route de l'application :

| Route | Ce qu'il faut vérifier |
|---|---|
| `/` | Homepage, carousel PrimeReact, section hero |
| `/programmation` | Liste des événements, pagination, filtres |
| `/programmation/[slug]` | Détail d'un événement, rich text Strapi |
| `/actualites` | Liste des articles |
| `/actualites/[slug]` | Détail d'un article, rich text Strapi |
| `/contact` | Formulaire Formik, validation Yup, reCAPTCHA, envoi |
| Toute page de newsletter | Formulaire d'inscription, envoi |

Pour chaque page :

- la page se charge sans erreur ;
- les images Strapi s'affichent (composant `ImageStrapi`) ;
- les placeholders de blur s'affichent pendant le chargement ;
- les blocs rich text Strapi s'affichent correctement ;
- le layout navbar/footer est intact.

### 7.4 Vérifications des appels API Strapi

Dans l'onglet Network du navigateur :

- les requêtes vers `NEXT_PUBLIC_STRAPI_URL` retournent HTTP 200 ;
- le format des réponses est inchangé (pas de régression sur `populate`, filtres, pagination) ;
- le header `Authorization: Bearer` est présent sur les routes protégées.

### 7.5 Vérifications des composants critiques

- **Carousel PrimeReact** : navigation, responsive, images.
- **Formulaires Formik + Yup** : validation des champs, affichage des erreurs.
- **Google reCAPTCHA v3** : s'initialise sans erreur console.
- **react-toastify** : les notifications s'affichent au bon moment.
- **react-icons** : les icônes s'affichent partout.
- **Tailwind CSS** : aucune régression de style visible sur desktop et mobile.

### 7.6 Vérifications Tailwind CSS (si 4.2 → 4.3)

Tailwind 4.x est une version récente avec un système de configuration différent de Tailwind 3. En cas de mise à jour mineure :

- vérifier que le fichier de configuration CSS est toujours valide ;
- vérifier qu'aucune classe utilitaire n'a été renommée ou supprimée ;
- inspecter visuellement les pages les plus riches en styles.

## 8. Tests de non-régression minimum

La mise à jour est considérée valide seulement si les scénarios suivants passent.

### Scénarios de navigation

- Accès à la homepage → contenu Strapi chargé.
- Accès à la liste des programmations → liste affichée.
- Clic sur une programmation → page détail affichée, rich text présent.
- Accès à la liste des actualités → liste affichée.
- Clic sur une actualité → page détail affichée.
- Navigation entre pages via la navbar → aucun rechargement complet inattendu.

### Scénarios de formulaire

- Remplir et soumettre le formulaire de contact avec des données valides → succès.
- Soumettre le formulaire de contact avec des champs vides → erreurs Yup affichées.
- Soumettre le formulaire newsletter avec un email valide → succès.

### Scénarios d'affichage

- Images Strapi affichées sur toutes les pages.
- Carousel PrimeReact fonctionnel sur la homepage.
- Affichage correct sur mobile (responsive Tailwind).
- Affichage correct sur desktop.

### Scénarios API

- Les routes Next.js API (`app/api/`) répondent correctement.
- La validation reCAPTCHA fonctionne côté serveur.

## 9. Critères d'acceptation

La mise à jour est acceptée si :

- `npm install` passe sans erreur ;
- `npm run build` passe sans erreur ;
- `npx tsc --noEmit` passe sans erreur ;
- `npm run lint` passe sans régression par rapport à avant ;
- `npm audit` ne signale aucune vulnérabilité high ou critical ;
- le serveur de développement démarre sans erreur ;
- toutes les pages chargent correctement ;
- les formulaires fonctionnent (contact, newsletter) ;
- les images et le rich text Strapi s'affichent ;
- le carousel PrimeReact fonctionne ;
- aucune erreur bloquante dans la console navigateur ;
- la revue du diff ne détecte aucune modification inattendue du code source ;
- le lockfile est cohérent.

## 10. Plan de rollback

En cas d'échec :

1. Stopper le serveur de développement.
2. Revenir à la branche précédente : `git checkout dev`.
3. Restaurer le lockfile : `cp package-lock.json.bak package-lock.json && npm install`.
4. Documenter l'erreur rencontrée et le package responsable.
5. Identifier si le problème vient :
   - d'un breaking change dans `next`, `react` ou `react-dom` ;
   - d'un composant PrimeReact ;
   - d'une incompatibilité Tailwind CSS ;
   - d'un changement dans `axios` ou les API routes ;
   - d'une incompatibilité TypeScript ou ESLint.

## 11. Checklist finale

```text
[ ] Branche dédiée créée
[ ] Versions actuelles documentées
[ ] Décisions sur ESLint 10 et TypeScript 6 prises
[ ] Build OK avant mise à jour
[ ] Typecheck OK avant mise à jour
[ ] Lint OK avant mise à jour
[ ] Dépendances mises à jour
[ ] Lockfile régénéré proprement
[ ] Diff package.json et package-lock.json revus
[ ] Build OK après mise à jour
[ ] Typecheck OK après mise à jour
[ ] Lint OK après mise à jour
[ ] npm audit OK (0 high, 0 critical)
[ ] Serveur dev démarre sans erreur
[ ] Homepage OK
[ ] Programmations (liste + détail) OK
[ ] Actualités (liste + détail) OK
[ ] Formulaire contact OK
[ ] Formulaire newsletter OK
[ ] Images Strapi OK
[ ] Rich text Strapi OK
[ ] Carousel PrimeReact OK
[ ] Responsive mobile OK
[ ] Console navigateur sans erreur bloquante
[ ] API routes Next.js OK
[ ] Plan de rollback prêt
[ ] PR prête pour revue
```

## 12. Notes de PR recommandées

```md
## Objectif
Mise à jour des dépendances patch/minor du projet Next.js.

## Versions principales
- next : 16.2.3 → 16.2.6
- react / react-dom : 19.2.5 → 19.2.6
- tailwindcss : 4.2.2 → 4.3.0

## Hors périmètre (décision explicite)
- ESLint 9 → 10 : reporté
- TypeScript 5 → 6 : reporté

## Commandes exécutées
- npm update
- npm audit fix
- npm run build
- npx tsc --noEmit
- npm run lint

## Vérifications
- [ ] Build OK
- [ ] Typecheck OK
- [ ] Lint OK
- [ ] npm audit OK
- [ ] Pages principales OK
- [ ] Formulaires OK
- [ ] Images et rich text Strapi OK
- [ ] Console navigateur OK

## Risques identifiés
- <à compléter>

## Rollback
Retour à la branche dev + restauration du lockfile de sauvegarde.
```

## 13. Références utiles

- Next.js — Releases : https://github.com/vercel/next.js/releases
- Next.js — Upgrade guide : https://nextjs.org/docs/app/building-your-application/upgrading
- React 19 — Changelog : https://react.dev/blog
- Tailwind CSS v4 — Upgrade guide : https://tailwindcss.com/docs/upgrade-guide
- PrimeReact — Changelog : https://primereact.org/changelog/
- TypeScript — Breaking changes : https://www.typescriptlang.org/docs/handbook/release-notes/overview.html
- ESLint — Migration v10 : https://eslint.org/docs/latest/use/migrate-to-10-0-0
