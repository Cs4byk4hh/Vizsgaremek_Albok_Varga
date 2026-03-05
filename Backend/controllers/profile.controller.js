const {felhasznalok} = require('../models');

const getProfile = async (req, res) => {
    try {
        const userId = req.user.id; 

        const user = await felhasznalok.findByPk(userId, {
            attributes: { exclude: ['password', 'role'] }
        });

        if (!user) {
            return res.status(404).json({ message: 'Felhasználó nem található!' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Hiba a profil lekérésekor:', error);
        res.status(500).json({ message: 'Szerver hiba' });
    }
};

const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, email, username } = req.body;


        const user = await felhasznalok.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'Felhasználó nem található!' });
        }

        if (email) {
            const foglaltEmail = await felhasznalok.findOne({ where: { email } });
            if (foglaltEmail && foglaltEmail.id !== userId) {
                return res.status(400).json({ message: 'Ez az email cím már foglalt!' });
            }
            user.email = email;
        }

        if (username) {
            const foglaltUserName = await felhasznalok.findOne({ where: { username } });
            if (foglaltUserName && foglaltUserName.id !== userId) {
                return res.status(400).json({ message: 'Ez a felhasználónév már foglalt!' });
            }
            user.username = username;
        }

        if (name !== undefined) {
            user.name = name;
        }

        await user.save();

        const userResponse = user.toJSON();
        delete userResponse.password;

        res.status(200).json({ message: 'Profil sikeresen frissítve!', user: userResponse });
        
    } catch (error) {
        console.error('Hiba a profil mentésekor:', error);
        res.status(500).json({ message: 'Hiba történt a mentés során.' });
    }
};

module.exports = {
    getProfile,
    updateProfile
};