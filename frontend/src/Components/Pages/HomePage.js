import { clearPage, renderPageTitle } from '../../utils/render';

const HomePage = () => {
    clearPage();
    renderPageTitle('HOMEPAGE');
    homepage();
  };

  function homepage() {
    const homepageshow = `
    <p> zeb </p>
    `;
    const main = document.querySelector('main');
    main.innerHTML = homepageshow;
  }
const article = {title: 'Article 1', description: 'Description de l\'article 1', price: 10, auteur: 'Auteur 1', imgrender: 'https://picsum.photos/200/300'};

const HomePage = () => {

    const main = document.querySelector('main');
    const html = `

    <div class="container">
        <div class="row">
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card" style="width: 18rem;">

                <a href="" > <img src="${article.imgrender}" class="card-img-top" alt="..." style=" width: 100%; height: 15vw; object-fit: cover;"> </a>

                <div class="card-body">
                  <a href=""> <h5 class="card-title">${article.title}</h5> </a>
                  <p class="card-text">${article.description}</p>
                </div>
                </div>
            </div>

    `;
    main.innerHTML = html;


export default HomePage;