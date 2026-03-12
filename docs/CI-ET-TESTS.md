# CI et tests – QualiDevis

## Tests (API)

Les tests unitaires de l’API sont dans `services/api/src/**/*.spec.ts`.

- **Lancer les tests** (depuis la racine ou depuis `services/api`) :
  ```bash
  npm run test -w api
  ```
  ou depuis `services/api` :
  ```bash
  npm run test
  ```

- **Couverture actuelle** :
  - `AiService.estimateProject` (estimation IA)
  - `calculateLeadPrice` (prix des leads par taille)

## CI (GitHub Actions)

Le workflow `.github/workflows/ci.yml` s’exécute sur les branches `main` et `master` (push et pull_request).

- **Job API** : `npm ci` à la racine, `prisma generate` et `npm run build -w api`, puis `npm run test` dans `services/api`.
- **Job Web** : `npm ci` à la racine, `npm run build -w web`.

Pour que la CI passe, il faut un `package-lock.json` à la racine du monorepo (généré par `npm install` une fois).
