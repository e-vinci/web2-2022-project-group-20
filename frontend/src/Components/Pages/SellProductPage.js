import uploadImage from '../../utils/uploadImage';

const SellProductPage = ()=>{
    renderSellProductPage();
};

function categorieshtml(categories){
    
    let html = "";
    categories.forEach((category)=>{
        html += `<option value="${category.id_categorie}">${category.nom}</option>`;
    });
    return html;
}

async function renderSellProductPage(){
    const categories = await fetch("http://localhost:3000/categories").then((response)=>response.json());
    

    const render = `
    <form action="http://localhost:3000/articles" method="POST">

        <label for="nom">Titre (min 4 chars):</label>
        <input type="text" id="nom" name="nom" required minlength="4" size="30">

        <p><label for="description">Description :</label></p>
        <textarea id="description" name="description" required minlength="4" rows="5" cols="60"></textarea>

        <label for="prix">Prix :</label>
        <input type="text" id="prix" name="prix" required size="5">
        
        <br>

        <label for="category">Choisie une catégorie:</label>
        <select name="category" id="category">
        ${categorieshtml(categories)}
        </select>

        <br>

        <label for="name">Photo :</label>
        <input type="file" id="photo" name="photo" accept="image/*">

        <input type="hidden" id="id_vendeur" name="id_vendeur" value="10" />


        <br>
        <br>
        <button type="submit" class="btn btn-primary btn-lg">En vente !</button>


    </form>
        
          `;
          // <input type="hidden" id="id_vendeur" name="id_vendeur" value="${window.localStorage.getItem("user")}" />

  const main = document.querySelector("main");
  main.innerHTML = render;

  

  const file = document.getElementById("file");
  file.addEventListener("change", (e) => {
    const fileElement = e.target.files[0];
    const url = uploadImage(fileElement);

    file.value = url;
    });

  
    const form = document.querySelector("form");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        // eslint-disable-next-line no-console
        console.log(form);
    });

  main.innerHTML = render;


}

export default SellProductPage;