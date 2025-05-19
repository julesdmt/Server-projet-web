const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Import des routes
const logementRoutes = require('./routes/logements');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connexion à MongoDB Atlas
const MONGODB_URI = 'mongodb+srv://julesdemont11:HeLBGukZAGQqMWKC@projettw.ithdu0i.mongodb.net/locationDB?retryWrites=true&w=majority';

console.log('Tentative de connexion à MongoDB...');

// Configuration de la connexion
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Augmenté à 30 secondes
    socketTimeoutMS: 45000,
    connectTimeoutMS: 30000, // Augmenté à 30 secondes
    family: 4, // Force IPv4
    maxPoolSize: 10, // Limite le nombre de connexions simultanées
    serverSelectionTimeoutMS: 30000, // Délai d'attente pour la sélection du serveur
    heartbeatFrequencyMS: 10000, // Fréquence des messages de pulsation
};

// Désactive le buffering des commandes
mongoose.set('bufferCommands', false);

// Gestion des événements de connexion
mongoose.connection.on('connecting', () => {
    console.log('MongoDB: Tentative de connexion...');
});

mongoose.connection.on('connected', () => {
    console.log('✅ MongoDB: Connecté avec succès');
    console.log(`Base de données: ${mongoose.connection.name}`);
    console.log(`Hôte: ${mongoose.connection.host}`);
});

mongoose.connection.on('error', (err) => {
    console.error('❌ Erreur de connexion MongoDB:', err.message);
    if (err.name === 'MongoNetworkError') {
        console.error('Erreur réseau - Vérifiez votre connexion Internet');
    }
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB: Déconnecté');
});

// Routes
app.use('/api/logements', logementRoutes);

// Route principale - Redirige vers index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Gestion des erreurs globale
app.use((err, req, res, next) => {
    console.error('Erreur non gérée:', err);
    res.status(500).json({ error: 'Une erreur est survenue', details: err.message });
});

// Connexion à MongoDB et démarrage du serveur
async function startServer() {
    try {
        console.log('Connexion à MongoDB Atlas...');
        await mongoose.connect(MONGODB_URI, mongooseOptions);
        
        // Démarrer le serveur uniquement après la connexion à MongoDB
        app.listen(PORT, () => {
            console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
            console.log(`📡 API disponible sur http://localhost:${PORT}/api/logements`);
        });
    } catch (error) {
        console.error('❌ Impossible de démarrer le serveur:', error);
        process.exit(1);
    }
}

// Démarrer l'application
startServer();
