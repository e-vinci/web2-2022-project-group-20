const AdressPage = ()=>{
    renderAdressPage();

};

function renderAdressPage() {
    const render = `
    <div class="containercontact">
	<h1> Adress </h1> <br>

    <div class="title">
        <h1>Ajout d'une Adresse</h1>
    </div>

    <form action="http://localhost:3000/adresses", method="POST">
        <div class="col mt-5 mb-3">

            <label for="Rue">Rue</label>
            <input type="text" placeholder="Adresse" id="rue" name ="rue">

            <label for="numero">N°</label>
            <input type="text" placeholder="" size="1" id="numero" name ="numero">

            <label for="boite">Boite</label>
            <input type="text" placeholder="" size="1" id="boite" name ="boite">
    
        </div>

        <div class="col mb-3">

            <label for="ville">Ville</label>
            <input type="text" placeholder="Adresse" id="ville" name ="ville">

            <label for="code_postal">Code Postale</label>
            <input type="text" placeholder="" size="3" id="code_postal" name ="code_postal">
    
        </div>

        <div class="col mb-2">

            <label for="pays">Pays</label>
            <input type="text" placeholder="Belgique" id="pays" name ="pays">
            <input type="hidden" id="id_membre" name ="id_membre" value="1">

    </div>  

    <button type="submit" class="btn btn-primary btn-lg">Ajouter </button>

</form>

</div>
</div>

    `;

    const main = document.querySelector("main");
    main.innerHTML = render;

}


export default AdressPage;