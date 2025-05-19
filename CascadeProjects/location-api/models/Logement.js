const mongoose = require('mongoose');

// Définition du schéma de localisation
const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
        default: 'Point'
    },
    coordinates: {
        type: [Number], // [longitude, latitude]
        required: true
    }
});

const logementSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    adresse: {
        rue: String,
        codePostal: String,
        ville: String,
        pays: String
    },
    prix: {
        type: Number,
        required: true
    },
    surface: Number,
    nombrePieces: Number,
    type: {
        type: String,
        enum: ['appartement', 'maison', 'studio', 'loft', 'duplex', 'chambre', 'autre'],
        required: true
    },
    equipements: [String],
    images: [String],
    disponibilite: {
        type: Boolean,
        default: true
    },
    dateCreation: {
        type: Date,
        default: Date.now
    },
    localisation: {
        type: pointSchema,
        index: '2dsphere', // Création d'un index géospatial
        required: true
    }
});

// Création de l'index géospatial
logementSchema.index({ localisation: '2dsphere' });

module.exports = mongoose.model('Logement', logementSchema);
