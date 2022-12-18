

const ContactPage = ()=>{
    rendercontactusPage(); 
    
};



function rendercontactusPage(){
    const render = `

	  <h1> Contact </h1> <br><br><br>
    <form
    <div class="containercontact">
    <div class="contentcontact">
    <form id="contact-form" name="contact-form" action="mail.php" method="POST">
      <div class="left-side">
        <div class="address details">
          <i class="fas fa-map-marker-alt"></i>
          <div class="topic">Address</div>
          <div class="text-one">Pl. de l'Alma 3, 1200 Woluwe-Saint-Lambert</div>
          <div class="text-two">Bruxelles</div>
        </div>
        <div class="phone details">
          <i class="fas fa-phone-alt"></i>
          <div class="topic">Phone</div>
          <div class="text-one">+0098 9893 5647</div>
          <div class="text-two">+0096 3434 5678</div>
        </div>
        <div class="email details">
          <i class="fas fa-envelope"></i>
          <div class="topic">Email</div>
          <div class="text-one">vincid@gmail.com</div>
          <div class="text-two">info.vincid@gmail.com</div>
        </div>
      </div>
      <div class="right-side">
        <div class="topic-text">Send us a message</div>
        <p>If you have any work from me or any types of quries related to our site, you can send a message from here. It's will be pleasure to help you.</p>
      <form action="#">
        <div class="input-box">
          <input type="text" id="name"  placeholder="Enter your name">
        </div>
        <div class="input-box">
          <input type="text" id="email"  placeholder="Enter your email">
        </div>

        <div class="form-group">
        <label for="exampleFormControlTextarea1">YOUR MESSAGE</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
      </div>
      
      </form>
      
      <div class="d-grid gap-2 col-6 mx-auto">
      <button  id="send"  class="btn btn-primary" type"sumbit">SEND MESSAGE</button>
      </div>
    
    </div>
    </div>
  </div>
          `;

  const main = document.querySelector("main");
  main.innerHTML = render;

  
};

// eslint-disable-next-line camelcase



/*
function message(){
  const Name = document.getElementById('name');
  const email = document.getElementById('email');
  const msg = document.getElementById('exampleFormControlTextarea1');
  const success = document.getElementById('success');
  const danger = document.getElementById('danger');
  if(Name.value === '' || email.value === '' || msg.value === ''){
    danger.style.display = 'block';
}
else {
  setTimeout(() => {
      Name.value = '';
      email.value = '';
      msg.value = '';
  }, 2000);
  success.style.display = 'block';
}
setTimeout(() => {
  danger.style.display = 'none';
  success.style.display = 'none';
}, 4000);

}
*/



export default ContactPage;