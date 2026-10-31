# Instructions du projet

## Objectif

Ce dépôt fournit une barrière d'information d'âge côté navigateur. Il ne constitue pas une vérification d'âge fiable ni un contrôle d'accès à des contenus sensibles.

## Principes de maintenance

- Ne jamais présenter le widget comme une solution de conformité légale ou de protection serveur.
- Préserver la compatibilité d'intégration : le script doit rester disponible à l'URL `/age-verify.js`.
- Ne pas versionner de fichier `.env`, secret, jeton, certificat, nom de domaine privé ou adresse d'infrastructure.
- Garder les variables documentées dans `.env.example`, `README.md` et `entrypoint.sh` synchronisées.
- Toute donnée configurable affichée dans le navigateur doit être traitée comme du texte et ne doit jamais être injectée avec `innerHTML` ou par interpolation JavaScript non échappée.
- Toute URL de redirection doit être limitée à `https://` ou `http://`.

## Validation avant intégration

```sh
node --check age-verify.js
sh -n entrypoint.sh
node --test tests/*.test.mjs
docker compose config
docker compose build
```

Les changements doivent également passer le workflow GitHub Actions.

## Déploiement

Le service Compose écoute par défaut uniquement sur `127.0.0.1:8080`. L'exposition publique doit être réalisée par un reverse proxy HTTPS explicitement configuré. Aucun déploiement de production ne doit être déclenché depuis ce dépôt sans validation humaine.
