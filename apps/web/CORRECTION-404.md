# Correction des erreurs 404 (layout.css, main-app.js)

## Cause

Les 404 sur `/_next/static/...` indiquent que le serveur Next.js ne sert pas correctement les fichiers. Causes possibles :

1. **Mauvais port** : le serveur tourne sur 3004 mais vous ouvrez localhost:3000
2. **Plusieurs instances** : des serveurs Node tournent sur 3000–3004
3. **Cache corrompu** : le dossier `.next` est incohérent

## Procédure de correction

### 1. Arrêter tous les processus Node

Dans PowerShell :
```powershell
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
```

### 2. Supprimer le cache Next.js

```powershell
cd c:\Users\pc\EvalTravaux\apps\web
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
```

### 3. Relancer le serveur

```powershell
cd c:\Users\pc\EvalTravaux
npm run dev:web
```

### 4. Utiliser l’URL indiquée dans le terminal

Après le démarrage, le terminal affiche par exemple :
```
▲ Next.js 14.1.0
- Local: http://localhost:3000
```

Ouvrez exactement cette URL (souvent 3000, parfois 3001 si 3000 est occupé).

### 5. Erreurs d’extensions navigateur

Les messages suivants viennent d’extensions (bloqueurs de pub, gestionnaires de mots de passe, etc.) :
- "A listener indicated an asynchronous response..."
- "content.js: Cannot read properties of undefined"

Ils ne concernent pas votre site. Vous pouvez les ignorer ou tester en navigation privée sans extensions.
