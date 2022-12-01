const Error =() =>{
    renderTitleAndWrapper();

};

function renderTitleAndWrapper() {
let x = 0;

 const main = document.querySelector('main');
    main.innerHTML =`
  <div class="error">
    404 Error
    </div>
  `;

const error = document.querySelector('.error');

error.addEventListener('click', () => {
    x+=1;
    if(x === 10){
        main.innerHTML =`
        <div class="error">
            <img src="https://i.pinimg.com/736x/ad/18/84/ad1884f936293565f478f0b94f1abf9e--otaku-anime-manga-anime.jpg" alt="error">
        </div>
        `;
    }
  });
}
  export default Error;