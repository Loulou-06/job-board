/////////////////////////VARIABLE GLOBAL//////////////////
let allForm = document.querySelectorAll("form");
allForm.forEach((element) => {
  meavillaSpecialVerifForm(element);
});
/////////////////////////FUNCTION GLOBAL//////////////////
function formDataToObject(formNode) {
  const test = new FormData(formNode);
  let myformData = {};
  let keys = [];
  let values = [];
  for (const value of test.values()) {
    values.push(value);
  }
  for (const key of test.keys()) {
    keys.push(key);
  }
  console.log(values);
  console.log(keys);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = values[i];
    myformData[key] = value;
  }
  return myformData;
}
////////////////////DOM NODE & ELEMENTS///////////////////
const aside = document.querySelector("aside");
const applyForm = document.querySelector("#applyForm");
const section = document.querySelector(".annoncesContainer");

////////////////////AFFICHAGE ANNONCES////////////////////
function displayAdvertisement() {
  fetch("http://localhost:3000/api/advertissements")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.forEach((element) => {
        const article = `<article class="annonce container">
           <div class="headAnnonce">
             <h2 >
               <u>${element.jobName}</u>
             </h2>
             <h4>
               ${element.company.name}
             </h4>
           </div>
             <p class="descriptionAnnonce">
                ${element.description}
             </p>
             <div class="btnContainer">
               <button class="btnMoreInfo" onClick="learnMore(${element.id})">Learn more</button>
             </div>
       </article>`;
        section.innerHTML += article;
      });
    })
    .catch((error) => console.log(error));
}
if (document.title == "Projet Loic Dimitri") {
  displayAdvertisement();
}
////////////////////AFFICHAGE ANNONCE COMPLETE/////////////////
function learnMore(id) {
  aside.style.visibility = "visible";
  aside.style.opacity = 1;
  aside.classList.add("active");
  fetch(`http://localhost:3000/api/advertissements/${id}`)
    .then((response) => response.json())
    .then((data) => {
      const allSkill = data.skill.skill;
      const content = `<div id="headGlobalAnnonce">
                <p class="closeModal"  onClick="closeModal()">x</p>
                <h2>${data.jobName}</h2>
                <h4>${data.company.name}</h4>
                <h5>${data.company.adress}</h5>
                <h5>${data.typeContract}</h5>
              </div>
              <div class="descriptionGlobalAnnonce">
                <h4><u>Description du poste</u></h4>
                <p>${data.description}</p>
                  <h4><u>Skill</u></h4>
                  <ul id='listOfSkill'>
                  </ul>
                  <div class="btnContainer">
                            <button class="btnMoreInfo" onClick = "applyModale(${data.id})">Apply</button>
                          </div>
                </div>`;
      aside.innerHTML = content;
      allSkill.forEach((element) => {
        const ul = document.querySelector("#listOfSkill");
        const li = document.createElement("li");
        ul.appendChild(li);
        li.textContent = element;
      });
    })
    .catch((error) => console.log(error));
}
function closeModal() {
  aside.style.opacity = 0;
  aside.classList.remove("active");
}
////////////////////MODALE POUR POSTULER/////////////////////////////
function applyModale(id) {
  const modalForm = document.querySelector("#modalApply");
  modalForm.style.display = "flex";
  // const form = document.querySelector('#applyForm')
  recapAnnonce(id);
  preremplirForm()
}
///CLOSE MODALE///
if (document.title == "Projet Loic Dimitri") {
  document.querySelector("#closeModalApply").addEventListener("click", () => {
    const modalForm = document.querySelector("#modalApply");
    modalForm.style.display = "none";
  });
}

////////////////////////////CREATION USER AND COMPANY////////////////////////////
function createOneUser(formNode) {
  const myformData = formDataToObject(formNode);
  console.log(myformData);
  fetch("http://localhost:3000/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(myformData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (
        roleInscription.selectedIndex == 1 &&
        roleInscription != null &&
        roleInscription != undefined
      ) {
        const formdataPerso2 = {
          people_ID: data.response.id,
          name: myformData.CompanieName,
          adress: myformData.CompanieAdress,
        };
        console.log(formdataPerso2);
        fetch("http://localhost:3000/api/companies", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formdataPerso2),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => console.log(error));

      }
      login(formNode);
    })
    .catch((error) => console.log(error));
}

