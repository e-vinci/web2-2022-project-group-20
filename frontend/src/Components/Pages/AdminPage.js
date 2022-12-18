import { clearPage, renderPageTitle } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
// import Navigate from '../Router/Navigate'
// import Navbar from '../Navbar/Navbar';


const renderadmin = async () => {
    const adminpage= `
	<br> <br>
    <section class="h-100 gradient-custom">
	<div class="containerwallet">
	<br>
	<h1> Admin zone </h1>
		<div class="row d-flex justify-content-center my-4">
			<div class="col-md-11" >
			<div class="accordion" id="accordionPanelsStayOpenExample">
			<div class="accordion-item">
			  <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
				<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
				  <strong>Admin members :</strong>
				</button>
			  </h2>
			  <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingTwo">
				<div class="accordion-body" id="adminMembers">
				</div>
			  </div>
			</div><br>
			<div class="accordion-item">
			  <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
				<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
				  <strong>Active members :</strong>
				</button>
			  </h2>
			  <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingTwo">
				<div class="accordion-body" id="activeMembers">
				</div>
			  </div>
			</div><br>
			<div class="accordion-item">
			  <h2 class="accordion-header" id="panelsStayOpen-headingThree">
				<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="true" aria-controls="panelsStayOpen-collapseThree">
				  <strong>Banned members :</strong>
				</button>
			  </h2>
			  <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingThree">
				<div class="accordion-body" id="bannedMembers">
				</div>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	</div>
  </div>
</div>
</section>`;

 //  activeMembers - bannedMembers

    const main = document.querySelector('main');
    main.innerHTML = adminpage;

	
	await addAllMembers();
}
/*
Add all member find of all stats and all role
 */
async function addAllMembers() { // parfois on fais ca en double
	
	
	const adminMembers = document.querySelector("#adminMembers");
	await addAdminMembers(adminMembers);  

	
	const activeMembers = document.querySelector("#activeMembers");
	await addActiveMembers(activeMembers); 

	
	const bannedMembers = document.querySelector("#bannedMembers");
	await addBannedMembers(bannedMembers); 
	
  
}






// Admin zone
/*
Add all members find with a normal status 
 */
async function addAdminMembers(div) {
	const allMembers = await getAllAdminMembers();
	const table = document.createElement("table");
	table.className = "table";

	const body = document.createElement("tbody");	 
	
	const adminMail = await memberInfo();

	allMembers.forEach(item => {
	addAdminMember(item.email, adminMail, body); });
	
	table.appendChild(body);
	div.appendChild(table);
}


/* 
Get in back the members admin
@return all the members find
*/
async function getAllAdminMembers() { 
  const options = {
	  method: "GET",
	  headers: {
		'Content-Type': 'application/json',
	  }
  };


  const response = await fetch("api/members/getAdminMembers", options);
 
  const allMembers = await response.json();
  
  return allMembers;
}


/* 
Add the member with normal status in a tr
@param member : the member
@param id : id of the member
*/
function addAdminMember(member, adminEmail, body) {

  const memberTr = document.createElement("tr");
  const name = document.createElement("td");
  name.style = "width: 20%";
  const nameP = document.createElement("a");
  nameP.className = "nav-link"
  nameP.innerText = member;
  name.appendChild(nameP);


  const ban = document.createElement("td");
  ban.style = "width: 30%";
  const banButton = document.createElement("button");
  banButton.className = "btn btn-outline-danger";
  banButton.innerHTML = "Ban";
  banButton.setAttribute("member", member);
  if(adminEmail === member){
	banButton.disabled = true;
	}
	else {
		banButton.disabled = false;
	}

  
  banButton.addEventListener('click', async (e) => {
	   try {
		e.preventDefault();	
		const request = {
		  method: 'POST',
		  body: JSON.stringify(
			{
			email: member
		  }),
		  headers: {
			'Content-Type': 'application/json',
		  }
		};
			
		const response = await fetch(`api/members/banOne`, request);
		if(response.status !== 200){
		  // todo notification
			  
		}
		if(response.status === 200){
			clearPage();
			Navbar();
			renderadmin();
		  
		}

	   } catch (err) {
		  // todo : to delete
	   }
	});
  
  ban.appendChild(banButton);
  

  
	
// revoke begining	
const revoke = document.createElement("td");
revoke.style = "width: 30%";
const revokeButton = document.createElement("button");
revokeButton.className = "btn btn-outline-danger";
revokeButton.innerHTML = "revoke";

revokeButton.setAttribute("member", member);
if(adminEmail === member){
	revokeButton.disabled = true;
	}
	else {
		revokeButton.disabled = false;
	}


revokeButton.addEventListener('click',async (e) => {
  try {
   e.preventDefault();	
   const request = {
	 method: 'POST',
	 body: JSON.stringify(
	   {
	   email: member
	 }),
	 headers: {
	   'Content-Type': 'application/json',
	 }
   };
	   
   const response = await fetch(`api/members/demoteOne`, request);
   if(response.status !== 200){
	 // todo notification
		 
   }
   if(response.status === 200){
	 // todo : relancer la page
	 clearPage();
	 Navbar();
	 renderadmin();
   }

  } catch (err) {
	 // todo : to delete
  }
});
revoke.appendChild(revokeButton);

// grant end
  memberTr.appendChild(name);
  memberTr.appendChild(revoke);
  memberTr.appendChild(ban);

  body.appendChild(memberTr);

}










