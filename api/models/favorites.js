const db = require("../db/db");

const favoriteDB = {
    getFavorites: async (idMember) => {
        const query = {
            text: "SELECT id_annonce FROM vinced.favoris WHERE id_membre = $1",
            values: [idMember]
        }
        try{
            const {rows} = await db.query(query);
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
        if(await favoriteDB.isFavorite(body)){
            query.text = `DELETE FROM vinced.favoris WHERE id_membre = $1 AND id_annonce = $2;`;
            query.values = [body.id_membre, body.id_article];
        }
        else{
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
    },
    isFavorite: async (idMembre, idArticle) => {
        const query = {
            text: `SELECT * FROM vinced.favoris WHERE id_membre = $1 AND id_annonce = $2;`,
            values: [idMembre, idArticle]
        };
        const result = await db.query(query);
        const {rows} = result;
        return rows[0] || false;
    }
}

module.exports = favoriteDB;