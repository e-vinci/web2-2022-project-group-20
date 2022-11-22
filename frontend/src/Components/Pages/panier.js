import { clearPage, renderPageTitle } from '../../utils/render';

const panier = () => {
    clearPage();
    renderPageTitle("PANIER");
    renderpanier();
    
  };

function renderpanier() {
    const panierpage= `
    <p> zebi <p>
    `;

    const main = document.querySelector('main');
    main.innerHTML = panierpage;
}

export default panier;