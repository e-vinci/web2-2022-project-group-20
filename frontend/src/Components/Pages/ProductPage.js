import gameboyimg from '../../img/gameboy.png';

const title = 'Gameboy';
const price = 100;
const description = "Gameboy vendu par un particulier";

const ProductPage = () => {
    const main = document.querySelector('main');

    const html = `
    <div class="container">
    <div class="row">

        
        <div class="col-4">
            <img src="${gameboyimg}" alt="gameboy" class="img-fluid">
        </div>

        



        <div class="col-8" style="background-color: #AADEED;">

            <h1>${title}</h1>
            <button type="button" class="btn btn-primary btn-round mr-md-3 mb-md-0 mb-2" style="float: right;">Default Round</button>
            <h2>${price}€</h2>

    
            <p>${description}</p>

        </div>


    </div>
</div>`;

    main.innerHTML = html;

    
  };
  
  export default ProductPage;
  