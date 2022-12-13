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
    
},
    createAdresse : async (adresse) => {

    const query = {
        text: `INSERT INTO vinced.adresses (id_membre, rue, numero, boite,ville,code_postal,pays)
                VALUES ($1, $2, $3, $4, $5,$6,$7)
                RETURNING id_adresse`,
        values: [adresse.id_membre, adresse.rue, adresse.numero, adresse.boite,adresse.ville,adresse.code_postal,adresse.pays]
    };
        const {rows} = await db.query(query);
        return rows;

}



}

module.exports = adresseDB;