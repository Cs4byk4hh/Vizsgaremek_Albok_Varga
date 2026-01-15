const {kosar_tartalom, kosar, perfumes} = require('../models');


const addtoCart = async (req, res) => {
     try {
        const userId = req.user.id;
        const { perfumeId } = req.body;

        if (!userId || !perfumeId) {
            return res.status(400).json({ message: 'Hiányzó userId vagy perfumeId' });
        }
        let userCart = await kosar.findOne({ where: { user_id: userId } });

        if (!userCart) {
            userCart = await kosar.create({ user_id: userId });
        }

        let cartItem = await kosar_tartalom.findOne({
            where: {
                kosar_id: userCart.id,
                parfum_id: perfumeId
            }
        });
        if (cartItem) {
            cartItem.mennyiseg += 1;
            await cartItem.save();
        } else {
            const perfume = await perfumes.findByPk(perfumeId);
            if (!perfume) {
                return res.status(404).json({ message: 'Parfüm nem található' });
            }
            await kosar_tartalom.create({
                kosar_id: userCart.id,
                parfum_id: perfumeId,
                mennyiseg: 1,
                ar: perfume.price
            });
        }
        return res.status(200).json({ message: 'Parfüm sikeresen hozzáadva a kosárhoz!' });
    } catch (error) {
        console.error('Hiba a kosár mentésekor:', error);
        return res.status(500).json({ message: 'Hiba a kosár mentésekor' });
    }
};

const getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const userCart = await kosar.findOne({ where: {user_id: userId}});
        if (!userCart) {
            return res.json([]); 
        } 

        const adatok = await kosar_tartalom.findAll({
            where: { kosar_id: userCart.id },
            include: [{model: parfumok, attributes: ['name', 'brand', 'price']}]
        });
        res.json(adatok);
    } catch (error) {
        console.error('Hiba a kosár lekérésekor:', error);
        res.status(500).json({ message: 'Hiba a kosár lekérésekor'});
    }
};

module.exports = {
    addtoCart,
    getCart
};