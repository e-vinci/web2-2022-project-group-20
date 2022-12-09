/*  Todo delete

.containerwallet{
  width: 100;
  align-items: center;
  position: relative;
  padding-left: 300px;

}

*/

       


import { clearPage, renderPageTitle } from '../../utils/render';

const WalletPage = () => {
    clearPage();
    renderPageTitle("PANIER");
    renderWallet();
    
  };

function renderWallet() {
    const walletpage= `
    <section class="h-100 gradient-custom">
	<div class="containerwallet">
		<!--  Money row  -->
		<div class="row d-flex justify-content-center my-4">
			<div class="col-md-8" border+"col-md-8" >
				<!-- left  -->
				<div class="card mb-4" >
					<div class="card-header py-3">
						<h5 class="mb-0">
							Montant disponible : 
						</h5>
					</div>
					<div class="card-body">
						<div class=" mt-5 mb-4">
              <font size="9">
                240 €
              </font>
						</div><br>
					</div>
				</div>
			</div>
			<div class="col-md-4" border+"col-md-8" >
				<!-- left  -->
				<div class="card mb-4" >
					<div class="card-header py-3">
						<h5 class="mb-0">
							Modification : 
						</h5>
					</div>
					<div class="card-body">
						<div class="input-group mb-3">
							<input type="text" class="form-control" placeholder="Montant à ajouter" aria-describedby="basic-addon2">
							<div class="input-group-append">
								<button class="btn btn-outline-secondary" type="button">Ajouter</button>
							</div>
						</div>
						<div class="input-group mb-3">
							<input type="text" class="form-control" placeholder="Montant à retirer" aria-describedby="basic-addon2">
							<div class="input-group-append">
								<button class="btn btn-outline-secondary" type="button">Retirer</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- end 1st part  -->


		<!-- history -->
		<div class="row d-flex justify-content-center my-4">
			<div class="col-md-8" border+"col-md-8" >
				<!-- left  -->
				<div class="card mb-4" >
					<!-- Trasactions  -->
					<div class="card-header py-3">
						<h5 class="mb-0">
							Transactions précédentes:
						</h5>
					</div>
					<div class="card-body">
						<!-- Type of transaction -->
						<div class="row">
							<div class="col-lg-2 col-md-12 mb-4 mb-lg-0">
								<font size="4">
									<strong>Vente</strong>
								</font><br><br>
							</div>
						</div>
						<div class="row">
							<!-- Sum -->
							<div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
								+ 5 €
							</div>
							<!-- Title of the article -->
							<div class="col-lg- col-md-6 mb-4 mb-lg-0" >
								Nom de l'article : jogging noir
							</div>
						</div>
						<!-- transaction date -->
						<div class="row">
							<p class="transaction_date">
								Le 02-03-22 
							</p>
						</div>
						<hr class="my-12" />
						<!-- Type of transaction -->
						<div class="row">
							<div class="col-lg-2 col-md-12 mb-4 mb-lg-0">
							<font size="4">
								<strong>Vente</strong>
							</font><br><br>
							</div>
						</div>
						<div class="row">
							<!-- Sum -->
							<div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
								+ 14 €
							</div>
							<!-- Title of the article -->
							<div class="col-lg- col-md-6 mb-4 mb-lg-0">
								Nom de l'article : vélo bleu decathlon
							</div>
						</div>
						<!-- transaction date -->
						<div class="row">
							<p class="transaction_date">
								Le 02-03-22 
							</p>
						</div>
						<hr class="my-12" />
						<!-- Type of transaction -->
						<div class="row">
							<div class="col-lg-2 col-md-12 mb-4 mb-lg-0">
							<font size="4">
								<strong>Achat</strong>
							</font><br><br>
							</div>
						</div>
						<div class="row">
							<!-- Sum -->
							<div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
								- 2 €
							</div>
							<!-- Title of the article -->
							<div class="col-lg- col-md-6 mb-4 mb-lg-0">
								Nom de l'article : manteau rouge
							</div>
						</div>
						<!-- transaction date -->
						<div class="row">
							<p class="transaction_date">
								Le 02-03-22 
							</p>
						</div>
					</div>
					<!-- End trasactions  -->
				</div>
			</div>
			<div class="col-md-4" border+"col-md-8" >
				<!-- left  -->
				<div class="card mb-4" >
					<div class="card-header py-3" style="background-color:rgba(241, 248, 232, 0.8);">
						<h5 class="mb-0" >
							Gain du mois : 
						</h5>
					</div>
					<div class="card-body"> + 302 € </div>
          
				</div>
        <div class="card mb-4" >
					<div class="card-header py-3" style="background-color:rgba(250, 228, 234, 0.8);">
						<h5 class="mb-0">
							Dépance du mois : 
						</h5>
					</div>
					<div class="card-body"> - 129 € </div>
          
				</div>
			</div>
		</div>
	</div>
	<!-- end justify  -->
</div>
</section>
    `;

    const main = document.querySelector('main');
    main.innerHTML = walletpage;
}

export default WalletPage;