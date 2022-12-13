const AdressPage = ()=>{
    renderAdressPage();

};

function renderAdressPage() {
    const render = `
    <div class="containercontact">

    <div class="title">
        <h1>Ajout d'une Adresse</h1>
    </div>

    <form action="/action_page.php">
        <div class="col mt-5 mb-3">

            <label for="fname">Adresse</label>
            <input type="text" placeholder="Adresse">

            <label for="fname">N°</label>
            <input type="text" placeholder="" size="1">

            <label for="fname">Boite</label>
            <input type="text" placeholder="" size="1">
    
        </div>

        <div class="col mb-3">

            <label for="fname">Ville</label>
            <input type="text" placeholder="Adresse">

            <label for="fname">Code Postale</label>
            <input type="text" placeholder="" size="3">
    
        </div>

        <div class="col mb-2">

            <label for="fname">Pays</label>
            <input type="text" placeholder="Belgique">

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