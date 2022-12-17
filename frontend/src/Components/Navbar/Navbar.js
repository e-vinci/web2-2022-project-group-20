import Navigate from '../Router/Navigate';
import logo from '../../img/logo.png';

/**
 * Render the Navbar which is styled by using Bootstrap
 * Each item in the Navbar is tightly coupled with the Router configuration :
 * - the URI associated to a page shall be given in the attribute "data-uri" of the Navbar
 * - the router will show the Page associated to this URI when the user click on a nav-link
 */

const Navbar = () => {
  renderNavbar();
  darkmode();
};

async function renderNavbar() {
  let navbarHtml = `
  <nav class = "sidebar close">
    <header>
      <div class ="image-text">
        <span class ="image">
          <img src="${logo}" alt = "logo">
        </span>
        <div class="text logo-text">
          <span class="name">VINCID</span>
          <span class="profession">SELL, BUY EASILY</span>
        </div>
      </div>
      <i class='bx bx-chevron-right toggle'></i>
    </header>
  <div class="menu-bar">
    <div class="menu">
      <li class="search-box">
          <i class='bx bx-search icon'></i>
          <input type="text" placeholder="Search...">
      </li>
      <ul class="menu-links">
        <li class="">
          <a data-uri="/">
            <i class='bx bx-home-alt icon' ></i>
            <span class="text nav-text">Home page</span>
          </a>
        </li>    
        <li class="">
          <a data-uri="contact">
            <i class='bx bx-mail-send icon'></i>
            <span class="text nav-text">Contact</span>
          </a>
        </li>
        
        
  
    
`;
  if (window.localStorage.getItem('member') !== null) {
    navbarHtml += `
      <li class="">
            <a data-uri="sell">
                <i class='bx bx-purchase-tag-alt icon'></i>
                <span class="text nav-text">Sell page</span>
            </a>
        </li>
        
        <li class="">
        <a data-uri="/myitem">
            <i class='bx bx-heart icon' ></i>
            <span class="text nav-text">Items I like</span>
          </a>
        </li>

        <li class="">
          <a data-uri="/wallet">
            <i class='bx bx-wallet icon' ></i>
            <span class="text nav-text">My wallets</span>
          </a>
        </li>
        <li class="">
          <a data-uri="/profile">
            <i class='bx bx-male-female icon'></i>
            <span class="text nav-text">Profile page</span>
          </a>
        </li>
    </ul>
    </div>
    <div class="bottom-content">
  

    <li  >
        <a class="logBtn" data-uri="/login" id="logout">
            <i class='bx bx-log-in icon' ></i>
            <span class="text nav-text">LOG OUT </span>
        </a>
    </li>

    `;  
    const local = await JSON.parse(window.localStorage.getItem('member'));
    const isAdmin = local.is_admin;
    if (isAdmin) {
      navbarHtml += `
        
        <li class="">
          <a data-uri="/admin">
            <i class='bx bx-shield  icon' ></i>
            <span class="text nav-text">Admin</span>
          </a>
        </li>
      `;
    }
  } else{
    navbarHtml += `
    <div class="bottom-content">
    <li >
        <a href="/loginPage"  class="logBtn" id="login">
            <i class='bx bx-log-in icon' ></i>
            <span class="text nav-text">LOG IN </span>
        </a>
    </li>
    </div>
    `;
  }

  navbarHtml += `

     <li class="mode">
        <div class="sun-moon">
            <i class='bx bx-moon icon moon'></i>
            <i class='bx bx-sun icon sun'></i>
        </div>
        <span class="mode-text text">Dark mode</span>
        <div class="toggle-switch">
            <span class="switch"></span>
        </div>
    </li>
</div>
</div>

</nav>
`;

  const navbar = document.querySelector('#navbarWrapper');
  navbar.innerHTML = navbarHtml;

  const navbarElements = navbar.getElementsByTagName('a');
  const navbarElementsArray = Array.from(navbarElements);

  navbarElementsArray.forEach((element) => {
    element.addEventListener('click', async (e) => {
      e.preventDefault();
      const dataUri = element.getAttribute('data-uri');
      // Ce bloc sert a éviter le fait que quand on est déjà sur le profile d'un membre et qu'on veut aller sur le sien rien ne se passe.
      const params = new URLSearchParams(window.location.search);
      if (dataUri === '/profile' && params.get('idMembre')) {
        // Récupère l'id du membre en session
        // const local = await JSON.parse(window.localStorage.getItem("member"));

        // Récupère les parametres en URL
        // const params = new URLSearchParams(window.location.search);

        // Modifie le param idMembre en l'idMembre en session
        // params.delete("idMembre");

        // Créée la nouvelle url
        const newUrl = `${window.location.origin}${window.location.pathname}`;

        // Met à jour la nouvelle URL
        window.history.replaceState({}, '', newUrl);
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      }
      Navigate(dataUri);
    });
  });
  const logBtn = document.querySelector('.logBtn');

  logBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (logBtn.id === 'logout') {
      localStorage.clear();
    }
    Navigate('/login');
    Navbar();
  });
}

/*
Find the connected member and retrieve it
*/
// async function findMember() {
//   const local = await JSON.parse(window.localStorage.getItem('member'));
//   idMember = local.id_membre;
// }

/* function navbarclick(){
  const body = document.querySelector("body");
  const sidebar = body.querySelector(".sidebar");
  const toggle = body.querySelector(".toggle");

  toggle.addEventListener("click", () =>{
    sidebar.classList.toggle("close");
  });
} */

 function darkmode() {
   const body = document.querySelector('body');
   const modeSwitch = body.querySelector('.toggle-switch');
   const modeText = body.querySelector('.mode-text');

   modeSwitch.addEventListener('click', () => {
     body.classList.toggle('dark');
     if (body.classList.contains('dark')) {
      modeText.innerText = 'Light mode';
    } else {
       modeText.innerText = 'Dark mode';
     }
   });
 }

export default Navbar;
