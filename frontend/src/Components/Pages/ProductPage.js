import { clearPage, renderPageTitle } from '../../utils/render';
import img from '../../img/No-Image-Found.png';

const adresse = 'rue ernest laude 32';
const googlemaplink = `<div class="mapouter"><div class="gmap_canvas"><iframe width="895" height="400" id="gmap_canvas" src="https://maps.google.com/maps?q=${adresse}&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><br><style>.mapouter{position:relative;text-align:right;height:482px;width:895px;}</style><a href="https://www.embedgooglemap.net"></a><style>.gmap_canvas {overflow:hidden;background:none!important;height:482px;width:895px;}</style></div></div>`;

const ProductPage = async () => {
  clearPage();
  renderPageTitle('PRODUCT PAGE');
  renderhomepage();
};

async function renderhomepage() {
  const notFavIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z"/></svg>';
  const favIcon =
    '<svg class="favSvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>';

  const local = await JSON.parse(window.localStorage.getItem('member'));
  const idMember = local.id_membre;
  const idProduct = new URLSearchParams(window.location.search).get('idProduct');
  let request = {
    method: 'GET',
  };
  let response = await fetch(`api/articles?id=${idProduct}`, request);
  response = await response.json();
  let isLikedResponse = await fetch(`api/favorites?id_membre=${idMember}&id_article=${idProduct}`);
  isLikedResponse = await isLikedResponse.json();
  const product = response[0];
  let html = ` 
  <section style="background-color: #eee;">
  <div class="containerproduct py-5">
	<h1> Infos product </h1> <br>
    <div class="row justify-content-center">
      <div class="col-md- col-lg-6 col-xl-7">
        <div class="card" id="cardProductPage" style="border-radius: 15px;">
          <div class="bg-image hover-overlay ripple ripple-surface ripple-surface-light"
            data-mdb-ripple-color="light">
          
            <img src="${img}"
            style="border-top-left-radius: 15px; border-top-right-radius: 15px; width" class="img-fluid"
            alt="Laptop" />
        
            
            <a href="#!">
              <div class="mask"></div>
            </a>
          </div>
          <div class="card-body pb-0">
            <div class="d-flex justify-content-between">
              <div>
                <h3>${product.nom_article} </h3>
                <p class="small">${product.description} </p>
                <p>PRICE : ${product.prix}  </p>
                <p>STATUS : ${product.status}   </p>

                <p class="small text-muted">CATEGORY : ${product.categorie}</p>
              </div>
              <div>
                <p>SELLER :  <a href="/profile?idMembre=${product.id_vendeur}">${product.prenom_vendeur} ${product.nom_vendeur}</a></p>
                `;
  if (product.id_acheteur) {
    html += `<p>BUYER :  <a href="/profile?idMembre=${product.id_acheteur}">${product.prenom_acheteur} ${product.nom_acheteur}</a></p>`;
  }
  if (isLikedResponse)
    html += `<div class="likeButton isLiked" id="${product.id_annonce}" style="margin-left: auto; margin-right: auto; ">${favIcon}</div>`;
  else html += `<div class="likeButton notLiked" id="${product.id_annonce}">${notFavIcon}</div>`;

  if (!product.id_acheteur) {
    html += `<button type="button" id="${product.id_annonce}" class="btn btn-secondary disable buyButton">Buy now</button>`;
  } else {
    html += `
    <span class="badge bg-danger" style="width:100px" >SOLD</span>`;
  }
  html += `
            </div>
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

  const containerProduct = document.querySelector('.containerproduct');
  const likeButton = containerProduct.querySelector('.likeButton');

  likeButton.addEventListener('click', async () => {
    const isLiked = likeButton.classList.contains('isLiked');
    const lb = likeButton;
    if (isLiked) {
      lb.innerHTML = notFavIcon;
      likeButton.classList.remove('isLiked');
      likeButton.classList.add('notLiked');
    } else {
      lb.innerHTML = favIcon;
      likeButton.classList.remove('notLiked');
      likeButton.classList.add('isLiked');
    }

    const articleId = likeButton.getAttribute('id');
    request = {
      method: 'POST',
      body: JSON.stringify({
        id_membre: idMember,
        id_article: articleId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await fetch(`api/favorites`, request);
  });

  const buyButton = document.querySelector('.buyButton');
  if (buyButton) {
    buyButton.addEventListener('click', async (e) => {
      e.preventDefault();
      request = {
        method: 'POST',
        body: JSON.stringify({
          id_membre: idMember,
          id_article: product.id_annonce,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      await fetch(`api/articles/buy`, request);
      await renderhomepage();
    });
  }
}

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
