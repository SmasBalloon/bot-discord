# Bot Discord

Ce projet est un bot Discord développé en utilisant Discord.js. Il inclut plusieurs commandes de modération et de jeux.

## Installation

1. Clonez le dépôt :
    ```bash
    git clone https://github.com/votre-utilisateur/votre-repo.git
    cd votre-repo
    ```

2. Installez les dépendances :
    ```bash
    npm install
    ```

3. Créez un fichier `config.js` dans le répertoire racine avec le contenu suivant :
    ```javascript
    module.exports = {
        BOT_TOKEN: 'votre-token-de-bot',
        CLIENT_ID: 'votre-id-client',
        GUILD_ID: 'votre-id-guild'
    };
    ```

4. Déployez les commandes :
    ```bash
    node deploy-commands.js
    ```

## Utilisation

Démarrez le bot :
```bash
node index.js
```

## Commandes

### Modération

- `/warn`: Avertir un membre.
- `/ban`: Bannir un membre.
- `/deleterole`: Supprimer un rôle d'un membre.
- `/addrole`: Ajouter un rôle à un membre.
- `/bigclear`: Supprimer tous les messages d'un salon.

### Jeux

- `/devinnette`: Jouer aux devinettes.

## Contribuer

Les contributions sont les bienvenues ! Veuillez soumettre une pull request ou ouvrir une issue pour discuter des changements que vous souhaitez apporter.