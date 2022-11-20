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

export default HomePage;
