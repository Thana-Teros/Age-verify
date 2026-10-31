# 🛡️ Age Verification Information Widget

Un widget statique et personnalisable à intégrer dans Odoo, WordPress ou tout autre site web.
Il affiche une **barrière d'information** demandant au visiteur de confirmer son âge, puis mémorise ce choix dans le stockage local du navigateur.

> Ce projet n'est pas une vérification d'âge fiable ni un contrôle d'accès. Toute logique exécutée uniquement dans un navigateur peut être contournée. Les contenus ou opérations réellement sensibles doivent être protégés côté serveur par un mécanisme adapté à votre contexte juridique.

## Fonctionnement

- Le conteneur Nginx sert un unique script JavaScript.
- Au démarrage, l'entrypoint encode les variables du fichier `.env` sans les interpoler dans du HTML ou du JavaScript.
- Le script crée la fenêtre avec des nœuds DOM et `textContent`, ce qui empêche les textes configurés d'être interprétés comme du HTML.
- L'acquittement est mémorisé dans `localStorage` sous la clé `age_verify_information_acknowledged_v1`.

Il n'y a ni cookie, ni session, ni stockage côté serveur.

## Configuration

Copiez l'exemple, puis conservez votre fichier réel hors de Git :

```sh
cp .env.example .env
```

Variables prises en charge :

```env
AGE_LIMIT=18
TITLE_TEXT=AVEZ-VOUS PLUS DE __AGE_LIMIT__ ANS ?
DESCRIPTION_TEXT=En entrant sur ce site, vous confirmez avoir l'âge requis.
YES_BUTTON_TEXT=J'ai plus de __AGE_LIMIT__ ans
NO_BUTTON_TEXT=J'ai moins de __AGE_LIMIT__ ans
REDIRECT_URL=https://www.example.com/
MODAL_BG_COLOR=#FDF1D3
TEXT_COLOR=#111111
BTN_YES_BG=#1b4332
BTN_YES_COLOR=#ffffff
BTN_NO_BG=#FDF1D3
BTN_NO_COLOR=#111111
```

`AGE_LIMIT` doit être un entier entre 1 et 120. `REDIRECT_URL` doit commencer par `https://` ou `http://`; autrement la valeur sûre par défaut est utilisée. Le marqueur `__AGE_LIMIT__` est remplacé dans les textes affichés.

## Déploiement

```sh
docker compose build --pull
docker compose up -d
docker compose ps
```

Par défaut, Compose publie le service uniquement sur `127.0.0.1:8080`. Placez-le derrière un reverse proxy HTTPS, ou adaptez explicitement le mappage de port si une exposition réseau directe est réellement nécessaire.

Le conteneur s'exécute sans privilège root, avec système de fichiers en lecture seule, capacités Linux retirées et vérification d'état. L'image de base Nginx est versionnée et Dependabot surveille ses mises à jour.

## Intégration

Ajoutez le script à votre site :

```html
<script src="https://votre-domaine/age-verify.js" defer></script>
```

Le serveur du widget doit être accessible depuis le navigateur du visiteur. Servez-le en HTTPS lorsque le site hôte est en HTTPS.

## Qualité et maintenance

Le workflow GitHub Actions vérifie la syntaxe JavaScript et shell, exécute les tests de sécurité statiques et construit l'image Docker à chaque pull request et mise à jour de `main`.

Pour une modification locale :

```sh
node --check age-verify.js
sh -n entrypoint.sh
node --test tests/*.test.mjs
```

## Licence

Ce projet est sous licence [MIT](LICENSE).
