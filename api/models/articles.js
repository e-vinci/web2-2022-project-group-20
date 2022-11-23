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

    async getArticleById(id){
        const query = {
            text: `SELECT id_annonce,
                              nom,
                              description,
                              id_acheteur,
                              id_vendeur,
                              date_pub,
                              prix,
                              status
                       FROM vinced.posts
                       WHERE id_annonce = $1`,
            values: [id]
        };
        try {
            const {rows} = await db.query(query);
            return rows;
        } catch (e) {
            throw new Error("Error while getting this post from the database.");
        }
    }


    async getArticlesByUserId(id){
        const query = {
            text: `SELECT id_annonce,
                                nom,
                                description,
                                id_acheteur,
                                id_vendeur,
                                date_pub,
                                prix,
                                status
                        FROM vinced.posts
                        WHERE id_vendeur = $1
                        ORDER BY id_annonce DESC`,
            values: [id]
        };
        try {
            const {rows} = await db.query(query);
            return rows;
        } catch (e) {
            throw new Error("Error while getting all posts from the database.");
        }
    }

    async getUsersFavoriteArticles(id){
        const query = {
            text: `SELECT id_annonce,
                                nom,
                                description,
                                id_acheteur,
                                id_vendeur,
                                date_pub,
                                prix,
                                status
                        FROM vinced.posts
                        WHERE id_annonce IN (SELECT id_annonce
                                                FROM vinced.favoris
                                                WHERE id_user = $1)
                        ORDER BY id_annonce DESC`,
            values: [id]
        };
        try {
            const {rows} = await db.query(query);
            return rows;
        } catch (e) {
            throw new Error("Error while getting all posts from the database.");
        }
    }

    async getArticlesByCategoryId(id){
        const query = {
            text: `SELECT id_annonce,
                                nom,
                                description,
                                id_acheteur,
                                id_vendeur,
                                date_pub,
                                prix,
                                status
                        FROM vinced.posts
                        WHERE id_categorie = $1
                        ORDER BY id_annonce DESC`,
            values: [id]
        };
        try {
            const {rows} = await db.query(query);
            return rows;
        } catch (e) {
            throw new Error("Error while getting all posts from the database.");
        }
    }

    async getArticlesBySearch(search){
        const query = {
            text: `SELECT id_annonce,
                                nom,
                                description,
                                id_acheteur,
                                id_vendeur,
                                date_pub,
                                prix,
                                status
                        FROM vinced.posts
                        WHERE nom ILIKE '%$1%'
                        ORDER BY id_annonce DESC`,
            values: [search]
         };
        try {
            const {rows} = await db.query(query);
            return rows;
        } catch (e) {
            throw new Error("Error while getting all posts from the database.");
        }
    }
}
module.exports = {Articles};



