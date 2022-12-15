
// import {Redirect} from "../Router/Router";
// import Navbar from "../Navbar/Navbar";

// import { loadUser } from "../../utils/loadUser"; 

const walletpage= `

    <section class="h-100 gradient-custom">
	<div class="containerwallet">
		<!--  Money row  -->
		<div class="row d-flex justify-content-center my-4">
			<div class="col-md-7" border+"col-md-8" >
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
							<input class="form-control"  id="money-to-add-input" type="text" placeholder="Montant à ajouter" aria-describedby="basic-addon2">
							<div class="input-group-append">
								<button class="btn btn-outline-secondary" id="add-money-btn" type="button">Ajouter</button>
							</div>
						</div>

						<div class="input-group mb-3">
							<input class="form-control"  id="money-to-remove-input" type="text" placeholder="Montant à retirer" aria-describedby="basic-addon2">
							<div class="input-group-append">
								<button class="btn btn-outline-secondary" id="remove-money-btn" type="button">Retirer</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- end 1st part  -->


		<!-- history -->
		<div class="row d-flex justify-content-center my-4">
			<div class="col-md-7" border+"col-md-8" >
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
	
	<div class="alert" id="message" role="alert">
	</div>
	<!-- end justify  -->
</div>
</section>
    `;

/*
The render function
*/	
 function WalletPage() {
	
	const member = findMember();
	if(member.is_admin === true){

		const main = document.querySelector('main');
		main.innerHTML = walletpage;

		const addMoney  = document.querySelector("#add-money-btn");
		const removeMoney = document.querySelector("#remove-money-btn");


		addMoney.addEventListener("click", addOnClick(member)); // ("click", addOnClick, user);
		removeMoney.addEventListener("click", removeOnClick(member));
	
	} 	
	
}



/*
Find the connected member and retrieve it
*/
async function findMember(){	
    let idMember = new URLSearchParams(window.location.search).get("idMembre")
    // eslint-disable-next-line no-console
    console.log(idMember);
	
    if(!idMember) {
      const local = await JSON.parse(window.localStorage.getItem("member"));
      idMember = local.id_membre;
    }
    const request = {
      method: "GET"
    };
    
    let response = await fetch(`api/members?id=${idMember}`, request);
    response = await response.json();
    const member = response[0];
	return member;
}


async function addOnClick(member) {
	const credits = document.getElementById("Crédits à ajouter").value;
	if (credits === ""){
		errorMessage("Combien de crédits voulez-vous ajouter ?");
		return;
	}

	try {
		const options = {
		method: "PUT", // *GET, POST, PUT, DELETE, etc.
		body: JSON.stringify(
		{
			credits: credits.value,
			email: member.email,
		}), // body data type must match "Content-Type" header
		headers: {
			"Content-Type": "application/json",
		},
		};
		
		const response = await fetch("/api/users/addCredits", options); // fetch return a promise => we wait for the response

		if (!response.ok) {
			if (response.status === 304) errorMessage("Crédits non-ajoutés");
			if (response.status === 420) errorMessage("Paramètres invalides");
			else errorMessage("Erreur lors de l'ajout");
			throw new Error(response.status +  response.statusText
			);
		}
		// const memberUpdate = await response.json(); // json() returns a promise => we wait for the data
		// console.log(memberUpdate);

		await WalletPage();

		notificationMessage("Ajout réussi !");

	} catch (error) {		
		errorMessage("Un probleme est survenu lors de l'ajout");
	}
}



async function removeOnClick(member) {
		const credits = document.getElementById("Crédits à retier").value;
		if (credits === ""){
			errorMessage("Combien de crédits voulez-vous retirer ?");
			return;
		}
		if(member.balance >= credits.value){
			errorMessage("Vous ne pouvez pas retirer cette somme.");
			return;
		}
	
		try {
			const options = {
			method: "PUT", // *GET, POST, PUT, DELETE, etc.
			body: JSON.stringify(
			{
				credits: credits.value,
				email: member.email,
			}), // body data type must match "Content-Type" header
			headers: {
				"Content-Type": "application/json",
			},
			};
			
			const response = await fetch("/api/users/removeCredits", options); // fetch return a promise => we wait for the response
	
			if (!response.ok) {
				if (response.status === 304) errorMessage("Crédits non-retirés");
				if (response.status === 420) errorMessage("Paramètres invalides");
				else errorMessage("Erreur lors du retrait");
				throw new Error(response.status +  response.statusText
				);
			}
			// const memberUpdate = await response.json(); // json() returns a promise => we wait for the data
			// console.log(memberUpdate);
	
			await WalletPage();
	
			notificationMessage("Retrait réussi !");
	
		} catch (error) {		
			errorMessage("Un probleme est survenu lors du retrait");
		}
	}	

function errorMessage(message) {
	const alertDiv = document.getElementById("message");
	
	alertDiv.className ="alert alert-danger";
	alertDiv.innerHTML= message;
	// throw new Error("fetch error");
}
  
function notificationMessage(message){
	const alertDiv = document.getElementById("message");
	
	alertDiv.className ="alert alert-success";
	alertDiv.innerHTML= message;
  }


export default WalletPage;

