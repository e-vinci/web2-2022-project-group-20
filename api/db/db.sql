DROP SCHEMA IF EXISTS vinced CASCADE;
CREATE SCHEMA vinced;

-- CREATE TABLES
CREATE TABLE vinced.membres (
	id_membre SERIAL PRIMARY KEY,
	email VARCHAR(50) NOT NULL UNIQUE  CHECK ( email <> '' ),
	nom VARCHAR(50) NOT NULL CHECK (nom<>''),
	prenom VARCHAR(50) NOT NULL CHECK (prenom<>''),
	mdp VARCHAR(50) NOT NULL CHECK ( mdp <> '' ),
	image_profil VARCHAR(100), -- TODO: Mettre le path pour l'image par défaut
    is_admin BOOLEAN DEFAULT false,
    balance DOUBLE PRECISION DEFAULT 0 NOT NULL CHECK ( prix >= 0 )

);

CREATE TABLE vinced.adresses (
    id_adresse SERIAL PRIMARY KEY,
    id_membre INTEGER NOT NULL REFERENCES vinced.membres,
    rue VARCHAR(100) NOT NULL,
    numero VARCHAR(5) NOT NULL,
    boite VARCHAR(5),
    ville VARCHAR(50) NOT NULL,
    code_postal VARCHAR(5) NOT NULL,
    pays VARCHAR(50) NOT NULL
);


CREATE TYPE vinced.STATUS AS ENUM ('En cours', 'Postée','Resrvée','Vendue');

CREATE TABLE vinced.annonces (
    id_annonce SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL CHECK ( nom <> '' ),
    description VARCHAR(120) NOT NULL CHECK ( description <> '' ),
    id_acheteur INTEGER REFERENCES vinced.membres,
    id_vendeur INTEGER NOT NULL REFERENCES vinced.membres,
    date_pub DATE NOT NULL,
    prix DOUBLE PRECISION NOT NULL CHECK ( prix > 0 ),
    status vinced.STATUS NOT NULL DEFAULT 'Postée',
    photo VARCHAR(50) CHECK ( photo <> '' ),
    id_adresse INTEGER REFERENCES vinced.adresses
);

CREATE TABLE vinced.favoris (
    PRIMARY KEY (id_membre, id_annonce),
    id_membre INTEGER NOT NULL REFERENCES vinced.membres,
    id_annonce INTEGER NOT NULL REFERENCES vinced.annonces
);

CREATE TABLE vinced.photos (
    id_photo SERIAL PRIMARY KEY,
    id_annonce INTEGER NOT NULL  REFERENCES vinced.annonces
);

CREATE TABLE vinced.categories (
    id_categorie SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL
);

CREATE TABLE vinced.categories_choisis (
    PRIMARY KEY (id_annonce, id_categorie),
    id_annonce INTEGER NOT NULL REFERENCES vinced.annonces,
    id_categorie INTEGER NOT NULL REFERENCES vinced.categories
);

CREATE TABLE vinced.annonce_photos (
    PRIMARY KEY (id_annonce, id_photo),
    id_annonce INTEGER NOT NULL REFERENCES vinced.annonces,
    id_photo INTEGER NOT NULL REFERENCES vinced.photos
);

-- VUE POUR AVOIR TOUTES LES INFOS D'UN ARTICLE
CREATE OR REPLACE VIEW vinced.cartes_articles AS
    SELECT a.id_annonce, a.nom AS "nom_article", a.description,a.prix, a.date_pub, a.photo, a.status,
           c.nom AS "categorie",
           ma.id_membre AS "id_acheteur", ma.nom AS "nom_acheteur", ma.prenom AS "prenom_acheteur",
           mv.id_membre AS "id_vendeur", mv.nom AS "nom_vendeur", mv.prenom AS "prenom_vendeur"
    FROM ( (vinced.annonces a LEFT JOIN vinced.membres ma ON ma.id_membre = a.id_acheteur)
        JOIN vinced.membres mv ON a.id_vendeur = mv.id_membre )
        JOIN vinced.categories c on a.categorie = c.id_categorie;

