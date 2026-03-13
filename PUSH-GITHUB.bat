@echo off
REM Script pour pousser EvalTravaux sur GitHub
REM 1. Remplacez YOUR_USERNAME par votre nom d'utilisateur GitHub
REM 2. Créez le dépôt EvalTravaux sur https://github.com/new si nécessaire
REM 3. Exécutez ce script

set /p USERNAME="Entrez votre nom d'utilisateur GitHub: "
git remote set-url origin https://github.com/%USERNAME%/EvalTravaux.git
git push -u origin main
pause
