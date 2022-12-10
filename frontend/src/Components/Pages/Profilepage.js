import { clearPage, renderPageTitle } from '../../utils/render';
import gameboyimg from '../../img/gameboy.png';



  const renderpanier = async () => {
    const request = {
      method: "GET"
    };
    let information = await fetch(`api/profil/`, request);
    information = await information.json();
    const profilepage= `
    <section style="background-color: #eee;">
    <div class="containerpanier">
      <div class="row">
        <div class="col-lg-4">
          <div class="card mb-4">
            <div class="card-body text-center">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                class="rounded-circle img-fluid" style="width: 150px;">
              <h5 class="my-3" >${information.nom}</h5>
              <p class="text-muted mb-1">STUDENT</p>
              <p class="text-muted mb-4">BRUXELLES</p>

            </div>
          </div>
          <div class="card mb-4 mb-lg-0">
            <div class="card-body p-0">
              <ul class="list-group list-group-flush rounded-3">
                <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                  <i class="fas fa-globe fa-lg text-warning"></i>
                  <p class="mb-0">https://mdbootstrap.com</p>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                  <i class="fab fa-github fa-lg" style="color: #333333;"></i>
                  <p class="mb-0">mdbootstrap</p>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                  <i class="fab fa-twitter fa-lg" style="color: #55acee;"></i>
                  <p class="mb-0">@mdbootstrap</p>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                  <i class="fab fa-instagram fa-lg" style="color: #ac2bac;"></i>
                  <p class="mb-0">mdbootstrap</p>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                  <i class="fab fa-facebook-f fa-lg" style="color: #3b5998;"></i>
                  <p class="mb-0">mdbootstrap</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="card mb-4">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Full Name</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">MUHAMMAD HAZIQ</p>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Email</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">${information.mail}</p>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Phone</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0"></p>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Mobile</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0"></p>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Address</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0"></p>
                </div>
              </div>
            </div>
          </div>

          

            <div class="row">
            <div class="col-md-6">
              <div class="card mb-4 mb-md-0">
                <div class="card-body">
                  <p class="mb-4"><span class="text-primary font-italic me-1"></span> PUBLICATION
                  </p>
                  <div class="progress rounded mb-2" style="height: 5px;">
                  </div>
                  <img src="${gameboyimg}" id="id_img" class="d-block w-100" alt="...">
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="card mb-4 mb-md-0">
                <div class="card-body">
                  <p class="mb-4"><span class="text-primary font-italic me-1"></span> PUBLICATION
                  </p>
                  <div class="progress rounded mb-2" style="height: 5px;">
                </div>
                <img src="${gameboyimg}" class="image" alt="" />
              </div>
            </div>
          </div>

          <div class="col-md-6">
              <div class="card mb-4 mb-md-0">
                <div class="card-body">
                  <p class="mb-4"><span class="text-primary font-italic me-1"></span> PUBLICATION
                  </p>
                  <div class="progress rounded mb-2" style="height: 5px;">
                </div>
                <img src="${gameboyimg}" class="image" alt="" />
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  </section>
    `;

    const main = document.querySelector('main');
    main.innerHTML = profilepage;
}

const PageProfile = () => {
  clearPage();
  renderPageTitle('HOMEPAGE');
  renderpanier();
};
export default PageProfile;