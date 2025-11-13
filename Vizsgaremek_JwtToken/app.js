const express = require('express'); 
const { Sequelize, DataTypes } = require('sequelize'); 
const cors = require('cors');
const bcrypt = require('bcrypt');
const crypto = require('crypto'); 
const jwt = require('jsonwebtoken');  

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:4200'
}));

const SECRET_KEY = crypto.randomBytes(32).toString('hex');

const sequelize = new Sequelize('maisondb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: false
});

const felhasznalok = sequelize.define('felhasznalok', {
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

sequelize.sync()
    .then(() => {(
        console.log('Adatbázis szinkornizálva!'));
    })
    .catch(() => {(
        console.log('Hiba történt az adatbázis szinkronizálása közben!')
    )});


app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(401).json({ message: 'Hiányzó adat!' });
    }
    const letezofelhasznalo = await felhasznalok.findOne({ where: { email } });
    if (letezofelhasznalo) {
        return res.status(400).json({ message: 'Létező felhasználó!' });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await felhasznalok.create({ name, email, password: hashedPassword });
        return res.status(201).json({ message: 'Sikeres regisztráció!' });
    } catch (err) {
        console.log('Hiba a regisztráció során:', err);
        return res.status(500).json({ message: 'Hiba a regisztráció során!' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(401).json({ message: 'Hiányzó email vagy jelszó!' });
    }

    const user = await felhasznalok.findOne({ where: { email } });
    if (!user) {
        return res.status(404).json({ message: 'Nem létezik ilyen felhasználó!' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).json({ message: 'Hibás jelszó!' });
    }

    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    return res.status(201).json({
        message: 'Sikeres bejelentkezés!',
        token,
        userId: user.id,
        email: user.email
    });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
