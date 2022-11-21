// eslint-disable-next-line no-unused-vars
import { Navbar as BootstrapNavbar } from 'bootstrap';
import 'boxicons';
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



function renderNavbar() {
  const anonymousUserNavbar= `
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
        <li class="nav-link">
            <a href="#">
                <i class='bx bx-home-alt icon' ></i>
                <span class="text nav-text">Dashboard</span>
            </a>
        </li>

        <li class="nav-link">
            <a href="#">
                <i class='bx bx-bar-chart-alt-2 icon' ></i>
                <span class="text nav-text">PRODUCTS</span>
            </a>
        </li>

    
        <li class="nav-link">
            <a href="#">
                <i class='bx bx-heart icon' ></i>
                <span class="text nav-text">Likes ITEMS</span>
            </a>
        </li>

        <li class="nav-link">
            <a href="#">
                <i class='bx bx-wallet icon' ></i>
                <span class="text nav-text">Wallet</span>
            </a>
        </li>

        <li class="nav-link">
            <a href="/contactpage">
                <i class='bx bx-mail-send icon'></i>
                <span class="text nav-text">CONTACT US </span>
            </a>
        </li>

    </ul>
</div>

<div class="bottom-content">
    <li class="">
        <a href="/register">
            <i class='bx bx-log-in icon' ></i>
            <span class="text nav-text">LOG IN </span>
        </a>
    </li>

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

</nav>`;


  const navbar = document.querySelector('#navbarWrapper')
  navbar.innerHTML = anonymousUserNavbar;
};

 /* function navbarclick(){
  const body = document.querySelector("body");
  const sidebar = body.querySelector(".sidebar");
  const toggle = body.querySelector(".toggle");

  toggle.addEventListener("click", () =>{
    sidebar.classList.toggle("close");
  });
} */


function darkmode(){
  const body = document.querySelector('body');
  const modeSwitch = body.querySelector(".toggle-switch");
  const modeText = body.querySelector(".mode-text");

  modeSwitch.addEventListener("click" , () =>{
    body.classList.toggle("dark");
    if(body.classList.contains("dark")){
      modeText.innerText = "Light mode";
  }else{
      modeText.innerText = "Dark mode";
      
  }

  });
    



}
export default Navbar;
