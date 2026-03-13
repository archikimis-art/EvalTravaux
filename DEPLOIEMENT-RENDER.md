# Guide de déploiement EvalTravaux sur Render

Ce guide vous accompagne pas à pas pour déployer EvalTravaux (API NestJS + Frontend Next.js) sur Render.

---

## Option rapide : Blueprint (render.yaml)

Un fichier **`render.yaml`** est à la racine du projet. Il définit automatiquement :
- La base PostgreSQL `evaltravaux-db`
- Le service API `evaltravaux-api`
- Le service Web `evaltravaux`
- Les variables d'environnement (sauf `STRIPE_SECRET_KEY` à saisir)

**Pour l'utiliser :**
1. Commitez et poussez `render.yaml` sur GitHub
2. Render Dashboard → **New +** → **Blueprint**
3. Connectez le dépôt **EvalTravaux**
4. Render détecte le fichier et propose de créer les services
5. Lors de la création, **ajoutez `STRIPE_SECRET_KEY`** (Render vous le demandera pour la variable `sync: false`)
6. Validez

---

## Option manuelle (étape par étape)

## Prérequis

- Un compte [Render](https://render.com)
- Le dépôt GitHub connecté à Render
- Un compte Stripe (pour les paiements)
- Un identifiant customer "public" (créé après le premier déploiement)

---

## Étape 1 : Créer la base de données PostgreSQL

⚠️ **Important** : Si vous aviez une ancienne base nommée `qualidevis_db_*`, créez une **nouvelle** base pour EvalTravaux. Le nom de la base est défini par Render à la création et ne peut pas être modifié.

1. Connectez-vous à [Render Dashboard](https://dashboard.render.com)
2. Cliquez sur **New +** → **PostgreSQL**
3. Configurez :
   - **Name** : `evaltravaux-db`
   - **Database** : `evaltravaux`
   - **User** : (laissé par défaut)
   - **Region** : Choisissez la plus proche (ex. Frankfurt)
   - **Plan** : Free (pour commencer)
4. Cliquez sur **Create Database**
5. Une fois créée, notez l’**Internal Database URL** (visible dans l’onglet *Info*)
   - Format : `postgresql://user:password@host/database?sslmode=require` — l'URL ne doit plus contenir "qualidevis"
   - ⚠️ Utilisez l’**Internal** URL (pas External) pour que l’API et la BDD soient sur le même réseau Render

---

## Étape 2 : Déployer l’API (service NestJS)

1. Dans le Dashboard Render, cliquez sur **New +** → **Web Service**
2. Connectez votre dépôt GitHub si ce n’est pas déjà fait
3. Sélectionnez le dépôt **EvalTravaux** (ou le nom que vous avez donné)
4. Configurez le service :

| Champ | Valeur |
|-------|--------|
| **Name** | `evaltravaux-api` |
| **Region** | Même que la base (ex. Frankfurt) |
| **Branch** | `main` (ou votre branche principale) |
| **Root Directory** | `services/api` |
| **Runtime** | Node |
| **Build Command** | `npm install && npx prisma generate && npm run build && npx prisma migrate deploy && npm run prisma:seed` |
| **Start Command** | `npm run start` |

5. Cliquez sur **Advanced** puis **Add Environment Variable**
6. Ajoutez les variables suivantes :

| Key | Value |
|-----|-------|
| `DATABASE_URL` | Collez l’**Internal Database URL** de l’étape 1 |
| `JWT_SECRET` | Générez une chaîne aléatoire (ex. `openssl rand -hex 32`) |
| `CORS_ORIGIN` | `https://evaltravaux.fr,https://evaltravaux.paris` *(domaines séparés par des virgules)* |
| `NODE_ENV` | `production` |
| `STRIPE_SECRET_KEY` | Votre clé secrète Stripe (sk_live_... ou sk_test_...) |

7. Pour `CORS_ORIGIN` : si vous ne connaissez pas encore l’URL du frontend, mettez temporairement `https://evaltravaux.fr` ou créez d’abord le service Web (étape 3) pour obtenir son URL, puis revenez modifier `CORS_ORIGIN`.

8. Cliquez sur **Create Web Service**
9. Attendez le premier déploiement. Une fois terminé, notez l’URL de l’API (ex. `https://evaltravaux-api.onrender.com`)

---

## Étape 3 : Créer le customer "public" (pour les leads anonymes)

Le formulaire de devis public a besoin d’un customer par défaut. Le seed Prisma s'exécute automatiquement lors du build de l'API (étape 2). Il crée un customer avec l'ID **`public-customer-evaltravaux`**. Utilisez cette valeur à l'étape 4.

---

## Étape 4 : Déployer le frontend (service Next.js)

1. Dans le Dashboard Render, cliquez sur **New +** → **Web Service**
2. Sélectionnez le même dépôt **EvalTravaux**
3. Configurez :

| Champ | Valeur |
|-------|--------|
| **Name** | `evaltravaux` (ou `evaltravaux-web`) |
| **Region** | Même que l’API |
| **Branch** | `main` |
| **Root Directory** | `apps/web` |
| **Runtime** | Node |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm run start` |

4. Ajoutez les variables d’environnement :

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_API_URL` | `https://evaltravaux-api.onrender.com` *(l’URL de votre API)* |
| `NEXT_PUBLIC_PUBLIC_CUSTOMER_ID` | L’ID du customer public créé à l’étape 3 |

5. Cliquez sur **Create Web Service**
6. Notez l’URL du frontend (ex. `https://evaltravaux.fr`)

---

## Étape 5 : Mettre à jour CORS sur l’API

1. Retournez dans le service **evaltravaux-api**
2. Onglet **Environment**
3. Modifiez `CORS_ORIGIN` pour qu’il corresponde exactement à l’URL du frontend :
   - Exemple : `https://evaltravaux.fr`
4. Sauvegardez. Render redéploiera automatiquement.

---

## Étape 6 : Vérifications

1. **Frontend** : Ouvrez `https://evaltravaux.fr` (ou votre URL)
2. **Inscription** : Testez l’inscription d’un professionnel
3. **Formulaire devis** : Remplissez une demande de devis sur une page type `/devis-plombier-paris`
4. **Dashboard pro** : Connectez-vous et vérifiez les leads, l’achat de crédits Stripe

---

## Dépannage

### L’API ne démarre pas
- Vérifiez les logs dans Render (onglet *Logs*)
- Vérifiez que `DATABASE_URL` utilise l’**Internal** URL
- Vérifiez que les migrations Prisma ont réussi (visible dans les logs de build)

### Erreur CORS
- `CORS_ORIGIN` doit correspondre exactement à l’URL du frontend (sans slash final)
- Pas de `*` en production pour la sécurité

### Le formulaire de devis ne crée pas de lead
- Vérifiez que `NEXT_PUBLIC_PUBLIC_CUSTOMER_ID` est défini et existe en base
- Vérifiez les logs de l’API

### Stripe ne fonctionne pas
- Vérifiez que `STRIPE_SECRET_KEY` est défini
- En test, utilisez `sk_test_...`
- Les URLs de redirection (success/cancel) sont générées automatiquement par le frontend

### "We don't have access to your repo" / Build utilise un ancien commit
- Render peut déployer un commit obsolète si la connexion GitHub est limitée
- **Solution** : Dashboard → votre service → **Settings** → **Build & Deploy**
  - Vérifiez que **Branch** = `main`
  - Cliquez sur **Manual Deploy** → **Deploy latest commit** pour forcer le dernier commit
- Vérifiez que le dépôt GitHub est bien connecté (Dashboard → **Account Settings** → **Connected Accounts**)

### Erreur "Cannot read properties of undefined (reading 'split')" sur la page devis
- Cette erreur est corrigée depuis le commit qui utilise le param `metier-ville` pour le segment `[metier]-[ville]`
- Si elle persiste, assurez-vous que Render déploie le **dernier commit** (voir ci-dessus)

---

## Domaines personnalisés (evaltravaux.fr, evaltravaux.paris)

1. **Service evaltravaux** (frontend) : **Settings** → **Custom Domains** → ajouter :
   - `evaltravaux.fr`
   - `www.evaltravaux.fr`
   - `evaltravaux.paris`
   - `www.evaltravaux.paris`
2. **DNS** (chez domaines.fr) : créer des enregistrements CNAME pour chaque domaine/subdomaine pointant vers l’URL indiquée par Render (ex. `evaltravaux.onrender.com`).
3. **API** : `CORS_ORIGIN` = `https://evaltravaux.fr,https://evaltravaux.paris` (les deux domaines sont déjà autorisés).

---

## Récapitulatif des URLs

| Service | URL typique |
|---------|-------------|
| Frontend | `https://evaltravaux.fr` / `https://evaltravaux.paris` |
| API | `https://evaltravaux-api.onrender.com` |
| Base de données | Internal uniquement (non accessible depuis l’extérieur) |

---

## Coûts (plan Free)

- **PostgreSQL** : 90 jours gratuits, puis suppression des données
- **Web Services** : le service s’endort après 15 min d’inactivité (premier chargement lent au réveil)

Pour la production, envisagez un plan payant pour éviter la mise en veille et conserver les données.
