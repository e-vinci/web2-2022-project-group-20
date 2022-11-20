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
  const navbarWrapper = document.querySelector('#navbarWrapper');
  const navbar = `
  <nav class = "sidebar">
  <header>
  <div class ="image-text">
  <span class ="image">
  <img src="${logo}" alt = "logo">
  </span>

  <div class = "text header-text">
  <span class="name"> VINCID </span>
  <span class = "profession"> BUY SELL EASILY </span>
    </div>
  </div
  <i class='bx bxs-left-down-arrow-circle toggle' ></i>
  <i class='bx bx-chevron-right toggle'></i>
  
  
  </header>

  <div class="menu-bar">
    <div class ="menu">
    <li class="search-box">
          <i class='bx bx-search-alt icon' ></i>
           <input type="search" placeholder="Search...">
        </li>

      <ul class="menu-links">
        <li class="nav-link">
            <a href="#"> 
              <i class='bx bx-home icon' ></i> 
              <span class="text nav-text">HOMEPAGE</span> 
            </a>
        </li>

        <li class="nav-link">
        <a href="#"> 
          <i class='bx bx-home icon' ></i> 
          <span class="text nav-text">HOMEPAGE</span> 
        </a>
    </li>

    <li class="nav-link">
    <a href="#"> 
      <i class='bx bx-home icon' ></i> 
      <span class="text nav-text">HOMEPAGE</span> 
    </a>
</li>

<li class="nav-link">
<a href="#"> 
  <i class='bx bx-home icon' ></i> 
  <span class="text nav-text">HOMEPAGE</span> 
</a>
</li>

<li class="nav-link">
<a href="#"> 
  <i class='bx bx-home icon' ></i> 
  <span class="text nav-text">HOMEPAGE</span> 
</a>
</li>
        </ul>
    </div>

  <div class="bottom-content">
      <li class="">
        <a href="#"> 
          <i class='bx bx-log-out icon'></i>
          <span class="text nav-text">LOGOUT</span> 
        </a>
      </li>

    <li class="">
      <a href="#"> 
      <i class='bx bx-at icon'></i>
        <span class="text nav-text">about us</span> 
      </a>
    </li>

</div>
  </div>
  </nav>
  `;
  navbarWrapper.innerHTML = navbar;
};

export default Navbar;
