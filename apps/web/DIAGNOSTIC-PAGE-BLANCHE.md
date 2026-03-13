# Diagnostic page blanche – EvalTravaux

## Corrections appliquées

### 1. Tailwind
- Suppression de `var(--font-inter)` (variable non définie)
- Police : `system-ui` en fallback
- Safelist étendue pour les classes critiques

### 2. Layout
- Police Google Inter retirée (risque de blocage)
- Structure HTML simplifiée

### 3. Assets
- Création de `public/logo.svg` et `public/logo-dark.svg`
- Remplacement de `/logo.png` et `/logo-dark.png` par `.svg` dans tout le projet

### 4. Gestion des erreurs
- `app/error.tsx` : affichage des erreurs avec bouton « Réessayer »
- `app/loading.tsx` : affichage de « Chargement... »

### 5. Hydratation
- `suppressHydrationWarning` sur le footer (année dynamique)

## Pour tester

1. Arrêter tous les serveurs Next.js (ports 3000–3004)
2. Lancer : `npm run dev:web`
3. Ouvrir : http://localhost:3000

## Si la page reste blanche

1. Ouvrir les DevTools (F12) → onglet **Console**
2. Noter les erreurs JavaScript en rouge
3. Onglet **Réseau** : vérifier que les fichiers CSS et JS se chargent (statut 200)
4. Désactiver le JavaScript : si le HTML s’affiche, le problème vient de l’hydratation ou du JS

## Vérifier si vous êtes en local

- **localhost:3000** = version locale (vos modifications)
- **evaltravaux.fr** = version déployée sur Render (pas vos modifications)