// Active zone
/*
Add all members find with a normal status 
 */
async function addActiveMembers(div) {
	  const allMembers = await getAllActiveMembers();
	  const table = document.createElement("table");
	  table.className = "table";
  
	  const body = document.createElement("tbody");	 
	  
	  allMembers.forEach(item => {
	  addActiveMember(item.email, item.id, body); });
	  
	  table.appendChild(body);
	  div.appendChild(table);
  }


  /* 
Get in back the members with a normal status
@return all the members find
 */
async function getAllActiveMembers() { 
	const options = {
		method: "GET",
        headers: {
          'Content-Type': 'application/json',
        }
    };

	const response = await fetch("api/members/getActiveMembers", options);
	
	const allMembers = await response.json();
	
	return allMembers;
  }

  
/* 
Add the member with normal status in a tr
@param member : the member
@param id : id of the member
 */
function addActiveMember(member, id, body) {
	const memberTr = document.createElement("tr");
	const name = document.createElement("td");
	name.style = "width: 20%";
	const nameP = document.createElement("a");
	nameP.className = "nav-link"
	nameP.innerText = member;
	name.appendChild(nameP);
  
  
	const ban = document.createElement("td");
	ban.style = "width: 30%";
	const banButton = document.createElement("button");
	banButton.className = "btn btn-outline-danger";
	banButton.innerHTML = "Ban";
	banButton.setAttribute("member", member);
  
	
	banButton.addEventListener('click', async (e) => {
		 try {
		  e.preventDefault();	
		  const request = {
			method: 'POST',
			body: JSON.stringify(
			  {
			  email: member
			}),
			headers: {
			  'Content-Type': 'application/json',
			}
		  };
		  	
		  const response = await fetch(`api/members/banOne`, request);
	
		  if(response.status !== 200){
			// todo notification
				
		  }
		  if(response.status === 200){
			// todo : relancer la page
			clearPage();
			renderadmin();
		  }

		 } catch (err) {
			// todo : to delete
		 }
	  });
	
	ban.appendChild(banButton);
	

	
// grant begining	
const grant = document.createElement("td");
grant.style = "width: 30%";
const grantButton = document.createElement("button");
grantButton.className = "btn btn-outline-danger";
grantButton.innerHTML = "grant";
grantButton.setAttribute("member", member);


grantButton.addEventListener('click',async (e) => {
	try {
	 e.preventDefault();	
	 const request = {
	   method: 'POST',
	   body: JSON.stringify(
		 {
		 email: member
	   }),
	   headers: {
		 'Content-Type': 'application/json',
	   }
	 };
		 
	 const response = await fetch(`api/members/promoteOne`, request);

	 if(response.status !== 200){
	   // todo notification
		   
	 }
	 if(response.status === 200){
	   // todo : relancer la page
	   clearPage();
		renderadmin();
	 }

	} catch (err) {
	   // todo : to delete
	}
 });
grant.appendChild(grantButton);

// grant end

  
	memberTr.appendChild(name);
	memberTr.appendChild(grant);
	memberTr.appendChild(ban);
  
	body.appendChild(memberTr);
  
  }

  










// Banned zone
/*
Add all members find with a ban status 
 */
async function addBannedMembers(div) { // parfois on arrive 2 fois ici
	
	const allMembers = await getAllBannedMembers();// todo appel deux fois
	const table = document.createElement("table");
	table.className = "table";

	const body = document.createElement("tbody");	 
	
	

	allMembers.forEach(item => {
	addBannedMember(item.email, item.id, body); });
	
	table.appendChild(body);
	div.appendChild(table);
}

  /* 
Get in back the members with a ban status
@return all the members find
 */
async function getAllBannedMembers() {  
	const options = {
		method: "GET",
    };

	
	const response = await fetch("/api/members/getBannedMembers", options);
	const allMembers = await response.json();
	
	return allMembers;
  }


/* 
Add the member with ban status in a tr
@param member : the member
@param id : id of the member
 */
