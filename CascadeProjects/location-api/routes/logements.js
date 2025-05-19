const express = require('express');
const router = express.Router();
const Logement = require('../models/Logement');

// Récupérer tous les logements
router.get('/', async (req, res) => {
    try {
        const logements = await Logement.find();
        res.json(logements);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Récupérer un logement par son ID
router.get('/:id', getLogement, (req, res) => {
    res.json(res.logement);
});

// Créer un nouveau logement
router.post('/', async (req, res) => {
    const logement = new Logement({
        titre: req.body.titre,
        description: req.body.description,
        adresse: req.body.adresse,
        prix: req.body.prix,
        surface: req.body.surface,
        nombrePieces: req.body.nombrePieces,
        type: req.body.type,
        equipements: req.body.equipements,
        images: req.body.images
    });

    try {
        const nouveauLogement = await logement.save();
        res.status(201).json(nouveauLogement);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Mettre à jour un logement
router.patch('/:id', getLogement, async (req, res) => {
    if (req.body.titre != null) {
        res.logement.titre = req.body.titre;
    }
    if (req.body.description != null) {
        res.logement.description = req.body.description;
    }
    // Ajoutez d'autres champs à mettre à jour selon vos besoins

    try {
        const logementMaj = await res.logement.save();
        res.json(logementMaj);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Supprimer un logement
router.delete('/:id', getLogement, async (req, res) => {
    try {
        await res.logement.remove();
        res.json({ message: 'Logement supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware pour récupérer un logement par ID
async function getLogement(req, res, next) {
    let logement;
    try {
        logement = await Logement.findById(req.params.id);
        if (logement == null) {
            return res.status(404).json({ message: 'Logement non trouvé' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.logement = logement;
    next();
}

module.exports = router;
