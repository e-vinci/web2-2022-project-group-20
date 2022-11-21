

const ContactPage = ()=>{
    rendercontactusPage();

};

function rendercontactusPage(){
    const render = `
    <div class="container">
    <div class="title"> CONTACT US</div>
    <div class="content">
      <form action="#">
        <div class="user-details">
          <div class="input-box">
            <span class="details">Full Name</span>
            <input type="text" placeholder="Enter your name" required>
          </div>
          
          <div class="input-box">
            <span class="details">Email</span>
            <input type="text" placeholder="Enter your email" required>
          </div>
          

          <label for="freeform">YOUR QUESTION :</label>
<br>

<textarea id="freeform" name="freeform" rows="4" cols="50">
Enter text here...
</textarea>
          <div class="button">
          <input type="submit" value="SEND MESSAGE">
        </div>
        </form>
        </div>
        </div>
          `;

  const main = document.querySelector("main");
  main.innerHTML = render;

}

export default ContactPage;