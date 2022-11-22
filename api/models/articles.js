const db = require("../db/db");

class Articles{

    // eslint-disable-next-line class-methods-use-this
    async getAllArticles(){
        const query = `SELECT id_annonce,
                              nom,
                              description,
                              id_acheteur,
                              id_vendeur,
                              date_pub,
                              prix,
                              status
                        FROM vinced.annonces
                        ORDER BY id_annonce DESC`;
        try {
            const {rows} = await db.query(query);
            return rows;
        } catch (e) {
            e.print();
            throw new Error("Error while getting all posts from the database.");
        }
    }
}

module.exports = {Articles};



