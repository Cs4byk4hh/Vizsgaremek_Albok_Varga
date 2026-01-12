const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const perfumeRoutes = require('./routes/perfume.routes');
const velemenyRoutes = require('./routes/velemeny.routes');
const cartRoutes = require('./routes/kosar.route');
const { sequelize } = require('./models');
const seedPerfumes = require('./seeders/perfumeSeeder');

const app = express();
const PORT = 3000;

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

sequelize.sync()
    .then(() => {
        console.log('Adatbázis szinkronizálva!');
        seedPerfumes();
    })
    .catch(() => {
        console.log('Hiba történt az adatbázis szinkronizálása közben!');
    });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});