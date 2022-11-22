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


    async getArticle(id){
        const query = `SELECT id_annonce,
                              nom,
                              description,
                              id_acheteur,
                              id_vendeur,
                              date_pub,
                              prix,
                              status
                       FROM vinced.posts
                       WHERE id_annonce = ${id}`;
        try {
            const {rows} = await db.query(query);
            return rows;
        } catch (e) {
            throw new Error("Error while getting this post from the database.");
        }
    }


    async getArticlesByUser(id){
        const query = `SELECT id_annonce,
                                nom,
                                description,
                                id_acheteur,
                                id_vendeur,
                                date_pub,
                                prix,
                                status
                        FROM vinced.posts
                        WHERE id_vendeur = ${id}
                        ORDER BY id_annonce DESC`;
        try {
            const {rows} = await db.query(query);
            return rows;
        } catch (e) {
            throw new Error("Error while getting all posts from the database.");
        }
    }

    async getFavoriteArticles(id){
        const query = `SELECT id_annonce,
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
                                                WHERE id_user = ${id})
                        ORDER BY id_annonce DESC`;

        try {
            const {rows} = await db.query(query);
            return rows;
        } catch (e) {
            throw new Error("Error while getting all posts from the database.");
        }
    }

    async getArticlesByCategory(id){
        const query = `SELECT id_annonce,
                                nom,
                                description,
                                id_acheteur,
                                id_vendeur,
                                date_pub,
                                prix,
                                status
                        FROM vinced.posts
                        WHERE id_categorie = ${id}
                        ORDER BY id_annonce DESC`;
        try {
            const {rows} = await db.query(query);
            return rows;
        } catch (e) {
            throw new Error("Error while getting all posts from the database.");
        }
    }

    async getArticlesBySearch(search){
        const query = `SELECT id_annonce,
                                nom,
                                description,
                                id_acheteur,
                                id_vendeur,
                                date_pub,
                                prix,
                                status
                        FROM vinced.posts
                        WHERE nom ILIKE '%${search}%'
                        ORDER BY id_annonce DESC`;
        try {
            const {rows} = await db.query(query);
            return rows;
        } catch (e) {
            throw new Error("Error while getting all posts from the database.");
        }
    }

    

}
module.exports = {Articles};



