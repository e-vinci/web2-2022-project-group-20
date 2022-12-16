import HomePage from '../Pages/HomePage';
import ProductPage from '../Pages/ProductPage';
import ContactPage from '../Pages/ContactPage';
import loginpage from '../Pages/LoginPage';
import panier from '../Pages/panier';
import PageProfile from '../Pages/Profilepage';
import SellPage from '../Pages/SellProductPage';
import WalletPage from '../Pages/WalletPage';
import Itemlikepage from '../Pages/ItemlikePage';
import AdressPage from '../Pages/AdressPage';
import AdminPage from '../Pages/AdminPage';

 
const routes = {
  '/': HomePage,
  '/product': ProductPage,
  '/contact' : ContactPage,
  '/login' : loginpage,
  '/panier' : panier,
  '/profile' : PageProfile,
  '/sell' : SellPage,
  '/wallet' : WalletPage,
  '/myitem' : Itemlikepage,
  '/myadress' : AdressPage,
  '/admin' : AdminPage,
  
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

/* todo : to add 

const Redirect = uri => {
	// use Web History API to add current page URL to the user's navigation history & set right URL in the browser (instead of "#")
	window.history.pushState({}, uri, window.location.origin + uri);
	// render the requested component
	redirection(uri);
};

function redirection(URLPath){
	const parsedURL = URLPath.split('?');
	const uri = parsedURL[0];
	const params = parsedURL[1];
	const componentToRender = routes[uri];
	if (routes[uri]) {
		componentToRender(params);
	} else {
		throw Error("The " + uri + " ressource does not exist");
	}
}

export { Router, Redirect };
*/

