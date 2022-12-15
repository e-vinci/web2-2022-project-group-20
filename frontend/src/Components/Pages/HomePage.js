import { clearPage, renderPageTitle } from '../../utils/render';
// import loadUser from '../../utils/loadUser';

const img = 'https://picsum.photos/200/300';

const HomePageRender = async () => {
  const main = document.querySelector('main');

  let request = {
    method: 'GET',
  };
  let cartes = await fetch(`api/articles/`, request);
  cartes = await cartes.json();
  let html = `
      <section style="background-color: #eee;">
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
                <div class="likeButton" id="${carte.id_annonce}"><svg viewBox="0 0 512 512"><path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z"/></svg></div>
              </div>

              <div class="d-flex justify-content-between mb-3">
                <a class="nomArticle" href="/product?idProduct=${carte.id_annonce}"> <h5 class="mb-0">${carte.nom_article}</h5> </a>
              
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

  // eslint-disable-next-line no-restricted-syntax
  for (const likeButton of likeButtons) {
    // eslint-disable-next-line no-loop-func
    likeButton.addEventListener('click', async (e) => {
      e.preventDefault();
      const articleId = likeButton.getAttribute('id');
      const local = await JSON.parse(window.localStorage.getItem('member'));
      const idMember = local.id_membre;

      
      request = {
        method: 'POST',
        body: JSON.stringify({
          id_membre: idMember,
          id_article: articleId,
        }),
      };

        // eslint-disable-next-line no-console
        console.log(request.body);

      await fetch(`api/favorites`, request);
    });
  }

  document.querySelector('.likeButton');
};

const HomePage = () => {
  clearPage();
  renderPageTitle('HOMEPAGE');
  HomePageRender();
};

export default HomePage;
