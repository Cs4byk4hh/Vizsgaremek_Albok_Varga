const express = require('express');
const {DataTypes, Sequelize, Date} = require('sequelize');
const cors = require('cors');
const bcrypt = require('bcrypt'); 
const app = express();
const PORT = 3000;

app.use(cors({
    origin: 'http://localhost:4200'
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const sequelize = new Sequelize('maisonperfumes', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: false
});


const Felhasznalok = sequelize.define('felhasznalok', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = sequelize;

sequelize.sync()
    .then(() => {(
        console.log('Adatbázis szinkornizálva!'));
    })
    .catch(() => {(
        console.log('Hiba történt az adatbázis szinkronizálása közben!')
    )});


app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    const letezofelhasznalo = await Felhasznalok.findOne({where: { email }});

    if (letezofelhasznalo) {
        return res.status(400).json({message: 'Létező felhasználó!'})
    }

    try {
        const tiltottjelszo = await bcrypt.hash(password, 10);
        const newUser  = await Felhasznalok.create({ name, email, password: tiltottjelszo });
        res.status(201).json({ message: 'Regisztráció sikeres', user: newUser  });
    } catch (error) {
        console.error('Hiba a regisztráció során:', error);
        res.status(500).json({ message: 'Hiba történt a regisztráció során' });
    }
});


app.post('/login' ,async (req, res) => {
    const {email, password} = req.body;

    const letezofelhasznalo = await Felhasznalok.findOne({where: { email }});

    if (!letezofelhasznalo) {
        return res.status(404).json({message: 'hiba a bejelentkezés során: Nem található a felhasználó!'});
    } 
    const jelszo = bcrypt.hashed(password, 10);
    const validjelszo = bcrypt.compare(jelszo, letezofelhasznalo.password)

    if (!validjelszo) {
        return res.status(401).json({message: 'Hiba a bejelentjezés során: Hibás jelszó!'});
    }

    return res.status(200).json({message: 'Sikeres bejelentkezés!'});

});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); 
});