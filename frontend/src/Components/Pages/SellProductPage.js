// First, you will need to import the `FileSaver.js` library to save the image file on the client-side
// Then, you can use the fetch API to send a request to the Imgur API to upload the image.
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
    <form action="http://localhost:3000/articles" method="POST" onsubmit="DoSubmit();">
    
        
        <label for="nom">Titre (min 4 chars):</label>
        <input type="text" id="nom" name="nom" required minlength="4" size="30">

        <p><label for="description">Description :</label></p>
        <textarea id="description" name="description" required minlength="4" rows="5" cols="60"></textarea>

        <label for="prix">Prix :</label>
        <input type="text" id="prix" name="prix" required size="5">
        
        <br>

        <label for="category">Choisie une catégorie:</label>
        <select name="id_categorie" id="id_categorie">
        ${categorieshtml(categories)}
        </select>

        <br>

        <label for="name">Photo :</label>
        <input type="file" id="fileInput" name="photo" accept="image/*">

        <input type="hidden" id="id_vendeur" name="id_vendeur" value="10" />

        <br>
        <br>
        <button type="submit" class="btn btn-primary btn-lg">En vente !</button>
    </form>
   

          `;
          // <input type="hidden" id="id_vendeur" name="id_vendeur" value="${window.localStorage.getItem("user")}" />

  const main = document.querySelector("main");
  main.innerHTML = render;

  const form = document.querySelector("form");

form.addEventListener("submit", ()=>{
    const fileInput = document.querySelector("#fileInput")
    const file = fileInput.files[0];

    const formdata = new FormData();
    formdata.append('image', file);
    // eslint-disable-next-line no-console
    console.log(formdata);

    form.photo.value = "afou";

    fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {Authorization: `Client-ID a7f3a8a833acad6`},
        body: formdata
      }).then(response => response.json()).then(responseJson => {
        // eslint-disable-next-line no-unused-vars
        const imageUrl = responseJson.data.link;
        form.photo.value = "afou";

      });
});


  /* Client ID:
a7f3a8a833acad6
Client secret:
7d34a4d46d2c72ab773e381f98252325cbf32e31
*/


  // Get the file input element
  
}

export default SellProductPage;