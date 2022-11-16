const tokenUser = localStorage.getItem("user");

if (tokenUser && tokenUser.length > 0) {
  whoIs();
  const logSignIn = document.querySelector("#logSignIn");
  logSignIn.innerHTML = '<a onclick ="logOut()">LogOut</a>';
}
function logOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "http://127.0.0.1:5500/step04/frontend/views/index.html";
}
function checkToken() {
  const locToken = localStorage.getItem("token");
  if (!locToken && window.location.href != "http://127.0.0.1:5500/frontend/index.html") {
    window.location.href = "http://127.0.0.1:5500/frontend/views/index.html";
    console.log("test");
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
        logDiv.innerHTML += `<div>
        <img class="icon" onClick ='formModif()' src="../img/engrenage.png" alt="icon engrenage">
      </div>`;
        const logSignIn = document.querySelector("#logSignIn");
        logSignIn.innerHTML = '<a onclick ="logOut()">Log out</a>';
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
const allUsers = document.querySelector("#allUsers");
const allCompanies = document.querySelector("#allCompanies");
const allAdvertisements = document.querySelector("#allAdvertisements");
const allJobInfos = document.querySelector("#allJobInfos");

const allTables = [allUsers, allCompanies, allAdvertisements, allJobInfos];

const headers = checkToken();

let interrupteurs = {
  interrupteurUsers: false,
  interrupteurCompanies: false,
  interrupteurAdvertisements: false,
  interrupteurJobInfos: false,
};

//  je veux boucler le resultat de ma db

function clear(table) {
  Array.from(allTables).forEach((element) => {
    if (element != table) {
      element.style.display = "none";
    }
  });
}

/////////////////////////////display db user
const theadUsers = document.querySelector("#allUsers>thead>tr");
const tbodyUsers = document.querySelector("#allUsers>tbody");
let currrentPage = 0;

// const test = () => {
//   fetch("http://localhost:3000/api/user", {
//     method: "GET",
//     headers,
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       if (interrupteurs.interrupteurUsers == false) {
//         theadKey(data);
//         console.log(data);
//         let arr = displayUser(data);
//         // prevPage(arr);
//         nextPage(arr);
//       }
//       interrupteurs.interrupteurUsers = true;
//       allUsers.style.display = "block";
//     })
//     .catch((error) => console.log(error));
// };
function user() {
  clear(allUsers);
  // test();
  fetch("http://localhost:3000/api/user", {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((data) => {
      if (interrupteurs.interrupteurUsers == false) {
        theadKey(data);
        // console.log(data);
        let arr = displayUser(data);
        // prevPage(arr);
        // console.log(arr);
        nextPage(arr);
      }
      interrupteurs.interrupteurUsers = true;
      allUsers.style.display = "block";
    })
    .catch((error) => console.log(error));
}

function theadKey(arr) {
  for (const key in arr[0]) {
    if (Object.hasOwnProperty.call(arr[0], key)) {
      switch (key) {
        // case "password":
        //   break;

        default:
          // theadJobInfos.innerHTML += `<th>${key}</th>`;
          theadUsers.innerHTML += `<th>${key}</th>`;
          // theadUsers.style.margin = "5px 10px";
          // theadUsers.style.background = "red";
          break;
      }
      // theadUsers.innerHTML += `<th>test</th>`;
    }
  }
}

/////////////////////////////////////////////////////
function displayUser(arr) {
  const pagination = arr.length / 10;
  let tab = [];
  for (let i = 0; i < Math.ceil(pagination) + 1; i++) {
    // console.log(arr[i]);
    // console.log(i);
    tab.push([]);
    for (let j = 0; j < 10; j++) {
      let z = i * 10 + j;
      if (z < arr.length) {
        tab[i].push(arr[z]);
      }
      // console.log(z);
    }
  }
  // console.log(tab);
  return tab;
}

var positionButton = document.querySelector("#allUsers");
var button = document.createElement("button");
var button1 = document.createElement("button");

function nextPage(arr) {
  // console.log("test nextpage");
  // console.log(arr);
  // let currrentPage = Math.ceil(arr.length) / 10;
  // let nb = Math.ceil(arr.length) / 10;
  if (currrentPage < 0 || currrentPage >= arr.length - 1) {
    currrentPage = 0;
    nextPage(arr);
    // return currentPageCompanie = 0;
    console.log("test");
  } else {
    arr[currrentPage].forEach((element) => {
      const tr = document.createElement("tr");
      tr.id = `tr${element.id}`;
      const form = document.createElement("form");

      tbodyUsers.appendChild(form);
      tbodyUsers.appendChild(tr);
      form.setAttribute("id", `form-${element.id}`);
      for (const key in element) {
        if (Object.hasOwnProperty.call(element, key)) {
          const el = element[key];
          // console.log(el);
          switch (key) {
            // case "password":
            //   break;
            default:
              const td = document.createElement("td");
              tr.appendChild(td);
              td.innerHTML += `<input type="text" class='${key}' form="form-${element.id}" name="" value="${el}">`;
              break;
          }
        }
      }

      tr.innerHTML += `</form>`;
      tr.innerHTML += `<button id="form-${element.id}" onclick=updateUsers(${element.id}) class="update">update</button>`;
      tr.innerHTML += `<button id="form-${element.id}" onclick=deleteUsers(${element.id}) class="delete">delete</button>`;
    });

    var div = document.createElement("div");

    button1.textContent = "Prev";
    div.className = "prevNextButton";
    positionButton.appendChild(div);
    div.appendChild(button1);

    button1.onclick = function () {
      tbodyUsers.innerHTML = "";
      currrentPage--;
      div.remove()
      nextPage(arr);
    };

    button.textContent = "Next";
    div.className = "prevNextButton";
    div.appendChild(button);

    button.onclick = function () {
      tbodyUsers.innerHTML = "";
      currrentPage++;
      div.remove()
      nextPage(arr);
    };
    // div.appendChild(button1);
    // div.appendChild(button);
  }
}

function updateUsers(id) {
  const formTest = document.querySelectorAll(`[form = form-${id}]`);
  const formData = {};
  Array.from(formTest).forEach((element) => {
    formData[element.className] = element.value;
  });
  console.log(formData);
  if (formData['companies_ID'] == 'null') {
    formData['companies_ID'] = null
  }
  fetch(`http://localhost:3000/api/user/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error));
}
function deleteUsers(id) {
  fetch(`http://localhost:3000/api/user/${id}`, {
    method: "DELETE",
    headers,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.getElementById(`tr${id}`).remove();
      // data.forEach((element) => {
      //   element.forEach((el) => {
      //     if (id === el.id) {
      //       data.splice(el);
      // }
      // });
      // });
      // document.location.reload();
      // window.location.reload();
      // return data;
      // data.reload();
      // displayUser();
      // user();
    })
    .catch((error) => console.log(error));
}

////////////////////////////////////////////////////////////////////

///////////////////////display db jobinfo/////////////////

const theadJobInfos = document.querySelector("#allJobInfos>thead>tr");
const tbodyJobInfos = document.querySelector("#allJobInfos>tbody");
let currrentPageJobInfo = 0;

function jobinfo() {
  clear(allJobInfos);
  fetch("http://localhost:3000/api/jobinfo", {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((data) => {
      if (interrupteurs.interrupteurJobInfos == false) {
        // console.log(data);
        theadKey2(data);
        let arr = displayJobInfo(data);
        nextPageJobInfo(arr);
      }
      interrupteurs.interrupteurJobInfos = true;
      allJobInfos.style.display = "block";
    })
    .catch((error) => console.log(error));
}

function theadKey2(arr) {
  for (const key in arr[0]) {
    if (Object.hasOwnProperty.call(arr[0], key)) {
      // console.log(key != "company");
      //
      switch (key) {
        case "company":
          break;
        case "advertisement":
          break;
        case "person":
          break;

        default:
          theadJobInfos.innerHTML += `<th>${key}</th>`;
          break;
      }
    }
  }
}

/////////////////////////////////////////////////////

function displayJobInfo(arr) {
  const pagination2 = arr.length / 10;
  let tab = [];
  for (let i = 0; i < Math.ceil(pagination2) + 1; i++) {
    // console.log(arr[i]);
    // console.log(i);
    tab.push([]);
    for (let j = 0; j < 10; j++) {
      let z = i * 10 + j;
      if (z < arr.length) {
        tab[i].push(arr[z]);
      }
      // console.log(z);
    }
  }

  return tab;
}

var positionButtonJobInfo = document.querySelector("#allJobInfos");
var buttonJobInfo = document.createElement("button");
var buttonJobInfo1 = document.createElement("button");

function nextPageJobInfo(arr) {
  if (currrentPageJobInfo < 0 || currrentPageJobInfo >= arr.length - 1) {
    currrentPageJobInfo = 0;
    nextPageJobInfo(arr);
    // return currentPageCompanie = 0;
    console.log("test");
  } else {
    arr[currrentPageJobInfo].forEach((element) => {
      const tr = document.createElement("tr");
      tr.id = `tr${element.id}`;
      const form = document.createElement("form");

      tbodyJobInfos.appendChild(form);
      tbodyJobInfos.appendChild(tr);
      form.setAttribute("id", `form-${element.id}`);
      for (const key in element) {
        if (Object.hasOwnProperty.call(element, key)) {
          const el = element[key];
          // console.log(key);
          switch (key) {
            case "company":
              break;
            case "advertisement":
              break;
            case "person":
              break;

            default:
              const td = document.createElement("td");
              tr.appendChild(td);
              td.innerHTML += `<input type="text" class='${key}' form="form-${element.id}" name="" value="${el}">`;
              // tr.innerHTML += `<td>${valeur}</td>`;
              break;
          }

          // theadJobInfos.innerHTML += `<td>${el}</td>`;
        }
      }
      tr.innerHTML += `</form>`;
      tr.innerHTML += `<button id="form-${element.id}" onclick=updateJobInfos(${element.id}) class="update">update</button>`;
      tr.innerHTML += `<button id="form-${element.id}" onclick=deleteJobInfos(${element.id}) class="delete">delete</button>`;
    });

    var div = document.createElement("div");

    buttonJobInfo1.textContent = "Prev";
    div.className = "prevNextButton";
    positionButtonJobInfo.appendChild(div);
    div.appendChild(buttonJobInfo1);

    buttonJobInfo.textContent = "Next";
    div.className = "prevNextButton";
    div.appendChild(buttonJobInfo);

    buttonJobInfo.onclick = function () {
      tbodyJobInfos.innerHTML = "";
      currrentPageJobInfo++;
      div.remove()
      nextPageJobInfo(arr);
    };

    buttonJobInfo1.onclick = function () {
      tbodyJobInfos.innerHTML = "";
      currrentPageJobInfo--;
      div.remove()
      nextPageJobInfo(arr);
    };

    // div.appendChild(buttonJobInfo1);
    // div.appendChild(buttonJobInfo);
  }
}
function updateJobInfos(id) {
  console.log("test update");
  const formTest = document.querySelectorAll(`[form = form-${id}]`);
  const formData = {};
  Array.from(formTest).forEach((element) => {
    formData[element.className] = element.value;
    console.log(element.value);
  });
  fetch(`http://localhost:3000/api/jobinfo/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error));
}
function deleteJobInfos(id) {
  fetch(`http://localhost:3000/api/jobinfo/${id}`, {
    method: "DELETE",
    headers,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.getElementById(`tr${id}`).remove();
    })
    .catch((error) => console.log(error));
}

////////////////////////////////////////////////////////////////////

///////////////////////display db companies/////////////////

const theadCompanies = document.querySelector("#allCompanies>thead>tr");
const tbodyCompanies = document.querySelector("#allCompanies>tbody");
let currentPageCompanie = 0;

function companie() {
  clear(allCompanies);
  fetch("http://localhost:3000/api/companies", {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((data) => {
      if (interrupteurs.interrupteurCompanies == false) {
        // console.log(data);
        theadKey3(data);
        let arr = displayCompanie(data);
        nextPageCompanie(arr);
      }
      interrupteurs.interrupteurCompanies = true;
      allCompanies.style.display = "block";
    })
    .catch((error) => console.log(error));
}

function theadKey3(arr) {
  for (const key in arr[0]) {
    if (Object.hasOwnProperty.call(arr[0], key)) {
      console.log(key);
      switch (key) {
        case "company":
          break;
        case "advertisement":
          break;
        case "person":
          break;

        default:
          theadCompanies.innerHTML += `<th>${key}</th>`;
          break;
      }
    }
  }
}

/////////////////////////////////////////////////////

function displayCompanie(arr) {
  const paginationCompanie = arr.length / 10;
  let tab = [];

  for (let i = 0; i < Math.ceil(paginationCompanie) + 1; i++) {
    // console.log(arr[i]);
    // console.log(i);
    tab.push([]);
    for (let j = 0; j < 10; j++) {
      let z = i * 10 + j;
      if (z < arr.length) {
        tab[i].push(arr[z]);
      }
      // console.log(z);
    }
  }

  return tab;
}

var positionButtonCompanie = document.querySelector("#allCompanies");
var buttonCompanie = document.createElement("button");
var buttonCompanie1 = document.createElement("button");

function nextPageCompanie(arr) {
  if (currentPageCompanie < 0 || currentPageCompanie >= arr.length - 1) {
    currentPageCompanie = 0;
    nextPageCompanie(arr);
    // return currentPageCompanie = 0;
    console.log("test");
  } else {
    arr[currentPageCompanie].forEach((element) => {
      // console.log(element.id);
      const tr = document.createElement("tr");
      tr.id = `tr${element.id}`;
      const form = document.createElement("form");

      tbodyCompanies.appendChild(form);
      tbodyCompanies.appendChild(tr);
      form.setAttribute("id", `form-${element.id}`);
      // const tr = document.createElement("tr");
      // tbodyCompanies.appendChild(tr);
      for (const key in element) {
        if (Object.hasOwnProperty.call(element, key)) {
          const el = element[key];
          // console.log(key);
          switch (key) {
            case "company":
              break;
            case "advertisement":
              break;
            case "person":
              break;

            default:
              const td = document.createElement("td");
              tr.appendChild(td);
              td.innerHTML += `<input type="text" class='${key}' form="form-${element.id}" name="" value="${el}">`;
              // tr.innerHTML += `<td>${valeur}</td>`;
              break;
          }
        }
      }
      tr.innerHTML += `<button id="form-${element.id}" onclick=updateCompanies(${element.id}) class="update">update</button>`;
      tr.innerHTML += `<button id="form-${element.id}" onclick=deleteCompanies(${element.id}) class="delete">delete</button>`;
    });

    var div = document.createElement("div");

    buttonCompanie1.textContent = "Prev";
    div.className = "prevNextButton";
    div.appendChild(buttonCompanie1);
    positionButtonCompanie.appendChild(div);

    buttonCompanie.textContent = "Next";
    div.className = "prevNextButton";
    div.appendChild(buttonCompanie);
    buttonCompanie.onclick = function () {
      tbodyCompanies.innerHTML = "";
      currentPageCompanie++;
      div.remove()
      nextPageCompanie(arr);
    };
    buttonCompanie1.onclick = function () {
      tbodyCompanies.innerHTML = "";
      currentPageCompanie--;
      div.remove()
      nextPageCompanie(arr);
    };

    // div.appendChild(buttonCompanie1);
    // div.appendChild(buttonCompanie);
  }
}

function updateCompanies(id) {
  const formTest = document.querySelectorAll(`[form = form-${id}]`);
  const formData = {};
  Array.from(formTest).forEach((element) => {
    formData[element.className] = element.value;
  });
  // console.log(formData);
  fetch(`http://localhost:3000/api/companies/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error));
}
function deleteCompanies(id) {
  fetch(`http://localhost:3000/api/companies/${id}`, {
    method: "DELETE",
    headers,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.getElementById(`tr${id}`).remove();
    })
    .catch((error) => console.log(error));
}

////////////////////////////////////////////////////////////////////

///////////////////////display db advertisements/////////////////

const theadAdvertisements = document.querySelector(
  "#allAdvertisements>thead>tr"
);
const tbodyAdvertisements = document.querySelector("#allAdvertisements>tbody");
let currentPageAnnonce = 0;

function annonce() {
  clear(allAdvertisements);
  fetch("http://localhost:3000/api/Advertissements", {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((data) => {
      if (interrupteurs.interrupteurAdvertisements == false) {
        console.log(data);
        theadKey4(data);
        let arr = displayAdvertisements(data);
        nextPageAnnonce(arr);
      }
      interrupteurs.interrupteurAdvertisements = true;
      allAdvertisements.style.display = "block";
    })
    .catch((error) => console.log(error));
}

function theadKey4(arr) {
  for (const key in arr[0]) {
    if (Object.hasOwnProperty.call(arr[0], key)) {
      switch (key) {
        case "company":
          break;
        case "advertisement":
          break;
        case "person":
          break;

        default:
          theadAdvertisements.innerHTML += `<th>${key}</th>`;
          break;
      }
    }
  }
}

/////////////////////////////////////////////////////

function displayAdvertisements(arr) {
  const paginationAnnonce = arr.length / 10;
  let tab = [];

  for (let i = 0; i < Math.ceil(paginationAnnonce) + 1; i++) {
    // console.log(arr[i]);
    // console.log(i);
    tab.push([]);
    for (let j = 0; j < 10; j++) {
      let z = i * 10 + j;
      if (z < arr.length) {
        tab[i].push(arr[z]);
      }
      // console.log(z);
    }
  }

  return tab;
}

var positionButtonAnnonce = document.querySelector("#allAdvertisements");
var buttonAnnonce1 = document.createElement("button");
var buttonAnnonce = document.createElement("button");

function nextPageAnnonce(arr) {
  if (currentPageAnnonce < 0 || currentPageAnnonce >= arr.length - 1) {
    currentPageAnnonce = 0;
    nextPageAnnonce(arr);
    // return currentPageCompanie = 0;
    console.log("test");
  } else {
    arr[currentPageAnnonce].forEach((element) => {
      // const tr = document.createElement("tr");
      // tbodyAdvertisements.appendChild(tr);

      const tr = document.createElement("tr");
      tr.id = `tr${element.id}`;
      const form = document.createElement("form");

      tbodyAdvertisements.appendChild(form);
      tbodyAdvertisements.appendChild(tr);
      form.setAttribute("id", `form-${element.id}`);
      for (const key in element) {
        if (Object.hasOwnProperty.call(element, key)) {
          const el = element[key];
          // console.log(key);
          switch (key) {
            case "company":
              break;
            case "advertisement":
              break;
            case "person":
              break;
            // case "companies_ID":
            //   break;

            default:
              const td = document.createElement("td");
              tr.appendChild(td);
              td.innerHTML += `<input type="text" class='${key}' form="form-${element.id}" name="" value="${el}">`;

              // tr.innerHTML += `<td>${valeur}</td>`;
              break;
          }
        }
      }
      tr.innerHTML += `<button onclick=updateAdvertisements(${element.id}) class="update">update</button>`;
      tr.innerHTML += `<button onclick=deleteAdvertisements(${element.id}) class="delete">delete</button>`;

      // tr.innerHTML += `<button onclick=updateAdvertisements() class="update">update</button>`;
      // tr.innerHTML += `<button onclick=deleteAdvertisements() class="delete">delete</button>`;
    });

    var div = document.createElement("div");

    buttonAnnonce1.textContent = "Prev";
    div.className = "prevNextButton";
    div.appendChild(buttonAnnonce1);
    positionButtonAnnonce.appendChild(div);

    buttonAnnonce.textContent = "Next";
    div.className = "prevNextButton";
    div.appendChild(buttonAnnonce);

    buttonAnnonce1.onclick = function () {
      tbodyAdvertisements.innerHTML = "";
      currentPageAnnonce--;
      div.remove()
      nextPageAnnonce(arr);
    };

    buttonAnnonce.onclick = function () {
      tbodyAdvertisements.innerHTML = "";
      currentPageAnnonce++;
      div.remove()
      nextPageAnnonce(arr);
    };

    // div.appendChild(buttonAnnonce1);
    // div.appendChild(buttonAnnonce);
  }
}

function updateAdvertisements(id) {
  const formTest = document.querySelectorAll(`[form = form-${id}]`);
  const formData = {};
  Array.from(formTest).forEach((element) => {
    formData[element.className] = element.value;
  });
  console.log(formData);
  fetch(`http://localhost:3000/api/advertissements/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error));
}
function deleteAdvertisements(id) {
  fetch(`http://localhost:3000/api/advertissements/${id}`, {
    method: "DELETE",
    headers,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.getElementById(`tr${id}`).remove();
    })
    .catch((error) => console.log(error));
}
