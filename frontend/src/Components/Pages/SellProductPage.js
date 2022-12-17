// First, you will need to import the `FileSaver.js` library to save the image file on the client-side
// Then, you can use the fetch API to send a request to the Imgur API to upload the image.
const SellProductPage = () => {
  renderSellProductPage();
};

function categorieshtml(categories) {
  let html = '';
  categories.forEach((category) => {
    html += `<option value="${category.id_categorie}">${category.nom}</option>`;
  });
  return html;
}

async function renderSellProductPage() {
  const categories = await fetch('http://localhost:3000/categories').then((response) =>
    response.json(),
  );
  const photoValue = null;

  const render = `
    <form action="http://localhost:3000/articles" method="POST" >
    
        
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
        <input type="file" id="fileInput" name="fileInput" accept="image/*">
        <input type="hidden" id="photo" name="photo" value=""/>


        <input type="hidden" id="id_vendeur" name="id_vendeur" value=${photoValue} />


        <br>
        <br>
        <button type="submit" class="btn btn-primary btn-lg">En vente !</button>

        <img id="image" src="" alt="">
    </form>
   

          `;
  // <input type="hidden" id="id_vendeur" name="id_vendeur" value="${window.localStorage.getItem("user")}" />

  const main = document.querySelector('main');
  main.innerHTML = render;

  const form = document.querySelector('form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const toBase64 = (file) => {
      if (!(file instanceof File)) {
        throw new TypeError('Expected a File object');
      }

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        const blob = new Blob([file], { type: file.type });

        reader.readAsDataURL(blob);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

    const file = document.querySelector('#fileInput');
    let base64 = await toBase64(file.files[0]);
    base64 = base64.replace(/^data:image\/(png|jpg);base64,/, '');

    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Client-ID 1a9bf8ef9195d8c');

    const formdata = new FormData();
    formdata.append('image', base64);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    const request = fetch('https://api.imgur.com/3/image', requestOptions);
    const response = await request;
    // eslint-disable-next-line no-unused-vars
    const json = await response.json();

    form.elements.photo.value = json.data.link;

    form.submit();
  });
}

/* Client ID:
a7f3a8a833acad6
Client secret:
7d34a4d46d2c72ab773e381f98252325cbf32e31
*/

// Get the file input element

export default SellProductPage;
