import { clearPage, renderPageTitle } from '../../utils/render';
// import loadUser from '../../utils/loadUser';

 const img = 'https://picsum.photos/200/300'; 

const HomePageRender = async () => {
    const main = document.querySelector('main');
    // const user = loadUser.loadUser();

    const request = {
      method: "GET"
    };
    let articles = await fetch(`api/articles/`, request);
    articles = await articles.json();
    let html = `
    <section style="background-color: #eee;">
    <div class="containerhomepage py-5">
                  <div class="row">`;
    articles.forEach( article  => {
      html += `
      <div class="col-md-12 col-lg-4 mb-4 mb-lg-0">
        <div class="card">
          <div class="d-flex justify-content-between p-3">
            <p class="lead mb-0">Today's Combo Offer</p>
            <div
              class="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
              style="width: 35px; height: 35px;">
              <p class="text-white mb-0 small">x4</p>
            </div>
          </div>
          <img src="${img}"
            class="card-img-top" alt="Laptop" />
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <p class="small"><a href="#!" class="text-muted">${article.category}</a></p>
              <p class="small text-danger"><s>$1099</s></p>
            </div>

            <div class="d-flex justify-content-between mb-3">
            <a href=""> <h5 class="mb-0">${article.nom}</h5> </a>
             
              <h5 class="text-dark mb-0">${article.price}</h5>
            </div>

            <div class="d-flex justify-content-between mb-2">
              <p class="text-muted mb-0">Available: <span class="fw-bold">6</span></p>
              <div class="ms-auto text-warning">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      `
    });

    /* <div class="col-12 col-md-6 col-lg-4">
    <div class="cardHomePageHomePage">
      <a href="" > <img src="${img}" class="card-img-top" alt="..." > </a>
      <div class="card-body">
        <a href=""> <h5 class="card-title">${article.nom}</h5> </a>
        <p class="card-text">${article.description}</p>
      </div>
    </div>
  </div>` */

    main.innerHTML = html;
};





const HomePage = () => {
    clearPage();
    renderPageTitle('HOMEPAGE');
    HomePageRender();
  };

export default HomePage;
