const { felhasznalok } = require("../models");
const bcrypt = require('bcrypt');


async function seedAdmins() {
    const admins = [{
            name: 'Albók Csaba',
            email: 'albok.csaba.2021@osztalyterem.katolikuskeri.hu',
            username: 'albokcsabi',
            password: await bcrypt.hash('Csabi1017', 10),
            role: 'admin'
        },
        {
            name: 'Varga-Ádám Róbert',
            email: 'varga-adam.robert.2021@osztalyterem.katolikuskeri.hu',
            username: 'vargarobi',
            password: await bcrypt.hash('RobaBoss177', 10),
            role: 'admin'
        }
    ];

    for (let admin of admins) {
        const exists = await felhasznalok.findOne({where: { email: admin.email }});
        if (!exists) {
            await felhasznalok.create(admin);
        }

        console.log("Adminok létrehozva!");
        
    }
}


module.exports = seedAdmins;