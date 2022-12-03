import { clearPage, renderPageTitle } from '../../utils/render';
// import loadUser from '../../utils/loadUser';

const img = {title: 'Article 1', description: 'Description de l\'article 1', price: 10, auteur: 'Auteur 1', imgrender: 'https://picsum.photos/200/300'};

const HomePageRender = async () => {
    const main = document.querySelector('main');
    // const user = loadUser.loadUser();

    const request = {
      method: "GET"
    };
    let articles = await fetch(`api/articles/`, request);
    articles = await articles.json();
    let html = `<div class="containerhomepage">
                  <div class="row">`;
    articles.forEach(article => {
      html += `<div class="col-12 col-md-6 col-lg-4">
                <div class="card">
                  <a href="" > <img src="${img.imgrender}" class="card-img-top" alt="..." > </a>
                  <div class="card-body">
                    <a href=""> <h5 class="card-title">${article.nom}</h5> </a>
                    <p class="card-text">${article.description}</p>
                  </div>
                </div>
              </div>`
    });
    main.innerHTML = html;
};

const HomePage = () => {
    clearPage();
    renderPageTitle('HOMEPAGE');
    HomePageRender();
  };

export default HomePage;