const Header =() =>{
    renderTitleAndWrapper();

};

function renderTitleAndWrapper() {
 const header = document.querySelector('header');
    header.innerHTML =`
  <div id="navbarWrapper"> 
  </div>
  `;

  }

  export default Header;