-- INSERT INTO MEMBRES
INSERT into vinced.membres VALUES (DEFAULT, 'victor.denis@student.vinci.be', 'DENIS','Victor', 'azerty', '../images/default.jpg');
INSERT into vinced.membres VALUES (DEFAULT, 'mehdi.bouchbouk@student.vinci.be', 'BOUCHBOUK','Mehdi', 'azerty', '../images/default.jpg');
INSERT into vinced.membres VALUES (DEFAULT, 'rayan.abarkan@student.vinci.be', 'ABARKAN','Rayan', 'azerty', '../images/default.jpg');
INSERT into vinced.membres VALUES (DEFAULT, 'antoine.pirelot@student.vinci.be', 'PIRELOT','Antoine', 'azerty', '../images/default.jpg');
INSERT into vinced.membres VALUES (DEFAULT, 'clement.coegniet@student.vinci.be', 'COEUGNIET','Clément', 'azerty', '../images/default.jpg');
INSERT into vinced.membres VALUES (DEFAULT, 'luis.brunard@student.vinci.be', 'BRUNARD','Luis', 'azerty', '../images/default.jpg');
INSERT into vinced.membres VALUES (DEFAULT, 'elie.debacker@student.vinci.be', 'DeBacker','Elie', 'azerty', '../images/default.jpg');
INSERT into vinced.membres VALUES (DEFAULT, 'olivier.bogearts@student.vinci.be', 'BOGEARTS','Olivier', 'azerty', '../images/default.jpg');
INSERT into vinced.membres VALUES (DEFAULT, 'ferdinand.rouxdebezieux@student.vinci.be', 'Roux De Bézieux','Ferdinand', 'azerty', '../images/default.jpg');
INSERT into vinced.membres VALUES (DEFAULT, 'arthur.demurger@student.vinci.be', 'DEMURGER','Arthur', 'azerty', '../images/default.jpg');

-- INSERT INTO ANNONCES
INSERT INTO vinced.annonces VALUES (DEFAULT, 'PS5', 'PS5 1TO sans lecteur cd', 1, 5, '2022-03-15', 650, 'Resrvée');
INSERT INTO vinced.annonces VALUES (DEFAULT, 'Clavier logitech', 'Clavier logitech mechanique avec RGB', null, 3, '2022-03-15', 65, 'Postée');
INSERT INTO vinced.annonces VALUES (DEFAULT, 'Assistant alexa', 'Alexa 2de gen', 4, 2, '2022-03-19', 90, 'En cours');
INSERT INTO vinced.annonces VALUES (DEFAULT, 'Table de chevet', 'Table de chevet IKEA (ref: chtêmöl)', 7, 9, '2022-09-26', 45, 'Vendue');
INSERT INTO vinced.annonces VALUES (DEFAULT, 'Plaid', 'Plaid chaud pour l''hiver', null, 5, '2022-04-02', 650, 'Postée');
INSERT INTO vinced.annonces VALUES (DEFAULT, 'Pull col roulé', 'Pull col roulé tommy taille m', null, 6, '2022-05-22', 65, 'Postée');

-- INSERT INTO ADRESSES
INSERT INTO vinced.adresses VALUES (DEFAULT, 1, 'Rue de l''abricot', '25', null, 'Bruxelles', '1190', 'Belgique');
INSERT INTO vinced.adresses VALUES (DEFAULT, 4, 'Avenue Brugman', '145', '3A', 'Bruxelles', '1180', 'Belgique');
INSERT INTO vinced.adresses VALUES (DEFAULT, 6, 'Rue des croix de pierre', '40', null, 'Bruxelles', '1160', 'Belgique');
INSERT INTO vinced.adresses VALUES (DEFAULT, 9, 'Rue Victor Rousseau', '65', null, 'Bruxelles', '1190', 'Belgique');

-- INSERT INTO FAVORIS
INSERT INTO vinced.favoris VALUES (1, 6);
INSERT INTO vinced.favoris VALUES (5, 4);
INSERT INTO vinced.favoris VALUES (2, 1);
INSERT INTO vinced.favoris VALUES (4, 4);
INSERT INTO vinced.favoris VALUES (8, 4);
INSERT INTO vinced.favoris VALUES (3, 1);
INSERT INTO vinced.favoris VALUES (7, 3);

-- INSERT INTO CATEGORIES
INSERT INTO vinced.categories VALUES (DEFAULT, 'Informatique');
INSERT INTO vinced.categories VALUES (DEFAULT, 'jardinage');
INSERT INTO vinced.categories VALUES (DEFAULT, 'Gaming');
INSERT INTO vinced.categories VALUES (DEFAULT, 'Meuble de chambre');
INSERT INTO vinced.categories VALUES (DEFAULT, 'Vetements');

-- INSERT INTO CATEGORIES CHOISIS
INSERT INTO vinced.categories_choisis VALUES (1, 1);
INSERT INTO vinced.categories_choisis VALUES (1, 3);
INSERT INTO vinced.categories_choisis VALUES (2, 1);
INSERT INTO vinced.categories_choisis VALUES (2, 3);
INSERT INTO vinced.categories_choisis VALUES (3, 1);
INSERT INTO vinced.categories_choisis VALUES (3, 4);
INSERT INTO vinced.categories_choisis VALUES (4, 4);
INSERT INTO vinced.categories_choisis VALUES (5, 5);
INSERT INTO vinced.categories_choisis VALUES (6, 5);


