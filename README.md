# 🛡️ Age Verification Widget for Odoo & Websites

Une application web ultra-légère, hébergée sur vos propres serveurs via **Docker**, conçue pour remplacer des services tiers payants ou limités (type Common Ninja) pour la vérification d'âge sur votre site e-commerce (Odoo, WordPress, etc.).

Totalement indépendante, sans aucune limite mensuelle de trafic !

---

## 📋 Fonctionnalités

* **Pop-up d'âge responsive** : Design élégant, adapté aux mobiles et ordinateurs.
* **Mémorisation du choix** : Utilisation du `localStorage` pour ne pas réafficher la pop-up aux visiteurs réguliers.
* **100% Personnalisable** : Gestion complète des couleurs, du texte et de la redirection via un simple fichier `.env`.
* **Prêt pour Docker** : Déploiement rapide, isolé et automatisé avec Nginx, Docker Compose et un script d'initialisation.

---

## ⚙️ Configuration (.env)

Créez un fichier `.env` à la racine de votre projet pour personnaliser l'apparence et le comportement :

```env
# URL de redirection si l'utilisateur clique sur "J'ai moins de 18 ans"
REDIRECT_URL=[https://www.google.com](https://www.google.com)

# Couleurs de la pop-up (Codes Hexadécimaux)
MODAL_BG_COLOR=#FDF1D3
TEXT_COLOR=#111111
BTN_YES_BG=#1b4332
BTN_YES_COLOR=#ffffff
BTN_NO_BG=#FDF1D3
BTN_NO_COLOR=#111111


🚀 Installation & Déploiement

1. Clonez le dépôt sur votre serveur :
	git clone [https://github.com/votre-pseudo/age-verification-widget.git](https://github.com/votre-pseudo/age-verification-widget.git)
	cd age-verification-widget
2. Créez et configurez votre fichier .env (voir la section ci-dessus).
3. Lancez l'application avec Docker Compose :
	docker compose build --no-cache
	docker compose up -d


🔌 Intégration dans Odoo
Pour afficher la pop-up sur votre site Odoo, ajoutez cette unique ligne de script :
	<script src="https://votre-domaine-ou-ip:8080/age-verify.js" defer=""></script>


## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier LICENSE pour plus de détails.
