const {felhasznalok, velemenyek, kosar, kosar_tartalom} = require('../models');

const deleteUser = async (req, res) => {
      try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Nincs jogosultság!' });
        }

        const userId = parseInt(req.params.id, 10);
        const userToDelete = await felhasznalok.findByPk(userId);

        if (!userToDelete) {
            return res.status(404).json({ message: 'Felhasználó nem található!' });
        }
        
        await velemenyek.destroy({ where: { user_id: userId } });

        const userCart = await kosar.findOne({ where: { user_id: userId } });
        if (userCart) {
            await kosar_tartalom.destroy({ where: { kosar_id: userCart.id } });
            await userCart.destroy();
        }

        await felhasznalok.destroy({ where: { id: userId } });

        res.status(200).json({ message: `Felhasználó (ID: ${userId}) sikeresen törölve!` });
    } catch (error) {
        console.error('Hiba az admin felhasználó törlésekor:', error);
        res.status(500).json({ message: 'Hiba történt a felhasználó törlése során!' });
    }
};

const getUser = async (req, res) => {
     if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Csak adminok férhetnek hozzá!' });
    }
    try {
        const users = await felhasznalok.findAll({ 
            attributes: ['id', 'name', 'email', 'username', 'role'] 
        });
        return res.status(200).json(users);
    } catch (error) {
        console.error('Hiba a felhasználók lekérésekor:', error);
        return res.status(500).json({ message: 'Szerveroldali hiba történt az adatok lekérésekor.' });
    }
};

module.exports = {
    deleteUser,
    getUser
};