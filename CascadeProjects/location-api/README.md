# API de Gestion de Logements

Cette API permet de gérer une base de données de logements avec des opérations CRUD complètes.

## Prérequis

- Node.js (v14 ou supérieur)
- MongoDB (installé localement ou une instance distante)
- npm ou yarn

## Installation

1. Cloner le dépôt
2. Installer les dépendances :
   ```
   npm install
   ```
3. Démarrer le serveur :
   ```
   npm start
   ```

## Configuration

Par défaut, l'API se connecte à une base de données MongoDB locale sur `mongodb://localhost:27017/locationDB`. Vous pouvez modifier cette configuration dans le fichier `server.js`.

## Points de terminaison

- `GET /` - Page d'accueil de l'API
- `GET /api/logements` - Récupérer tous les logements
- `GET /api/logements/:id` - Récupérer un logement par son ID
- `POST /api/logements` - Créer un nouveau logement
- `PATCH /api/logements/:id` - Mettre à jour un logement
- `DELETE /api/logements/:id` - Supprimer un logement

## Exemple de requête POST

```json
{
  "titre": "Appartement moderne",
  "description": "Bel appartement lumineux en centre-ville",
  "adresse": {
    "rue": "123 rue de la Paix",
    "codePostal": "75000",
    "ville": "Paris",
    "pays": "France"
  },
  "prix": 1200,
  "surface": 75,
  "nombrePieces": 3,
  "type": "appartement",
  "equipements": ["wifi", "lave-vaisselle", "climatisation"],
  "images": ["image1.jpg", "image2.jpg"]
}
```

## Développement

Pour le développement avec rechargement automatique, installez nodemon :

```
npm install --save-dev nodemon
```

Puis lancez :

```
npm run dev
```
