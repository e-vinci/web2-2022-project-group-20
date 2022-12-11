import { clearPage, renderPageTitle } from '../../utils/render';
// import loadUser from '../../utils/loadUser';

 const img = 'https://picsum.photos/200/300'; 

const HomePageRender = async () => {
    const main = document.querySelector('main');
    // const user = loadUser.loadUser();

    const request = {
      method: "GET"
    };
    let cartes = await fetch(`api/articles/cartes`, request);
    cartes = await cartes.json();
    let html = `
      <section style="background-color: #eee;">
      <div class="containerhomepage py-5">
                    <div class="row">`;
    cartes.forEach( async carte  => {
        html += `
        <div class="col-md-12 col-lg-4 mb-4 mb-lg-0">
          <div class="card cardHomePage">
            
            <img src="${img}"
              class="card-img-top" alt="Laptop" />
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <p class="small"><a href="#!" class="text-muted">${carte.prenom_vendeur} ${carte.nom_vendeur}</a></p>
              </div>

              <div class="d-flex justify-content-between mb-3">
                <a class="nomArticle" href="/product?idProduct=${carte.id_annonce}"> <h5 class="mb-0">${carte.nom_article}</h5> </a>
              
                <h5 class="text-dark mb-0">${carte.prix}€</h5>
              </div>

              <p class="articleDescription">${carte.description}</p>
            </div>
          </div>
        </div>
        `
    });
    
    main.innerHTML = html;
};

const HomePage = () => {
    clearPage();
    renderPageTitle('HOMEPAGE');
    HomePageRender();
  };


export default HomePage;
