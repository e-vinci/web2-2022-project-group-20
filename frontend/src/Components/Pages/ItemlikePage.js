import { clearPage, renderPageTitle } from '../../utils/render';

const Itemlikepage = () => {
  clearPage();
  renderPageTitle('ITEM PAGE');
  itemlikepagefuntion();
};

async function itemlikepagefuntion() {
  const local = await JSON.parse(window.localStorage.getItem('member'));
  // eslint-disable-next-line no-unused-vars
  const idMember = local.id_membre;

  let request = {
    method: 'GET',
  };
  let response = await fetch(`api/articles/favorite?id=${idMember}`, request);
  response = await response.json();

  const items = response;
  let html = `
    <section style="background-color: #eee;">
      <div class="containeritemlike py-5">
        <h1> <i class="far fa-smile-beam fa-spin fa2x"></i> MY WISHLIST<i class="far fa-smile-beam fa-spin fa2x"></i> </h1>`;

  items.forEach((article) => {
    const date = new Date(article.date_pub);
    const locale = 'fr-EU';
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    const formattedDate = date.toLocaleDateString(locale, options);

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
              <h5>ARTICLE : ${article.nom_article}</h5>
              <div class="d-flex flex-row">

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
              <div class="d-flex flex-column mt-4">
                <button class="btn btn-primary btn-sm" type="button">Details</button>
                <div id="${article.id_annonce}" class="removeButton btn btn-outline-primary btn-sm mt-2" type="button">
                  Remove from wishlist
                </div>
              </div>
            </div>
          </div>
        </div> <hr>`;
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

  const container = document.querySelector(".containeritemlike");
  const removeButtons = container.getElementsByClassName("removeButton");

  // eslint-disable-next-line no-restricted-syntax
  for (const removeButton of removeButtons) {
    // eslint-disable-next-line no-loop-func
    removeButton.addEventListener('click', async () => {

      const idAnnonce = removeButton.id;

      request = {
        method: 'POST',
        body: JSON.stringify({
          id_membre:  idMember ,
          id_article: idAnnonce,
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      };
      await fetch(`api/favorites`, request);
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    });
  }

}
export default Itemlikepage;
