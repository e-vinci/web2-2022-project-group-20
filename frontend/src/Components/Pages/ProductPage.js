import gameboyimg from '../../img/gameboy.png';




const title = 'Gameboy';
const price = 100;
const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vulputate ex gravida nibh elementum, vel luctus tortor volutpat. In fringilla viverra sem a faucibus. Phasellus imperdiet commodo enim sed gravida. Nullam lacinia mollis mauris quis posuere. Donec placerat auctor odio, non porttitor eros bibendum nec. Nullam fermentum odio at dictum.";
const adresse = "Paris";
const googlemaplink = `<div class="mapouter"><div class="gmap_canvas"><iframe width="895" height="400" id="gmap_canvas" src="https://maps.google.com/maps?q=${adresse}&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://123movies-to.org">123 movies</a><br><style>.mapouter{position:relative;text-align:right;height:482px;width:895px;}</style><a href="https://www.embedgooglemap.net"></a><style>.gmap_canvas {overflow:hidden;background:none!important;height:482px;width:895px;}</style></div></div>`

const ProductPage = () => {
    const main = document.querySelector('main');

    const html = `
    <div class="container">
    <div class="row">

        
        <div class="col-4">
            <img src="${gameboyimg}" alt="gameboy" class="img-fluid">
        </div>

        
        <div class="col-8" style="background-color: #a4c4d4;">

            <h1>${title}</h1>
            <button type="button" class="btn btn-primary btn-round mr-md-3 mb-md-0 mb-2" style="float: right;"><3</button>

            <h2>${price}€</h2>


            <div class="row">
                <div class="col-10">
                    <p>${description}</p>
                </div>

                <div class="col">
                <button type="button" class="btn btn-primary btn-round mr-md-3 mt-3 mb-2" style="float: right;
                                                                                                 background-color: #44b1c6;">Ajouter au Panier</button>
                <br>
                <button type="button" class="btn btn-primary btn-round mr-md-3 mt-2 mb-2" style="float: right;
                                                                                                 background-color: #2891ad;">Acheter maintenant ! </button>


                </div>
            </div>

            <p>Etat : </p>
            <p>Livraison : </p>
            <p>Délai de livraison : </p>

            <div class="map-responsive">

            ${googlemaplink}

            </div>



        </div>


    </div>
</div>`;

    main.innerHTML = html;

    
  };
  
  export default ProductPage;
  