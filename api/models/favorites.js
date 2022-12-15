const db = require("../db/db");

const favoriteDB = {

    toggleFavorite: async (body) => {
       const query = {
            text: "",
            values: []
        };
        if(await isFavorite(body)){
            // eslint-disable-next-line no-console
            console.log("DELETE FAV");
            
            // eslint-disable-next-line no-console
            console.log(body.id_membre);
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
    const row = await db.query(query);
    return row;
}

module.exports = favoriteDB;