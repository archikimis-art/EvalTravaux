# Publier le site sur www.evaltravaux.fr

## Modifications effectuées

- **Logo** : taille ajustée (72px header, 64px footer) pour afficher la page entière
- **CORS** : ajout de `https://www.evaltravaux.fr` pour le domaine www

---

## Étapes pour publier

### 1. Commiter et pousser sur GitHub

```powershell
cd c:\Users\pc\EvalTravaux
git add .
git status
git commit -m "Refonte UI, logo, préparation déploiement"
git push origin main
```

### 2. Déployer sur Render

**Si le site est déjà configuré sur Render :**

1. Allez sur [dashboard.render.com](https://dashboard.render.com)
2. Ouvrez le service **evaltravaux** (frontend)
3. Cliquez sur **Manual Deploy** → **Deploy latest commit**
4. Attendez la fin du build (2–5 min)

**Si le site n’est pas encore sur Render :**

1. [dashboard.render.com](https://dashboard.render.com) → **New +** → **Blueprint**
2. Connectez le dépôt GitHub **EvalTravaux**
3. Render détecte `render.yaml` et crée les services
4. Renseignez `DATABASE_URL` et `STRIPE_SECRET_KEY` si demandé

### 3. Configurer le domaine www.evaltravaux.fr

1. Dans le service **evaltravaux** : **Settings** → **Custom Domains**
2. Ajoutez **www.evaltravaux.fr**
3. Chez votre registrar DNS (domaines.fr, OVH, etc.) :
   - Créez un enregistrement **CNAME** : `www` → `evaltravaux.onrender.com`
   - Ou utilisez l’adresse indiquée par Render

### 4. Vérifier

- Ouvrez **https://www.evaltravaux.fr** ou **https://evaltravaux.fr**
- Vérifiez que la page s’affiche correctement
- Testez le défilement pour voir toute la page

---

## Note

Le build peut échouer en local (erreur EPERM sur `.next`). Sur Render (Linux), le build se fait dans un environnement propre et ne rencontre pas ce problème.