if (document.title == "connection") {
  const inscriptionForm = document.querySelector("#inscription");
  inscriptionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    createOneUser(inscriptionForm);
  });
}
/////////////////////////////////////JOBINFO POSTULER////////////////////////////////////////

function recapAnnonce(id) {
  DomCurrent = document.querySelector("#recapAnnonce");
  DomCurrent.style.visibility = "visible";
  DomCurrent.style.opacity = 1;
  fetch(`http://localhost:3000/api/advertissements/${id}`)
    .then((response) => response.json())
    .then((data) => {
      const content = `<div id="headGlobalAnnonce">
                <h2>${data.jobName}</h2>
                <h4>${data.company.name}</h4>
                <h5>${data.company.adress}</h5>
                <h5>${data.typeContract}</h5>
              </div>
              <div class="descriptionGlobalAnnonce">
                <h4><u>Description du poste</u></h4>
                <p>${data.description}</p>
                </div>`;
      DomCurrent.innerHTML = content;
      DomCurrent.dataset.id = data.id;
      DomCurrent.dataset.companies_ID = data.companies_ID;
    })
    .catch((error) => console.log(error));
}

function createOneJobInfo(advertisement_ID, companies_ID) {
  const myData = formDataToObject(applyForm);
  const jobInfo = {
    people_ID: 0,
    advertisements_ID: parseInt(advertisement_ID),
    companies_ID: parseInt(companies_ID),
    message: myData.message,
  };
  if (!localStorage.getItem("token")) {
    console.log(myData);
    fetch("http://localhost:3000/api/user", {
      method: "POST",
      body: JSON.stringify(myData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        jobInfo.people_ID = data.response.id;
        console.log(jobInfo);
        fetch("http://localhost:3000/api/jobInfo", {
          method: "POST",
          body: JSON.stringify(jobInfo),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => console.log(data))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  } else {
    const { userId } = JSON.parse(localStorage.getItem("token"));
    jobInfo.people_ID = userId;
    console.log(jobInfo);
    fetch("http://localhost:3000/api/jobInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobInfo),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }
}
if (document.title == "Projet Loic Dimitri") {
  applyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const getAnnonID = document.querySelector("#recapAnnonce").dataset.id;
    const getComID =
      document.querySelector("#recapAnnonce").dataset.companies_ID;

    console.log(getAnnonID);
    createOneJobInfo(getAnnonID, getComID);
    const modalForm = document.querySelector("#modalApply");
    modalForm.style.display = "none";
  });
}

//////////////////////////////LOGIN////////////////////////////////////////

function login(loginForm) {
  const myData = formDataToObject(loginForm);
  console.log(myData);
  fetch("http://localhost:3000/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(myData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (!data.error) {
        console.log(data);
        localStorage.setItem("token", JSON.stringify(data));
        window.location.href = "http://127.0.0.1:5500/step04/frontend/views/index.html";
      } else {
        const userDiv = document.querySelector("#user");
        userDiv.innerHTML = `<p style = 'color : red'>Mot de passe ou email incorrect</p>`;
      }
    })
    .catch((error) => console.log(error));
}

if (document.title == "connection") {
  const loginForm = document.querySelector("#loginForm");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    login(loginForm);
  });
}
/////////////////////////SESSION///////////////////////////////
function checkToken() {
  const locToken = localStorage.getItem("token");
  if (
    !locToken &&
    window.location.href != "http://127.0.0.1:5500/step04/frontend/views/index.html"
  ) {
    window.location.replace =
      "http://127.0.0.1:5500/step04/frontend/views/index.html";
  }
  const { token } = JSON.parse(locToken);
  console.log(token);
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Content-Type", "application/json");
  return headers;
}

