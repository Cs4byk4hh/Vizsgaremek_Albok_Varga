const {perfumes} = require('../models');

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
};

module.exports = seedPerfumes;