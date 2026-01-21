const { velemenyek } = require('../models');


const createVelemeny = async (req, res) => {
    const {opinion} = req.body;

    if (!opinion) {
        return res.status(400).json({message: 'A vélemény megadása közben hiba történt!'});
    }

    try {
        const newopinion = await velemenyek.create({ opinion, user_id: req.user.id, username: req.user.username });
        res.status(201).json({message: 'Sikeres vélemény fogadás!', opinion: newopinion})
    } catch(error) {
        console.log('Hiba a vélemény mentésekor!', error);
        
        res.status(500).json({message: 'Hiba tötrént a vélemények mentésekor!'})
    }
};


const deleteVelemeny = async (req, res) => {
     const { id } = req.params;
    const userId = req.user.id;

    try {
        const opinion = await velemenyek.findByPk(id);

        if (!opinion) {
            return res.status(404).json({ message: 'A vélemény nem található!' });
        }

        if (opinion.user_id !== userId) {
            return res.status(403).json({ message: 'Nincs jogosultság a vélemény törlésére!' });
        }

        await opinion.destroy();
        res.status(200).json({ message: 'Vélemény sikeresen törölve!' });

    } catch (error) {
        console.error('Hiba a vélemény törlésekor!', error);
        res.status(500).json({ message: 'Hiba történt a vélemény törlése során!' });
    }
};

const updateVelemeny = async (req, res) => {
    const { id } = req.params;
    const { opinion } = req.body;
    const userId = req.user.id;

    if (!opinion) {
        return res.status(400).json({ message: 'A vélemény nem lehet üres!' });
    }

    try {
        const existingOpinion = await velemenyek.findByPk(id);

        if (!existingOpinion) {
            return res.status(404).json({ message: 'A vélemény nem található!' });
        }

        if (existingOpinion.user_id !== userId) {
            return res.status(403).json({ message: 'Nincs jogosultság a vélemény frissítésére!' });
        }

        existingOpinion.opinion = opinion;
        await existingOpinion.save();

        res.status(200).json({ message: 'A vélemény sikeresen frissítve!' });

    } catch (error) {
        console.error('Hiba a vélemény frissítése közben!', error);
        res.status(500).json({ message: 'Hiba történt a vélemény frissítése közben!' });
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
