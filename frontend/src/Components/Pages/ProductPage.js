import { clearPage, renderPageTitle } from '../../utils/render';


const adresse = "rue ernest laude 32";
const googlemaplink = `<div class="mapouter"><div class="gmap_canvas"><iframe width="895" height="400" id="gmap_canvas" src="https://maps.google.com/maps?q=${adresse}&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><br><style>.mapouter{position:relative;text-align:right;height:482px;width:895px;}</style><a href="https://www.embedgooglemap.net"></a><style>.gmap_canvas {overflow:hidden;background:none!important;height:482px;width:895px;}</style></div></div>`

/* 
const images = [gameboyimg,"https://i.imgur.com/p9HrhjR.jpeg","https://i.imgur.com/8n4pFVE.jpeg"];

let i = 0;
let imgrender = images[i];

*/
const ProductPage = async () => {
    clearPage();
    renderPageTitle("PRODUCT PAGE");
    renderhomepage();
}

    
    

async function renderhomepage() {
  const idProduct = new URLSearchParams(window.location.search).get("idProduct")
  const request = {
    method: "GET"
  };
  let response = await fetch(`api/articles/${idProduct}`, request);
  response = await response.json();
  
  const productInfo = response[0];
  // eslint-disable-next-line no-console
  console.log(productInfo);
  let html = 
    ` 
  <section style="background-color: #eee;">
  <div class="containerproduct py-5">
    <div class="row justify-content-center">
      <div class="col-md- col-lg-6 col-xl-7">
        <div class="card" id="cardProductPage" style="border-radius: 15px;">
          <div class="bg-image hover-overlay ripple ripple-surface ripple-surface-light"
            data-mdb-ripple-color="light">
          
            <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/12.webp"
            style="border-top-left-radius: 15px; border-top-right-radius: 15px;" class="img-fluid"
            alt="Laptop" />
        
            
            <a href="#!">
              <div class="mask"></div>
            </a>
          </div>
          <div class="card-body pb-0">
            <div class="d-flex justify-content-between">
              <div>
                <h3>${productInfo.nom_article} </h3>
                <p class="small">${productInfo.description} </p>
                <p>PRICE : ${productInfo.prix}  </p>
                <p>STATUS : ${productInfo.status}   </p>

                <p class="small text-muted">CATEGORY : ${productInfo.categorie}</p>
              </div>
              <div>
                <p>SELLER :  <a href="/profile?idMembre=${productInfo.id_vendeur}">${productInfo.prenom_vendeur} ${productInfo.nom_vendeur}</a></p>
                `
                if(productInfo.id_acheteur){
                  html += `<p>BUYER :  <a href="/profile?idMembre=${productInfo.id_acheteur}">${productInfo.prenom_acheteur} ${productInfo.nom_acheteur}</a></p>`
                 
                }
              html += `</div>
            </div>
          </div>
          <hr class="my-0" />
          <div class="card-body pb-0">
            <div class="d-flex justify-content-between">
            </div>
            <div class="map-responsive mb-3">${googlemaplink}</div>
          </div>
          <hr class="my-0" />
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center pb-2 mb-1">
              <a href="#!" class="text-dark fw-bold">ADD TO WISHLIST</a>
              <button type="button" class="btn btn-primary">Buy now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

            
`;
    const main = document.querySelector('main');
    main.innerHTML = html;

/* 
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
    //  eslint-disable-next-line no-plusplus
    i +=1;
    imgrender = images[i];
    // eslint-disable-next-line no-return-assign
    return img.src = imgrender;
}

document.querySelector('.carousel-control-prev').addEventListener('click', prev);
document.querySelector('.carousel-control-next').addEventListener('click', next);

};
  */
};

export default ProductPage;


  /*
<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
<span class="carousel-control-prev-icon" aria-hidden="true"></span>
<span class="visually-hidden">Previous</span>
</button>

<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
<span class="carousel-control-next-icon" aria-hidden="true"></span>
<span class="">Next</span>
</button>
*/