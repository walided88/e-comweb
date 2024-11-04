const express = require('express');
const router = express.Router();

// Exemple de route pour obtenir une liste de tâches
router.get('/', (req, res) => {
    res.json({ message: 'Liste des tâches' });
});

// Export du routeur pour l'utiliser dans d'autres fichiers
module.exports = router;
