require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth.routes');
const perfumeRoutes = require('./routes/perfume.routes');
const velemenyRoutes = require('./routes/velemeny.routes');
const cartRoutes = require('./routes/kosar.routes');
const userRoutes = require('./routes/user.routes');
const seedPerfumes = require('./seeders/perfumeSeeder');
const seedAdmins = require('./seeders/adminSeeder');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/auth', authRoutes); 
app.use('/perfumes', perfumeRoutes);
app.use('/velemenyek', velemenyRoutes);
app.use('/cart', cartRoutes);
app.use('/users', userRoutes);

sequelize.sync()
    .then(() => {
        console.log('Adatbázis szinkronizálva!');
        seedPerfumes();
        seedAdmins(); 
    })
    .catch(() => {
        console.log('Hiba történt az adatbázis szinkronizálása közben!');
    });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});