function whoIs() {
  const locToken = localStorage.getItem("token");
  if (locToken) {
    const headers = new Headers();

    const { userId } = JSON.parse(locToken);
    const { token } = JSON.parse(locToken);
    headers.append("Authorization", `Bearer ${token}`);
    headers.append("Content-Type", "application/json");
    fetch(`http://localhost:3000/api/user/${userId}`, {
      method: "GET",
      headers,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data));
        const user = JSON.parse(localStorage.getItem("user"));
        const userDiv = document.querySelector("#user");
        const logDiv = document.querySelector("#logSignIn");
        const linkDiv = document.querySelector("#link");
        logDiv.innerHTML += ``;
        const logSignIn = document.querySelector("#logSignIn");
        logSignIn.innerHTML = `<div>
        <img class="icon" onClick ='formModif()' src="../img/engrenage.png" alt="icon engrenage">
      </div> <a onclick ="logOut()">Log out</a>`;
        userDiv.innerHTML += `<h4>${user.firstName}</h4> <h4>${user.lastName}</h4>`;

        if (user.role == 1) {
          linkDiv.innerHTML += `<a href= "./company.html" >My company</a>`;
        }
        if (user.role == 2) {
          // userDiv.innerHTML += `<a href="./admin.html">Admin</a>`;
          linkDiv.innerHTML += `<a href="./admin.html">Admin</a>`;
        }
      })
      .catch((error) => console.log(error));
  }
}
function getAllUser() {
  const headers = checkToken();
  fetch("http://localhost:3000/api/user/", {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error));
}

//// PREREMPLIS LE FORMULAIRE ////
let countClickForm = 0;
function preremplirForm() {
  if (countClickForm == 0) {
    if (document.title == "Projet Loic Dimitri") {
      if (localStorage.getItem("token")) {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          const firstNameInscription = document.querySelector(
            "#firstNameInscription"
          );
          firstNameInscription.value = user.firstName;
          const lastNameInscription = document.querySelector(
            "#lastNameInscription"
          );
          lastNameInscription.value = user.lastName;
          const emailInscription = document.querySelector("#emailInscription");
          emailInscription.value = user.mail;
          const telInscription = document.querySelector("#telInscription");
          telInscription.value = '0' + user.tel;
          const passwordInscription = document.querySelector(
            "#passwordInscription"
          );
          passwordInscription.value = "Décode ça pour voir";
          document.querySelector('#roleInscription').style.display = 'none'
          // console.log(document.querySelector('#roleInscription').previousSibling.style.display = 'none');
          document.querySelector('#roleInscription').previousElementSibling.style.display = 'none'
          const allInput = Array.from([
            firstNameInscription,
            lastNameInscription,
            emailInscription,
            telInscription,
            passwordInscription,
          ]);
          for (let i = 0; i < allInput.length; i++) {
            const element = allInput[i];
            element.setAttribute("readonly", true);
          }
        }
      }
    }
  } countClickForm++
}
window.addEventListener("load", whoIs());
////////DECONNECTION///////
function logOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "http://127.0.0.1:5500/step04/frontend/views/index.html";
}


function formModif() {
  const user = JSON.parse(localStorage.getItem("user"));
  const bgModal = document.querySelector('#bgModal')
  bgModal.style.display = 'flex'
  bgModal.innerHTML = `<form class="connection container" id="updateUser">
  <span>
      <label for="firstNameInscription"> Firstname : </label>
      <input type="text" name="firstName" id="firstNameInscription" value='${user.firstName}' required>
  </span>
  <span>
      <label for="lastNameInscription"> Lastname : </label>
      <input type="text" name="lastName" id="lastNameInscription" value='${user.lastName}' required>
  </span>
  <span>
      <label for="emailInscription">Email : </label>
      <input type="email" name="mail" id="emailInscription" value='${user.mail} 'required>
  </span>
  <span>
      <label for="passwordInscription">Password : </label>
      <input type="password" name="password" id="passwordInscription" required>
  </span>
  <span>
      <label for="telInscription">Phone : </label>
      <input type="tel" name="tel" id="telInscription" value='0${user.tel}' required>
  </span>
  <input type="submit" value="Update" onClick = updateOneUser()>
</form>`
  bgModal.addEventListener('click', (e) => {
    if (e.target == bgModal && e.target != document.querySelector('#updateUser'))
      bgModal.style.display = 'none'
  })
}
function updateOneUser() {
  const headers = checkToken()
  let formNode = document.querySelector('#updateUser')
  formNode.addEventListener('submit', (e) => {
    e.preventDefault()
    const myformData = formDataToObject(formNode);
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(myformData);
    let id = user.id
    fetch(`http://localhost:3000/api/user/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(myformData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const bgModal = document.querySelector('#bgModal')
        bgModal.style.display = 'none'
      })
      .catch((error) => console.log(error));
  })

}
