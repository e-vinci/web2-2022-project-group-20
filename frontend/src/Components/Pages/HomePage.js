import { clearPage, renderPageTitle } from '../../utils/render';
import img from '../../img/No-Image-Found.png';

const HomePageRender = async () => {
  const main = document.querySelector('main');

  const notFavIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z"/></svg>';
  const favIcon =
    '<svg class="favSvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>';

  const local = await JSON.parse(window.localStorage.getItem('member'));
  const idMember = local.id_membre;
  let request = {
    method: 'GET',
  };
  let response = await fetch(`api/articles?id_member=${idMember}`, request);

  response = await response.json();
  const cartes = response.articles;
  const likes = [];
  response.favorites.forEach((e) => {
    likes.push(e.id_annonce);
  });

  let html = `
      <section>
        <div class="containerhomepage py-5">
          <div class="row">`;
  cartes.forEach(async (carte) => {
    html += `
        <div class="col-md-12 col-lg-4 mb-4 mb-lg-0">
          <div class="card cardHomePage">
            
            <img src="${img}"
              class="card-img-top" alt="Laptop" />
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <p class="small"><a href="/profile?idMembre=${carte.id_vendeur}" class="text-muted">${carte.prenom_vendeur} ${carte.nom_vendeur}</a> </p>
                `;
    if (likes.includes(carte.id_annonce))
      html += `<div class="likeButton isLiked" id="${carte.id_annonce}">${favIcon}</div></div>`;
    else
      html += `<div class="likeButton notLiked" id="${carte.id_annonce}">${notFavIcon}</div></div>`;
    if (carte.id_acheteur) {
      html += `<span class="badge bg-danger" style="width:100px" >SOLD</span>`;
    }
    html += `
              
                
              <div class="d-flex justify-content-between mb-3">                
                <a class="nomArticle" href="/product?idProduct=${carte.id_annonce}"> 
                <h5 class="mb-0">${carte.nom_article}</h5> </a>
                <h5 class="text-dark mb-0">${carte.prix}€</h5>
              </div>

              <p class="articleDescription">${carte.description} 
              </p>
            </div>
          </div>
        </div>
        `;
  });

  main.innerHTML = html;

  const containerhomepage = document.querySelector('.containerhomepage');
  const likeButtons = containerhomepage.getElementsByClassName('likeButton');
  const likeButtonsArray = Array.from(likeButtons);

  likeButtonsArray.forEach((likeButton) => {
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
  });
};

const HomePage = () => {
  clearPage();
  renderPageTitle('HOMEPAGE');
  HomePageRender();
};

export default HomePage;
