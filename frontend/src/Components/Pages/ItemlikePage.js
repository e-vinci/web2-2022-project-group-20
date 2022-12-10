import { clearPage, renderPageTitle } from '../../utils/render';


const Itemlikepage = () => {
    clearPage();
    renderPageTitle('ITEM PAGE');
    itemlikepagefuntion();

    
  };

  function itemlikepagefuntion() {
    const likeitem = `
    <p> zbi </p>
    `;
    const main = document.querySelector('main');
    main.innerHTML = likeitem;
  };
  export default Itemlikepage;