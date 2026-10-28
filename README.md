# 🛡️ Age Verification Widget for Odoo & Websites

Une application web ultra-légère, hébergée sur vos propres serveurs via **Docker**, conçue pour remplacer des services tiers payants ou limités pour la vérification d'âge sur votre site e-commerce (Odoo, WordPress, etc.).

Totalement indépendante, sans aucune limite mensuelle de trafic !

---

## 📋 Fonctionnalités

* **Pop-up d'âge responsive** : Design élégant, adapté aux mobiles et ordinateurs.
* **Mémorisation du choix** : Utilisation du `localStorage` pour ne pas réafficher la pop-up aux visiteurs réguliers.
* **100% Personnalisable** : Gestion complète de l'âge minimal, des textes, des couleurs et de la redirection via un simple fichier `.env`.
* **Prêt pour Docker** : Déploiement rapide, isolé et automatisé avec Nginx, Docker Compose et un script d'initialisation.

---

## ⚙️ Configuration (.env)

Copiez d'abord le fichier d'exemple, puis éditez votre `.env` :

```sh
cp .env.example .env
```

L'âge minimal et les textes se modifient ici. La valeur `__AGE_LIMIT__` est automatiquement remplacée par l'âge choisi :

```env
# Âge minimal et textes affichés
AGE_LIMIT=18
TITLE_TEXT=AVEZ-VOUS PLUS DE __AGE_LIMIT__ ANS ?
DESCRIPTION_TEXT=En entrant sur ce site, vous confirmez avoir l'âge requis.
YES_BUTTON_TEXT=J'ai plus de __AGE_LIMIT__ ans
NO_BUTTON_TEXT=J'ai moins de __AGE_LIMIT__ ans

# URL de redirection si l'utilisateur clique sur le bouton « non »
REDIRECT_URL=https://www.google.com

# Couleurs de la pop-up (Codes Hexadécimaux)
MODAL_BG_COLOR=#FDF1D3
TEXT_COLOR=#111111
BTN_YES_BG=#1b4332
BTN_YES_COLOR=#ffffff
BTN_NO_BG=#FDF1D3
BTN_NO_COLOR=#111111
```

## 🚀 Installation & Déploiement

1. Clonez le dépôt sur votre serveur :
   ```sh
   git clone https://github.com/Thana-Teros/Age-verify.git
   cd Age-verify
   ```
2. Créez et configurez votre fichier `.env` (voir la section ci-dessus).
3. Lancez l'application avec Docker Compose :
   ```sh
   docker compose build --no-cache
   docker compose up -d
   ```

## 🔌 Intégration dans Odoo

Pour afficher la pop-up sur votre site Odoo, ajoutez cette unique ligne de script :

- Avec un domaine : `<script src="https://votre-domaine/age-verify.js" defer></script>`
- Avec une IP : `<script src="https://votre-ip:8080/age-verify.js" defer></script>`

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier LICENSE pour plus de détails.