function addBannedMember(member, id, body) {
	const memberTr = document.createElement("tr");
	const name = document.createElement("td");
	name.style = "width: 20%";
	const nameP = document.createElement("a");
	nameP.className = "nav-link"
	nameP.innerText = member;
	name.appendChild(nameP);
  
  
	const unban = document.createElement("td");
	unban.style = "width: 30%";
	const unbanButton = document.createElement("button");
	unbanButton.className = "btn btn-outline-success";
	unbanButton.innerHTML = "Unban";
	unbanButton.setAttribute("member", member);
  
	
	unbanButton.addEventListener('click',async (e) => {
		try {
		 e.preventDefault();	
		 const request = {
		   method: 'POST',
		   body: JSON.stringify(
			 {
			 email: member
		   }),
		   headers: {
			 'Content-Type': 'application/json',
		   }
		 };
			 
		 const response = await fetch(`api/members/unbanOne`, request);
		 
   
		 if(response.status !== 200){
		   // todo notification
			   
		 }
		 if(response.status === 200){
		   // todo : relancer la page
		   clearPage();
			Navbar();
			renderadmin();
		 }

		} catch (err) {
		   // todo : to delete
		}
	 });
	unban.appendChild(unbanButton);
  
	   
	 

	memberTr.appendChild(name);
	memberTr.appendChild(unban);
	body.appendChild(memberTr);
  
  }




  async function memberInfo(){
	// Récupère l'id membre dans l'URL
	let idMember = new URLSearchParams(window.location.search).get("idMembre")
	// Vérifie si y a bien un membre dans l'URL, sinon prend celui en session
	if(!idMember) {
	  const local = await JSON.parse(window.localStorage.getItem("member"));
	  idMember = local.id_membre;
	}
	const request = {
	  method: "GET"
	};
	
	// Récupère le membre en question
	let response = await fetch(`api/members?id=${idMember}`, request);
	response = await response.json();
	const member = response[0];
	return member.email;
  }



/*
Grant an active member to admin only by an admin
@param member : the member to grant
*/
 
// Other
/*
Grant an active member to admin only by an admin
@param member : the member to grant

 
async function grantAdmin(member) {
		try {
		 const request = {
		   method: 'POST',
		   body: JSON.stringify(
			 {
			 email: member
		   }),
		   headers: {
			 'Content-Type': 'application/json',
		   }
		 };
			 
		 const response = await fetch(`api/members/promoteOne`, request);
   
		 if(response.status !== 200){
		   // todo notification
			   
		 }
		 if(response.status === 200){
		   // todo : relancer la page
		   
		 }

		} catch (err) {
		   // todo : to delete
		}
  }
  
/*
Revoke an active member only by an admin
@param member : the member to revoke
 
async function revokeAdmin(member) {
	
	try {
		const request = {
		  method: 'POST',
		  body: JSON.stringify(
			{
			email: member
		  }),
		  headers: {
			'Content-Type': 'application/json',
		  }
		};
			
		const response = await fetch(`api/members/demoteOne`, request);
  
		if(response.status !== 200){
		  // todo notification
			  
		}
		if(response.status === 200){
		  // todo : relancer la page
		  
		}

	   } catch (err) {
		  // todo : to delete
	   }
}

*/
/*
Ban an active user by an admin
*
async function banMember() {
	const member = this.getAttribute("member");
  
  const options = {
		method: "POST", // *GET, POST, PUT, DELETE, etc.
			body: JSON.stringify(
			{
				email: member.email,
			}), // body data type must match "Content-Type" header
			headers: {
				"Content-Type": "application/json",
				},
			};
			
		  const response = await fetch("/api/members/banOne", options);
	  
	  if (!response.ok) {
		if (response.status === 400) {
		  // envoye message
		}
	  }

	  // navial

	  loginBtn.addEventListener('click', async (e) => {
    try {
      e.preventDefault();
      const emailField = document.querySelector('#emailField');
      const passwordField = document.querySelector('#passwordField');
      const alertDiv = document.querySelector("#alertL");

      if(!passwordField.value && !emailField.value){
        alertDiv.className ="alert alert-danger";
        alertDiv.innerHTML= "The e-mail adress & the password can't be empty";
        return;
      }
      if(!emailField.value){
        alertDiv.className ="alert alert-danger";
        alertDiv.innerHTML= "The e-mail adress can't be empty";
        return;
      }
      if(!passwordField.value){
        alertDiv.className ="alert alert-danger";
        alertDiv.innerHTML= "The password can't be empty";
        return;
      }
      
      const request = {
        method: 'POST',
        body: JSON.stringify(
          {
          email: emailField.value,
          password: passwordField.value,
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      };
        
      const response = await fetch(`api/members/login`, request);

      if(response.status !== 200){
        alertDiv.className ="alert alert-danger";
        alertDiv.innerHTML= 'Utilisateur inconnu';
      }
      if(response.status === 200){
        alertDiv.className ="alert alert-success";
        alertDiv.innerHTML= 'You are now connected';
        
      }
      const member = await response.json();
      window.localStorage.setItem('member', JSON.stringify(member));
      Navigate('/');
      Navbar();
    } catch (err) {
    }
  });
  }

  

  
/*
Unban a banned user by an admin

async function unbanMember() {
	const member = this.getAttribute("member");
  
  const options = {
		method: "POST", // *GET, POST, PUT, DELETE, etc.
			body: JSON.stringify(
			{
				email: member.email,
			}), // body data type must match "Content-Type" header
			headers: {
				"Content-Type": "application/json",
				},
			};
			
		  const response = await fetch("/api/members/unbanOne", options);
	  
	  if (!response.ok) {
		if (response.status === 400) {
		  // envoye message
		}
	  }
  }
*/



const PageAdmin = () => {
	clearPage();
	renderPageTitle('adminpage');
	renderadmin();
	};
	
	
	export default PageAdmin;