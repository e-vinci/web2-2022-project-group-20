const AdressPage = ()=>{
    renderAdressPage();

};

function renderAdressPage() {
    const render = `
    <div class="wrapper mx-auto">
    <div class="contentcontact">

        <div class="right-side">    
            <div class="topic-text">Ajouter une adresse</div>
            <p>Si vous avez une nouvelle adresse, vous pouvez l'ajouter ici.</p>
            <form action="#">

                <div class="input-box">
                    <input type="text" placeholder="Entrez votre adresse" >
                </div>

                <div class="input-box">
                    <input type="text" placeholder="Entrez Le Numero" >
                </div>

                <div class="input-box">
                <input type="text" placeholder="Entrez Le Numero">
                </div>

                <div class="input-box">
                    <input type="text" placeholder="Entrez votre ville">
                </div>
                
                <div class="input-box">
                    <input type="text" placeholder="Entrez votre code postal">
                </div>

                <div class="input-box"> 
                    <input type="text" placeholder="Entrez votre pays">
                </div>


                <div class="button">
                    <input type="button" value="Ajouter" >
                </div>

            </form>
        </div>
    </div>
</div>
    `;

    const main = document.querySelector("main");
    main.innerHTML = render;

}


export default AdressPage;