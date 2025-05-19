const { faker } = require('@faker-js/faker/locale/fr');
const mongoose = require('mongoose');
const Logement = require('../models/Logement');

// Connexion à MongoDB Atlas
const MONGODB_URI = 'mongodb+srv://julesdemont11:HeLBGukZAGQqMWKC@projettw.ithdu0i.mongodb.net/locationDB?retryWrites=true&w=majority&appName=ProjetTw';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Types de logements disponibles
const typesLogement = ['appartement', 'maison', 'studio', 'loft', 'duplex', 'chambre'];

// Villes françaises avec leurs coordonnées approximatives [longitude, latitude]
const villesCoords = {
    'Paris': [2.3522, 48.8566],
    'Marseille': [5.3698, 43.2965],
    'Lyon': [4.8357, 45.7640],
    'Toulouse': [1.4442, 43.6047],
    'Nice': [7.2614, 43.7102],
    'Nantes': [-1.5536, 47.2184],
    'Strasbourg': [7.7521, 48.5734],
    'Montpellier': [3.8767, 43.6108],
    'Bordeaux': [-0.5792, 44.8378],
    'Lille': [3.0573, 50.6292],
    'Rennes': [-1.6778, 48.1173],
    'Reims': [4.0319, 49.2583],
    'Le Havre': [0.1079, 49.4944],
    'Saint-Étienne': [4.3872, 45.4397],
    'Toulon': [5.9280, 43.1242],
    'Grenoble': [5.7245, 45.1885],
    'Dijon': [5.0415, 47.3220],
    'Angers': [-0.5632, 47.4784],
    'Nîmes': [4.3601, 43.8367],
    'Villeurbanne': [4.8800, 45.7719],
    'Clermont-Ferrand': [3.0865, 45.7772],
    'Le Mans': [0.1996, 48.0061],
    'Aix-en-Provence': [5.4474, 43.5297]
};

const villes = Object.keys(villesCoords);

// Équipements possibles
const equipements = [
    'wifi', 'lave-vaisselle', 'lave-linge', 'télévision', 'climatisation', 'chauffage',
    'ascenseur', 'parking', 'piscine', 'jardin', 'terrasse', 'balcon', 'sèche-linge',
    'fer à repasser', 'micro-ondes', 'four', 'congélateur', 'cafetière', 'bouilloire'
];

// Images par type de logement (images libres de droits d'Unsplash)
const imagesParType = {
    appartement: [
        'https://images.unsplash.com/photo-1600585154340-63cb45d8ee3b?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600210491367-e8e4e87a808f?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600585154340-63cb45d8ee3b?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600210491367-e8e4e87a808f?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600607687939-ce8a944c2b23?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600607687644-c0b7f8d4f9d7?w=800&auto=format&fit=crop'
    ],
    maison: [
        'https://images.unsplash.com/photo-1600585154340-63cb45d8ee3b?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600607687939-ce8a944c2b23?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600607687939-ce8a944c2b23?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&auto=format&fit=crop'
    ],
    studio: [
        'https://images.unsplash.com/photo-1502672260266-37a1c9e93a0b?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600607687939-ce8a944c2b23?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&auto=format&fit=crop'
    ],
    loft: [
        'https://images.unsplash.com/photo-1503174971373-b1f69850b92e?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1484154216780-71f8a57cee88?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600585154340-b6167b1f1cf6?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600607687939-ce8a944c2b23?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600607687644-c0b7f8d4f9d7?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600607687939-ce8a944c2b23?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&auto=format&fit=crop'
    ],
    duplex: [
        'https://images.unsplash.com/photo-1600607687939-ce8a944c2b23?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600607687939-ce8a944c2b23?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600607687939-ce8a944c2b23?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&auto=format&fit=crop'
    ],
    chambre: [
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1484154216780-71f8a57cee88?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600607687939-ce8a944c2b23?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600607687939-ce8a944c2b23?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&auto=format&fit=crop'
    ]
};

// Définition des fourchettes par type de logement
const caracteristiquesParType = {
    studio: { minSurface: 15, maxSurface: 40, minPieces: 1, maxPieces: 1, prixM2Min: 12, prixM2Max: 25 },
    chambre: { minSurface: 8, maxSurface: 20, minPieces: 1, maxPieces: 1, prixM2Min: 10, prixM2Max: 20 },
    appartement: { minSurface: 25, maxSurface: 120, minPieces: 1, maxPieces: 5, prixM2Min: 10, prixM2Max: 20 },
    maison: { minSurface: 50, maxSurface: 200, minPieces: 2, maxPieces: 10, prixM2Min: 8, prixM2Max: 18 },
    loft: { minSurface: 40, maxSurface: 150, minPieces: 1, maxPieces: 3, prixM2Min: 15, prixM2Max: 30 },
    duplex: { minSurface: 50, maxSurface: 180, minPieces: 2, maxPieces: 6, prixM2Min: 12, prixM2Max: 25 }
};

