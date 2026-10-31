# Guide pour les modifications du widget

## Limites fonctionnelles

Le stockage `localStorage` est une commodité d'affichage : il peut être effacé ou modifié par le visiteur. Il ne faut pas l'utiliser pour autoriser une ressource, une commande ou une page sensible.

## Règles de sécurité

- Créer le contenu de la fenêtre avec les API DOM et `textContent`.
- Ne pas ajouter de configuration administrateur dans le HTML, les styles ou le JavaScript par substitution de chaîne.
- Générer la configuration au démarrage du conteneur avec un format sûr ; la configuration actuelle emploie des valeurs Base64 décodées côté navigateur.
- Éviter toute dépendance front-end non nécessaire.
- Conserver le conteneur non-root, en lecture seule et avec le minimum de capacités Linux.

## Règles d'accessibilité et d'expérience

- Conserver `role="dialog"`, `aria-modal="true"` et un titre associé.
- Garder les deux choix accessibles au clavier.
- Préserver l'affichage mobile et l'absence de débordement horizontal.
- Informer clairement l'utilisateur que l'action positive mémorise uniquement un choix local.

## Changements de configuration

Si une variable est ajoutée :

1. l'ajouter à `.env.example` ;
2. la documenter dans `README.md` ;
3. l'encoder dans `entrypoint.sh` ;
4. définir un repli sûr dans `age-verify.js` ;
5. ajouter ou mettre à jour un test.
