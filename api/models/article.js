const express = require('express');

const router = express.Router();

// eslint-disable-next-line no-unused-vars
const defaultarticle = {
    id: 0,
    title: 'Default',
    price: 0,
    description: 'Default',
    id_vendeur: 0,
    id_acheteur: 0,
    images: ['https://www.google.com'],
    googlemaplink: 'Bruxelles',
    categorie: 'Default',
    date_pub: 'Default',
    status: 'Default'
};

router.get('/:id', (req, res) => {
    // eslint-disable-next-line no-console
    console.log(`GET /article/${req.params.id}`);
    const {id} = req.params;
    // eslint-disable-next-line no-use-before-define, no-shadow
    const article = article.find((article) => article.id === id);

    res.json(article);
  });


  

