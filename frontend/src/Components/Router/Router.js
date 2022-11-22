import HomePage from '../Pages/HomePage';
import ProductPage from '../Pages/ProductPage';
import RegisterPage from '../Pages/RegisterPage';
import ContactPage from '../Pages/ContactPage';
import loginpage from '../Pages/LoginPage';
import panier from '../Pages/panier';

 
const routes = {
  '/': HomePage,
  '/product': ProductPage,
  '/register' : RegisterPage,
  '/contactpage' : ContactPage,
  '/loginpage' : loginpage,
  '/panier' : panier,
};

const Router = () => {
  onFrontendLoad();
  onNavBarClick();
  onHistoryChange();
};

function onNavBarClick() {
  const navItems = document.querySelectorAll('.nav-link');

  navItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const uri = e.target?.dataset?.uri;
      const componentToRender = routes[uri];
      if (!componentToRender) throw Error(`The ${uri} ressource does not exist.`);

      componentToRender();
      window.history.pushState({}, '', uri);
    });
  });
}

function onHistoryChange() {
  window.addEventListener('popstate', () => {
    const uri = window.location.pathname;
    const componentToRender = routes[uri];
    componentToRender();
  });
}

function onFrontendLoad() {
  window.addEventListener('load', () => {
    const uri = window.location.pathname;
    const componentToRender = routes[uri];
    if (!componentToRender) throw Error(`The ${uri} ressource does not exist.`);

    componentToRender();
  });
}

export default Router;
