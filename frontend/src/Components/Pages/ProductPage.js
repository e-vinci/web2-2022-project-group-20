import gameboyimg from '../../img/gameboy.png';



// eslint-disable-next-line no-unused-vars
const images = [gameboyimg,"https://i.imgur.com/p9HrhjR.jpeg","https://i.imgur.com/8n4pFVE.jpeg"];
let i = 0;
let imgrender = images[i];

const title = 'Gameboy';
const price = 100;
const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vulputate ex gravida nibh elementum, vel luctus tortor volutpat. In fringilla viverra sem a faucibus. Phasellus imperdiet commodo enim sed gravida. Nullam lacinia mollis mauris quis posuere. Donec placerat auctor odio, non porttitor eros bibendum nec. Nullam fermentum odio at dictum.";
const adresse = "rue ernest laude 32";
const googlemaplink = `<div class="mapouter"><div class="gmap_canvas"><iframe width="895" height="400" id="gmap_canvas" src="https://maps.google.com/maps?q=${adresse}&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://123movies-to.org">123 movies</a><br><style>.mapouter{position:relative;text-align:right;height:482px;width:895px;}</style><a href="https://www.embedgooglemap.net"></a><style>.gmap_canvas {overflow:hidden;background:none!important;height:482px;width:895px;}</style></div></div>`
const auteur = "John Doe";

const ProductPage = () => {
    const main = document.querySelector('main');

    const html = `
<div class="container">

    <div class="row">

        <div class="col-md-4 mb-2">    

            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
            <div class="carousel-inner">
            <div class="carousel-item active">
            <img src="${imgrender}" id="id_img" class="d-block w-100" alt="...">
            </div>
            </div>


            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
            </button>

            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
            </button>
            </div>
            
        </div>



        <div class="col-md-8 mb-auto" style="background-color: #a4c4d4;">

            <h1>${title}</h1>
            <button type="button" class="btn btn-primary btn-round mr-md-3 mb-md-0 mb-2" style="float: right;"><3</button>
            <h2>${price}€</h2>
            <h5>Par <a href="https://www.google.com">${auteur}</a></h5>


            <div class="row">
                <div class="col-10">
                    <p>${description}</p>
                </div>

                <div class="col">
                <button type="button" class="btn btn-primary btn-block btn-round mr-md-3 mt-3 mb-2 " style="float: right;
                                                                                                 background-color: #44b1c6;">Ajouter au Panier</button>
                <br>
                <button type="button" class="btn btn-primary btn-block btn-round mr-md-3 mt-2 mb-2" style="float: right;
                                                                                                 background-color: #2891ad;">Acheter maintenant ! </button>
                </div>
            </div>


            <p>Etat : </p>
            <p>Livraison : </p>
            <p>Date de mise en vente : </p>

            <div class="map-responsive mb-3">${googlemaplink}</div>
        </div>
    </div>
</div>`;

main.innerHTML = html;


const img = document.querySelector('#id_img');

function prev () {
    if(i <= 0) i = images.length;
    // eslint-disable-next-line no-plusplus
    i -=1;
    imgrender = images[i];
    // eslint-disable-next-line no-return-assign
    return img.src = imgrender;
}

function next () {
    if(i >= images.length - 1) i = -1;
    // eslint-disable-next-line no-plusplus
    i +=1;
    imgrender = images[i];
    // eslint-disable-next-line no-return-assign
    return img.src = imgrender;
}

document.querySelector('.carousel-control-prev').addEventListener('click', prev);
document.querySelector('.carousel-control-next').addEventListener('click', next);

};


export default ProductPage;
  
