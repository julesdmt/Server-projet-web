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
const MONGODB_URI = 'mongodb+srv://julesdemont11:HeLBGukZAGQqMWKC@projettw.ithdu0i.mongodb.net/locationDB?retryWrites=true&w=majority&appName=ProjetTw';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connecté à MongoDB Atlas'))
.catch(err => console.error('Erreur de connexion à MongoDB Atlas:', err));

// Routes
app.use('/api/logements', logementRoutes);

// Route principale - Redirige vers index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
