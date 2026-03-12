# API EvalTravaux (NestJS)

**Démarrage gratuit, puis payant.** Les professionnels reçoivent 50 crédits de bienvenue à l’inscription. Au-delà, les crédits sont payants (packs 50 / 100 / 200).

## Base de données

Le fichier de migration initial `init_evaltravaux_schema` est dans `prisma/migrations/`. Pour l’appliquer :

1. **Démarrer PostgreSQL** (ex. Docker) :
   ```bash
   docker compose -f ../docker/docker-compose.yml up -d db
   ```
   Ou utilise une base locale sur `localhost:5432`.

2. **Vérifier le `.env`** dans ce dossier :
   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/evaltravaux"
   ```

3. **Appliquer les migrations** :
   ```bash
   npm run prisma:migrate
   ```
   Ou en production / CI :
   ```bash
   npm run prisma:migrate:deploy
   ```

4. **Générer le client Prisma** (déjà fait après une migration) :
   ```bash
   npm run prisma:generate
   ```

## Authentification (JWT)

- **POST /api/auth/register** – Inscription (body : `email`, `password`, `role`: `CUSTOMER` | `PROFESSIONAL` ; si `PROFESSIONAL` : `companyName`, `trade`, `city` obligatoires).
- **POST /api/auth/login** – Connexion (body : `email`, `password`). Retourne `access_token` + `user` + `professionalId` ou `customerId`.

Les routes **dashboard**, **credits** et **documents** exigent un Bearer token et que le `professionalId` (path ou body) corresponde au compte connecté. **reviews** exige un token (client ou pro).

Variable d’environnement : **JWT_SECRET** (obligatoire en prod).

## Paiement Stripe (packs de crédits)

- **POST /api/credits/create-checkout-session** – Body : `professionalId`, `packSize` (50 | 100 | 200), `successUrl`, `cancelUrl`. Retourne `{ url }` vers Stripe Checkout.
- **POST /api/credits/confirm-session** – Après redirection succès : body `professionalId`, `sessionId`. Vérifie le paiement et crédite le compte (idempotent).

Variable : **STRIPE_SECRET_KEY** (clé secrète Stripe). Si absente, l’achat par Stripe est désactivé (le bouton renverra une erreur). Appliquer la migration `20240315120000_add_stripe_payment` pour la table `StripePayment`.

## Emails automatiques

Le module **email** utilise **Nodemailer**. Si les variables SMTP sont définies, les vrais emails sont envoyés ; sinon les événements sont loggés en console.

Variables optionnelles : `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `SMTP_SECURE`.

Événements envoyés : nouveau lead (aux pros), lead acheté (confirmation + alerte solde &lt; 20), demande d’avis client, relance documents (à déclencher par un cron).

## Déploiement Render

Variables d'environnement à configurer sur Render pour l'API :

| Variable | Description |
|----------|--------------|
| `DATABASE_URL` | URL PostgreSQL (Render propose une base PostgreSQL) |
| `JWT_SECRET` | Secret pour signer les JWT (générer une chaîne aléatoire) |
| `CORS_ORIGIN` | URL du frontend (ex. `https://evaltravaux.onrender.com`) |
| `STRIPE_SECRET_KEY` | Clé secrète Stripe pour les paiements |

Le frontend (Next.js) doit définir `NEXT_PUBLIC_API_URL` vers l'URL de cette API (ex. `https://evaltravaux-api.onrender.com`).
