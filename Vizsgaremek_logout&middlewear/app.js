const express = require('express'); 
const {Sequelize, DataTypes, where} = require('sequelize');
const cors = require('cors');
const bcrypt = require('bcrypt');
const crypto = require('crypto'); 
const jwt = require('jsonwebtoken'); 



const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
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
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const velemenyek = sequelize.define('velemenyek', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    opinion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userName: {
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


const tokenBlacklist = new Set();


app.post('/register', async (req, res) => {
    const {name, email, username, password} = req.body;

    if (!name || !email || !username || !password) {
        return res.status(401).json({message: 'Hiányzó adat!'});
    }
    const letezousername = await felhasznalok.findOne({where: {username}});
    if (letezousername) {
        return res.status(404).json({message: 'Ezzel a felhasználó névvel már regisztráltak!'})
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
});


app.post('/login', async (req, res) => {
    const {email, username, password} = req.body;

      if (!email || !username || !password) {
        return res.status(401).json({message: 'Hiányzó adat!'});
    }
    
    const letezofelhasznalo = await felhasznalok.findOne({where: {email}});
    if (!letezofelhasznalo) {
        return res.status(404).json({message: 'Nem létezik ilyen felhasználó!'});
    }
    const validjelszo = await bcrypt.compare(password, letezofelhasznalo.password);
    if (!validjelszo) {
        return res.status(401).json({message: 'Hibás jelszó!'})
    }

    const felhasznalo = {id: letezofelhasznalo.id, email: letezofelhasznalo.email, username: letezofelhasznalo.username};
    const token = jwt.sign(felhasznalo, SECRET_KEY, {expiresIn: '1h'});
    res.json({token, userId: letezofelhasznalo.id, email});
});

app.post('/velemenyek', async (req, res) => {
    const {opinion, userName} = req.body;

    if (!opinion || !userName) {
        return res.status(400).json({message: 'Hiba történt a vélemény megadása közben!'})
    }

    try {
        const newopinion = await velemenyek.create({ opinion, userName });
        res.status(201).json({message: 'Sikeres vélemény fogadás!', opinion: newopinion})
    } catch(error) {
        console.log('Hiba a vélemény mentésekor!', error);
        res.status(500).json({message: 'Hiba tötrént a vélemények mentésekor!'})
    }
});

app.post('/logout', (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (token) {
        tokenBlacklist.add(token);
        return res.json({message: 'Sikeres kijelentkezés!'})
    }

    return res.status(400).json({message: 'Nincs bejelentkezve!'});
});

const authenticationtoken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token || tokenBlacklist.has(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });

}
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

});

