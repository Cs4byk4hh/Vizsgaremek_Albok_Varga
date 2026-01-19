const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../config/jwt');
const {felhasznalok} = require('../models');
const {tokenBlackList} = require('../middlewares/auth.middleware');

const register = async (req, res) => {
    const { name, email, username, password } = req.body;
    if (!name || !email || !username || !password) {
        return res.status(401).json({ message: 'Hiányzó adat!' });
    }

    if (password.length < 8) {
        return res.status(400).json({message: 'A jelszónak legalább 8 karakter hosszúnak kell lennie!'})
    }

    const letezousername = await felhasznalok.findOne({where: {username}});
    if (letezousername) {
        return res.status(400).json({message: 'Ezzel a felhasználónévvel már regisztrált felhasználó!'});
    }

    const letezofelhasznalo = await felhasznalok.findOne({where: { email } });
    if (letezofelhasznalo) {
        return res.status(400).json({message: 'Létező felhasználó!'});
    }

    try {
        const hashedpassword = await bcrypt.hash(password, 10);
        const newUser = await felhasznalok.create({name, email, username, password: hashedpassword});
        return res.status(201).json({message: 'Sikeres regisztráció!'})
    } catch(error) {
        console.log('Hiba a regisztráció során:', error);
        return res.status(500).json({message: 'Hiba történt a regisztráció során!'})
    }
};

const login = async (req, res) => {
    try {
        const {email, username, password} = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({message: 'Hiányzó adat!'});
        }

        const letezofelhasznalo = await felhasznalok.findOne({where: {email}});
        if (!letezofelhasznalo) {
            return res.status(404).json({message: 'Nem létezik ilyen felhasználó!'});
        }

        const validjelszo = await bcrypt.compare(password, letezofelhasznalo.password);
        if (!validjelszo) {
            return res.status(401).json({message: 'Hibás jelszó!'});
        }

        const felhasznalo = { id: letezofelhasznalo.id, email: letezofelhasznalo.email, username: letezofelhasznalo.username, role: letezofelhasznalo.role};

        const token = jwt.sign(felhasznalo, SECRET_KEY, {expiresIn: '1h'});
        res.json({token, userId: letezofelhasznalo.id, email: letezofelhasznalo.email, role: letezofelhasznalo.role});
    } catch (error) {
        console.error('Hiba a bejelentkezés során:', error);
        res.status(500).json({message: 'Hiba történt a bejelentkezés során!'});
    }
};


const logout = (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (token) {
        tokenBlackList.add(token);
        return res.json({message: 'Sikeres kijelentkezés!'})
    }

    return res.status(400).json({message: 'Nincs bejelentkezve!'});
};

module.exports = {
    register,
    login,
    logout
}