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
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const perfumes = sequelize.define('perfumes', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    volume_ml: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gender: {
        type: DataTypes.ENUM('ferfi', 'no', 'uniszex'),
        allowNull: false
    },
    season_spring: { type: DataTypes.BOOLEAN, defaultValue: false },
    season_summer: { type: DataTypes.BOOLEAN, defaultValue: false },
    season_autumn: { type: DataTypes.BOOLEAN, defaultValue: false },
    season_winter: { type: DataTypes.BOOLEAN, defaultValue: false },
    sweet: { type: DataTypes.BOOLEAN, defaultValue: false },
    spicy: { type: DataTypes.BOOLEAN, defaultValue: false }
});

async function seedPerfumes() {
    const count = await perfumes.count();
    if (count > 0) return;

    await perfumes.bulkCreate([
        {name:'Bitter Peach',brand:'Tom Ford',price:250,volume_ml:50,gender:'no',season_spring:true,season_summer:true,sweet:true},
        {name:'Lost Cherry',brand:'Tom Ford',price:250,volume_ml:50,gender:'uniszex',season_spring:true,season_autumn:true,sweet:true},
        {name:'Daisy Love Eau So Sweet',brand:'Marc Jacobs',price:54,volume_ml:30,gender:'no',season_spring:true,season_summer:true,sweet:true},
        {name:'Dylan Purple',brand:'Versace',price:75,volume_ml:30,gender:'no',season_spring:true,season_summer:true,sweet:true},
        {name:'Eau de Parfum',brand:'Jimmy Choo',price:74,volume_ml:60,gender:'no',season_spring:true,season_summer:true,sweet:true},
        {name:'Eden Juicy Apple',brand:'Kayali',price:100,volume_ml:100,gender:'no',season_spring:true,season_summer:true,sweet:true},
        {name:'Un Jardin sur le Nil',brand:'Hermès',price:110,volume_ml:125,gender:'uniszex',season_spring:true,season_summer:true},
        {name:'Opium',brand:'YSL',price:90,volume_ml:50,gender:'no',season_autumn:true,season_winter:true,spicy:true},
        {name:'Khamrah Dukhan',brand:'Lattafa',price:35,volume_ml:50,gender:'uniszex',season_summer:true,season_autumn:true,spicy:true},
        {name:'Spicebomb Infrared',brand:'Viktor & Rolf',price:95,volume_ml:50,gender:'ferfi',season_autumn:true,season_winter:true,spicy:true},
        {name:'Dolce Amalfi',brand:'Xerjoff',price:200,volume_ml:100,gender:'uniszex',season_spring:true,season_autumn:true,spicy:true},
        {name:'One Million',brand:'Paco Rabanne',price:95,volume_ml:50,gender:'ferfi',season_summer:true,season_winter:true,spicy:true},
        {name:'Terre d’Hermès',brand:'Hermès',price:80,volume_ml:50,gender:'ferfi',season_spring:true,season_autumn:true,spicy:true},
        {name:'Delina',brand:'Parfums de Marly',price:280,volume_ml:75,gender:'no',season_spring:true,sweet:true},
        {name:'Black Opium',brand:'YSL',price:125,volume_ml:50,gender:'no',season_spring:true,season_autumn:true,season_winter:true,sweet:true,spicy:true},
        {name:'Under the Lemon Trees',brand:'Maison Margiela',price:85,volume_ml:100,gender:'uniszex',season_spring:true,season_summer:true},
        {name:'Acqua di Gioia',brand:'Giorgio Armani',price:95,volume_ml:100,gender:'no',season_spring:true,season_summer:true},
        {name:'Bombshell',brand:'Victoria’s Secret',price:60,volume_ml:100,gender:'no',season_summer:true,sweet:true},
        {name:'Light Blue',brand:'Dolce & Gabbana',price:75,volume_ml:100,gender:'no',season_summer:true},
        {name:'I Want Choo',brand:'Jimmy Choo',price:76,volume_ml:60,gender:'no',season_summer:true,sweet:true},
        {name:'Alchemie',brand:'Bottega Veneta',price:135,volume_ml:100,gender:'uniszex',season_summer:true,spicy:true},
        {name:'Tangerine Boy',brand:'Phlur',price:99,volume_ml:50,gender:'uniszex',season_spring:true,season_summer:true},
        {name:'Strawberry Letter',brand:'Phlur',price:99,volume_ml:50,gender:'no',season_summer:true,sweet:true},
        {name:'On a Date',brand:'Maison Margiela',price:85,volume_ml:100,gender:'uniszex',season_spring:true,season_autumn:true},
        {name:'Eau de Pamplemousse Rose',brand:'Hermès',price:144,volume_ml:100,gender:'uniszex',season_spring:true},
        {name:'Bright Crystal',brand:'Versace',price:92,volume_ml:90,gender:'no',season_spring:true,season_summer:true,sweet:true},
        {name:'Blackberry & Bay',brand:'Jo Malone',price:86,volume_ml:100,gender:'uniszex',season_spring:true,season_summer:true},
        {name:'Father Figure',brand:'Phlur',price:99,volume_ml:50,gender:'uniszex',season_autumn:true,season_winter:true},
        {name:'Mango Skin',brand:'Maison Margiela',price:85,volume_ml:100,gender:'uniszex',season_summer:true},
        {name:'Baccarat Rouge 540',brand:'Maison Francis Kurkdjian',price:300,volume_ml:70,gender:'uniszex',season_autumn:true,season_winter:true,sweet:true}
    ]);

    console.log("Parfümök hozzáadva a táblához!");
}



sequelize.sync()
    .then(() => {
        console.log('Adatbázis szinkronizálva!');
        seedPerfumes();
    })
    .catch(() => {
        console.log('Hiba történt az adatbázis szinkronizálása közben!');
    });



const tokenBlacklist = new Set();


app.get('/perfumes', async (req, res) => {
    try {
        const lista = await perfumes.findAll();
        res.json(lista);
    } catch (error) {
        console.log("Hiba a parfümök lekérésekor:", error);
        res.status(500).json({ message: "Hiba történt a parfümök lekérése során!" });
    }
});


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