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
                       FROM vinced.posts
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
// const defaultarticle = {
//     id: 0,
//     title: 'Default',
//     price: 0,
//     description: 'Default',
//     id_auteur: 0,
//     images: ['https://www.google.com'],
//     googlemaplink: 'Bruxelles',
//     categorie: 'Default',
//     date: 'Default',
//     etat: 'Default'
// };

// router.get('/:id', (req, res) => {
//     console.log(`GET /article/${req.params.id}`);
//     const id = req.params.id;
//     const article = articles.find((article) => article.id === id);

//     res.json(article);
//   });



