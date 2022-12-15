const db = require("../db/db");

const favoriteDB = {
    getFavorites: async (idMember) => {
        const query = {
            text: "SELECT id_annonce FROM vinced.favoris WHERE id_membre = $1",
            values: [idMember]
        }
        try{
            const {rows} = await db.query(query);
            console.log(rows);
            return rows;
        }catch{
            throw new Error("Error while getting all the favorites from this member.");
        }
    },
    toggleFavorite: async (body) => {
       const query = {
            text: "",
            values: []
        };
        if(await isFavorite(body)){
            // eslint-disable-next-line no-console
            console.log("DELETE FAV");
            query.text = `DELETE FROM vinced.favoris WHERE id_membre = $1 AND id_annonce = $2;`;
            query.values = [body.id_membre, body.id_article];
        }
        else{
            // eslint-disable-next-line no-console
            console.log("ADD FAV");
            query.text =  `INSERT INTO vinced.favoris VALUES ($1, $2)`;
            query.values = [body.id_membre, body.id_article];
        }
        try{
            const {rows} = await db.query(query);
            return rows;
        }
        catch (e) {
            throw new Error("Error while creating this favorite in the database.");
        }
    }
}

async function isFavorite(body){
    const query = {
        text: `SELECT * FROM vinced.favoris WHERE id_membre = $1 AND id_annonce = $2;`,
        values: [body.id_membre, body.id_article]
    };
    const result = await db.query(query);
    const {rows} = result;
    const row = rows[0];
    return row;
}

module.exports = favoriteDB;