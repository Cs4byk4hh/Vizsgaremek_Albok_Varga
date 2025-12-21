const {perfumes} = require('../models');

const getperfumes = async (req, res) => {
    try {
        const lista = await perfumes.findAll();
        res.json(lista);
    } catch (error) {
        console.log("Hiba a parfümök lekérésekor:", error);
        res.status(500).json({ message: "Hiba történt a parfümök lekérése során!" });
    }
};

module.exports = {
    getperfumes
};