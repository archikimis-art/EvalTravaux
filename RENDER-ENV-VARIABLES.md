# Configuration Render – EvalTravaux

## Service evaltravaux (Frontend) – Paramètres de build

| Champ | Valeur |
|-------|--------|
| **Root Directory** | *(vide – racine du dépôt)* |
| **Build Command** | `npm install --include=dev && npm run build:web` |
| **Start Command** | `npm run start:web` |

---

## Variables d'environnement – Copier-coller

Ouvrez ce fichier et copiez chaque paire **Key** / **Value** dans le Dashboard Render.

---

## Service evaltravaux-api → Environment → Add Environment Variable

### 1. DATABASE_URL
**Key:** `DATABASE_URL`  
**Value:** *(Collez votre Internal Database URL depuis Render > evaltravaux-db > Info)*  
Exemple : `postgresql://evaltravaux_db_g4ka_user:XXXX@dpg-d6pinhbh46gs73c781b0-a/evaltravaux_db_g4ka?sslmode=require`

### 2. JWT_SECRET
**Key:** `JWT_SECRET`  
**Value:** *(Générez une chaîne aléatoire de 32+ caractères)*  
Exemple : `a1b2c3d4e5f6789012345678901234567890abcdef`

### 3. CORS_ORIGIN
**Key:** `CORS_ORIGIN`  
**Value:** `https://evaltravaux.onrender.com`

### 4. NODE_ENV
**Key:** `NODE_ENV`  
**Value:** `production`

### 5. STRIPE_SECRET_KEY
**Key:** `STRIPE_SECRET_KEY`  
**Value:** *(Votre clé Stripe : sk_test_... ou sk_live_...)*

---

## Service evaltravaux → Environment → Add Environment Variable

### 1. NEXT_PUBLIC_API_URL
**Key:** `NEXT_PUBLIC_API_URL`  
**Value:** `https://evaltravaux-api.onrender.com`

### 2. NEXT_PUBLIC_PUBLIC_CUSTOMER_ID
**Key:** `NEXT_PUBLIC_PUBLIC_CUSTOMER_ID`  
**Value:** `public-customer-evaltravaux`

---

## Ordre des étapes

1. Render Dashboard → **evaltravaux-api** → **Environment** → **Add Environment Variable**
2. Ajouter les 5 variables ci-dessus (une par une)
3. Render Dashboard → **evaltravaux** → **Environment** → **Add Environment Variable**
4. Ajouter les 2 variables ci-dessus
