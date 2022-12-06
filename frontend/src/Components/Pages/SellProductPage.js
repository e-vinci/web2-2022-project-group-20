const SellProductPage = ()=>{
    renderSellProductPage();

};

function renderSellProductPage(){
    const render = `
    <form action="http://localhost:3000/api/product" method="POST" enctype="multipart/form-data">

        <label for="name">Titre (min 4 chars):</label>
        <input type="text" id="name" name="name" required minlength="4" size="30">

        <p><label for="w3review">Description :</label></p>
        <textarea id="description" name="description" required minlength="4" rows="5" cols="60"></textarea>

        <label for="name">Prix :</label>
        <input type="text" id="prix" name="prix" required size="5">
        
        <br>

        <label for="name">Photo :</label>
        <input type="file" id="file" name="image" accept="image/*">

        <input type="hidden" id="id_vendeur" name="id_vendeur" value="${window.localStorage.getItem("user")}" />


        <br>
        <br>
        <button type="submit" class="btn btn-primary btn-lg">En vente !</button>


    </form>
        
          `;

  const main = document.querySelector("main");
  main.innerHTML = render;


  const file = document .getElementById( "file")
  const img = document. getElementById( "img")
  const url=document . getElementById( "url")
  file.addEventListener("change", ev => {
  const formdata = new FormData()
  formdata.append( "image", ev.target.files[0])
    fetch ( "https://api.imgur.com/3/image/" ,{
    method: "post" ,
    headers: {
        Authorization: "Client- ID"}
        ,body: formdata
    }).then(data => data.json()).then(data => {
        img.src=data.data.link
        url.innerText=data.data.link
    })  
})

  main.innerHTML = render;


}

export default SellProductPage;