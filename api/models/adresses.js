const db = require("../db/db");

const adresseDB = {
    getAllAdressesUser: async (id) => {
        const query = {
            text: `SELECT rue,numero,boite,ville,code_postal,pays
                        FROM vinced.adresses
                        WHERE id_membre = $1`,
            values: [id]
        };
        try {
            const {rows} = await db.query(query);
            return rows;
        } catch (e) {
            throw new Error("Error while getting the category from the database.");
        }
        
},

getAdresseById: async (id) => {
    const query = {
        text: `SELECT rue,numero,boite,ville,code_postal,pays
                    FROM vinced.adresses
                    WHERE id_adresse = $1`,
        values: [id]
    };
    try {
        const {rows} = await db.query(query);
        return rows;
    } catch (e) {
        throw new Error("Error while getting the category from the database.");
    }
    
}



}

module.exports = adresseDB;