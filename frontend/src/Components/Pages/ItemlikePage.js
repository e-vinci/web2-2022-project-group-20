import { clearPage, renderPageTitle } from '../../utils/render';


const Itemlikepage = () => {
    clearPage();
    renderPageTitle('ITEM PAGE');
    itemlikepagefuntion();
  };

  async function itemlikepagefuntion() {
    const local = await JSON.parse(window.localStorage.getItem("member"));
    // eslint-disable-next-line no-unused-vars
    const idMember = local.id_membre

    const request = {
      method: "GET"
    };
    let response = await fetch(`api/articles/favorite?id=${idMember}`, request);
    response = await response.json();
    // eslint-disable-next-line no-unused-vars
    const items = response;
    // eslint-disable-next-line no-console
    console.log(items);
    let html = `
    <section style="background-color: #eee;">
      <div class="containeritemlike py-5">
        <h1> <i class="far fa-smile-beam fa-spin fa2x"></i> MY WISHLIST<i class="far fa-smile-beam fa-spin fa2x"></i> </h1>`;
    
    items.forEach( article => {
      const date = new Date(article.date_pub); 
      const locale = 'fr-EU'; 
      const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      };

      const formattedDate = date.toLocaleDateString(locale, options);
      // eslint-disable-next-line no-console
      console.log(article);
      
        html += `
        <div class="card-body">
          <div class="row">
            <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
              <div class="bg-image hover-zoom ripple rounded ripple-surface">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(4).webp"
                  class="w-100" />
                <a href="#!">
                  <div class="hover-overlay">
                    <div class="mask" style="background-color: rgba(253, 253, 253, 0.15);"></div>
                  </div>
                </a>
              </div>
            </div>
            <div class="col-md-6 col-lg-6 col-xl-6">
              <h5>${article.nom_article}</h5>
              <div class="d-flex flex-row">
                <div class="text-danger mb-1 me-2">
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                </div>
                <span>289</span>
              </div>
              
              <p class="text-truncate mb-4 mb-md-0">${article.description}</p>
              <hr>
              <div> 
                <p>Seller : ${article.prenom_vendeur} ${article.nom_vendeur}</p>
                <p>Status of the sale : ${article.status}</p>
                <p>Publication date : ${formattedDate}<p>
              </div> 
            </div>
            <div class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
              <div class="d-flex flex-row align-items-center mb-1">
                <h4 class="mb-1 me-1">${article.prix}€</h4>
              </div>
              <h6 class="text-success">Free shipping</h6>
              <div class="d-flex flex-column mt-4">
                <button class="btn btn-primary btn-sm" type="button">Details</button>
                <div class="btn btn-outline-primary btn-sm mt-2" type="button">
                  Remove from wishlist
                </div>
              </div>
            </div>
          </div>
        </div> <hr>`
    });

    html += `
                
                </div>
              <div class="row justify-content-center mb-3">
            <div class="col-md-12 col-xl-10">
          </div>
        </div>
      </div>
    </section>`;
    const main = document.querySelector('main');
    main.innerHTML = html;
  };
  export default Itemlikepage;