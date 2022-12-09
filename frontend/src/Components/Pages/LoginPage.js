import { clearPage, renderPageTitle } from '../../utils/render';
import logo1 from '../../img/log.svg';
import logo2 from '../../img/register.svg';

const loginpage = () => {
  clearPage();
  renderPageTitle('HOMEPAGE');
  loginpagefuntion();
  ad();
};

function loginpagefuntion() {
  const login = `
     
    <div class="container">
      <div class="forms-container">
        <div class="signin-signup">
          <form action="#" class="sign-in-form">
            <h2 class="title">Sign in</h2>
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input type="text" id="emailField" placeholder="E-mail" />
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input type="password" id="passwordField" placeholder="Password" />
            </div>
            <input type="submit" id="loginButton" value="Login" class="btn solid" />
            <div class="social-media">
            <div class="alert" id="alertL" role="alert">
            </div>
            </div>
          </form>
          <form action="#" class="sign-up-form">
            <h2 class="title">Sign up</h2>
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input type="text" id="firstnameFieldR" placeholder="Firstname" />
            </div>
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input type="text" id="lastnameFieldR" placeholder="Firstname" />
            </div>
            <div class="input-field">
              <i class="fas fa-envelope"></i>
              <input type="email" id="emailFieldR" placeholder="Email" />
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input type="password" id="passwordFieldR" placeholder="Password" />
            </div>
            <input type="submit" id="registerButton" class="btn" value="Sign up" />
            <p class="social-text">Or Sign up with social platforms</p>
            <div class="social-media">
              <div class="alert" id="alertR" role="alert">
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>New here ?</h3>
            <p>
              MAKE FREE TO CREATE TODAY YOUR PERSONNEL VINCID ACCOUNT
            </p>
            <button class="btn transparent" id="sign-up-btn">
              Sign up
            </button>
          </div>
          <img src="${logo1}" class="image" alt="" />
        </div>
        <div class="panel right-panel">
          <div class="content">
            <h3>One of us ?</h3>
            <p>
              ALREADY HAVE A VINCID ACCOUNT ? 
              CLICK BELOW TO SIGN IN
            </p>
            <button class="btn transparent" id="sign-in-btn">
              Sign in
            </button>
          </div>
          <img src="${logo2}" class="image" alt="" />
        </div>
      </div>
    </div>
    `;
  const main = document.querySelector('main');
  main.innerHTML = login;
}

function ad() {
  const signInBtn = document.querySelector('#sign-in-btn');
  const signUpBtn = document.querySelector('#sign-up-btn');
  const container = document.querySelector('.container');
  const loginBtn = document.querySelector('#loginButton');
  const registerBtn = document.querySelector('#registerButton')

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
        body: JSON.stringify({
          email: emailField.value,
          password: passwordField.value,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
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
    } catch (err) {
      console.error('LoginPage::error ', err);
    }
  });

  registerBtn.addEventListener('click', async (e) => {
    try {
      e.preventDefault();
      const firstnameField = document.querySelector('#firstnameFieldR');
      const lastnameField = document.querySelector('#lastnameFieldR');
      const emailField = document.querySelector('#emailFieldR');
      const passwordField = document.querySelector('#passwordFieldR');
      const alertDiv = document.querySelector("#alertR");

      if(!passwordField.value || !emailField.value ||
         !firstnameField.value || !lastnameField.value){
        alertDiv.className ="alert alert-danger";
        alertDiv.innerHTML= "Check that you've filled all the necessary informations";
        return;
      }
      
      const request = {
        method: 'POST',
        body: JSON.stringify({
          firstname: firstnameField.value,
          lastname: lastnameField.value,
          email: emailField.value,
          password: passwordField.value,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      };
      const response = await fetch(`api/members/register`, request);

      if(response.status !== 200){
        alertDiv.className ="alert alert-danger";
        alertDiv.innerHTML= 'Utilisateur inconnu';
      }
      if(response.status === 200){
        alertDiv.className ="alert alert-danger";
        alertDiv.innerHTML= 'You are now connected';
      }

      const member = await response.json();
      window.localStorage.setItem('member', JSON.stringify(member));
    } catch (err) {
      /* eslint no-console: ["error", { allow: ["error"] }] */
      console.error('LoginPage::error ', err);
    }
  });
  
  signUpBtn.addEventListener('click', () => {
    container.classList.add('sign-up-mode');
  });

  signInBtn.addEventListener('click', () => {
    container.classList.remove('sign-up-mode');
  });
}

export default loginpage;