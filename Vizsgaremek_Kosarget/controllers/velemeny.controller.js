const { velemenyek } = require('../models');

const createVelemeny = async (req, res) => {
    const { opinion, userName } = req.body;

    if (!opinion || !userName) {
        return res.status(400).json({ message: 'Hiba történt a vélemény megadása közben!' });
    }

    try {
        const newOpinion = await velemenyek.create({ opinion, userName });
        res.status(201).json({ message: 'Sikeres vélemény fogadás!', opinion: newOpinion });
    } catch (error) {
        console.log('Hiba a vélemény mentésekor!', error);
        res.status(500).json({ message: 'Hiba történt a vélemények mentésekor!' });
    }
};

const deleteVelemeny = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await velemenyek.destroy({ where: { id } });

        if (!deleted) {
            return res.status(404).json({ message: 'A vélemény nem található!' });
        }
        res.status(200).json({ message: 'Vélemény sikeresen törölve!' });
    } catch (error) {
        console.log('Hiba a vélemény törlésekor!', error);
        return res.status(500).json({ message: 'Hiba történt a vélemény törlése során!' });
    }
};

const updateVelemeny = async (req, res) => {
    const { id } = req.params;
    const { opinion } = req.body;

    if (!opinion) {
        return res.status(400).json({ message: 'A vélemény nem lehet üres!' });
    }

    try {
        const [updated] = await velemenyek.update({ opinion }, { where: { id } });

        if (!updated) {
            return res.status(404).json({ message: 'A vélemény nem található!' });
        }

        res.status(200).json({ message: 'A vélemény sikeresen frissítve!' });
    } catch (error) {
        console.log('Hiba a vélemény frissítése közben!', error);
        return res.status(500).json({ message: 'Hiba a vélemény frissítése közben!' });
    }
};

const allvelemenyek = async (req, res) => {
    try {
        const getallvelemenyek = await velemenyek.findAll();
        res.json(getallvelemenyek);
    } catch (error) {
        console.log('Hiba a vélemények lekérdezése közben!', error);
        return res.status(500).json({message: 'Hiba történt a vélemények lekérdezése közben!'});
    }
};

module.exports = {
    createVelemeny,
    deleteVelemeny,
    updateVelemeny,
    allvelemenyek
};