// Prix au m² par ville (multiplicateur par rapport à la moyenne)
const prixParVille = {
    'Paris': 1.5,
    'Lyon': 1.1,
    'Bordeaux': 1.0,
    'Marseille': 0.9,
    'Toulouse': 0.85,
    'Nice': 1.2,
    'Nantes': 0.9,
    'Strasbourg': 0.8,
    'Montpellier': 0.85,
    'Lille': 0.8,
    'Rennes': 0.85,
    'Reims': 0.75,
    'Le Havre': 0.7,
    'Saint-Étienne': 0.7,
    'Toulon': 0.8,
    'Grenoble': 0.85,
    'Dijon': 0.8,
    'Angers': 0.8,
    'Nîmes': 0.75,
    'Villeurbanne': 1.0,
    'Clermont-Ferrand': 0.75,
    'Le Mans': 0.75,
    'Aix-en-Provence': 0.9
};

// Générer un logement factice avec des caractéristiques cohérentes
function genererLogement() {
    const type = faker.helpers.arrayElement(typesLogement);
    const ville = faker.helpers.arrayElement(villes);
    const codePostal = faker.location.zipCode('#####');
    
    // Générer entre 3 et 10 équipements aléatoires
    const nbEquipements = faker.number.int({ min: 3, max: 10 });
    const listeEquipements = faker.helpers.arrayElements(equipements, nbEquipements);
    
    // Utiliser une seule image pertinente selon le type de logement
    const images = [];
    const imagesDisponibles = imagesParType[type] || imagesParType.appartement;
    
    // Sélectionner une image aléatoire parmi celles disponibles pour ce type de logement
    const imageAleatoire = faker.helpers.arrayElement(imagesDisponibles);
    images.push(imageAleatoire);
    
    // Obtenir les coordonnées de base pour la ville
    const [baseLon, baseLat] = villesCoords[ville];
    
    // Ajouter une petite variation aléatoire pour que les points ne soient pas tous au même endroit
    const variation = 0.05; // Environ 5km de variation
    const longitude = baseLon + (Math.random() * variation * 2 - variation);
    const latitude = baseLat + (Math.random() * variation * 2 - variation);
    
    // Déterminer les caractéristiques en fonction du type de logement
    const caracteristiques = caracteristiquesParType[type] || caracteristiquesParType.appartement;
    
    // Générer une surface cohérente avec le type de logement
    const surface = faker.number.int({ 
        min: caracteristiques.minSurface, 
        max: caracteristiques.maxSurface 
    });
    
    // Calculer le nombre de pièces en fonction de la surface et du type de logement
    let nombrePieces;
    if (type === 'studio' || type === 'chambre') {
        nombrePieces = 1;
    } else {
        // Environ 15-25 m² par pièce en moyenne
        const piecesEstimees = Math.max(
            caracteristiques.minPieces,
            Math.min(
                caracteristiques.maxPieces,
                Math.round(surface / faker.number.int({ min: 15, max: 25 }))
            )
        );
        nombrePieces = piecesEstimees;
    }
    
    // Calculer le prix en fonction de la surface, du type et de la localisation
    const prixM2 = faker.number.float({
        min: caracteristiques.prixM2Min,
        max: caracteristiques.prixM2Max,
        precision: 0.1
    });
    
    // Appliquer le coefficient de la ville
    const coefficientVille = prixParVille[ville] || 1.0;
    const prixBase = Math.round(surface * prixM2 * coefficientVille);
    
    // Ajouter une variation aléatoire de +/- 15%
    const variationPrix = faker.number.float({ min: 0.85, max: 1.15, precision: 0.01 });
    const prix = Math.round(prixBase * variationPrix);
    
    // S'assurer que le prix est dans une fourchette raisonnable
    const prixFinal = Math.max(300, Math.min(5000, prix));
    
    return {
        titre: `${type.charAt(0).toUpperCase() + type.slice(1)} ${faker.commerce.productAdjective()} à ${ville}`,
        description: faker.lorem.paragraphs({ min: 2, max: 5 }),
        adresse: {
            rue: faker.location.streetAddress(),
            codePostal: codePostal,
            ville: ville,
            pays: 'France'
        },
        prix: prixFinal,
        surface: surface,
        nombrePieces: nombrePieces,
        type: type,
        equipements: listeEquipements,
        images: images,
        disponibilite: faker.datatype.boolean(0.8), // 80% de chance d'être disponible
        localisation: {
            type: 'Point',
            coordinates: [longitude, latitude]
        }
    };
}

// Supprimer tous les logements existants et en générer de nouveaux
async function peuplerBaseDonnees(nombreLogements = 100) {
    try {
        // Supprimer tous les logements existants
        await Logement.deleteMany({});
        console.log('Anciens logements supprimés');
        
        // Générer de nouveaux logements
        const logements = [];
        for (let i = 0; i < nombreLogements; i++) {
            logements.push(genererLogement());
            
            // Afficher la progression
            if ((i + 1) % 10 === 0) {
                console.log(`Génération des logements: ${i + 1}/${nombreLogements}`);
            }
        }
        
        // Insérer les logements dans la base de données
        await Logement.insertMany(logements);
        console.log(`${nombreLogements} logements ont été générés avec succès !`);
        
        // Se déconnecter de la base de données
        mongoose.connection.close();
    } catch (err) {
        console.error('Erreur lors du peuplement de la base de données:', err);
        process.exit(1);
    }
}

// Exécuter le script
const nombreLogements = process.argv[2] || 100; // Par défaut, générer 100 logements
peuplerBaseDonnees(parseInt(nombreLogements));
