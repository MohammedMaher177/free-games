"use strict";
// import getData from "./api.js";
let nav = document.getElementById("nav");
let list = Array.from(document.querySelectorAll("nav ul li"));
let anchors = Array.from(document.querySelectorAll("nav ul li a"));

document.addEventListener("scroll", (e) => {
  $(window).scroll(function () {
    let windowScroll = $(window).scrollTop();
    if (windowScroll >= 250) {
      nav.classList.replace("translate-middle-y", "fixed-top");
    } else {
      nav.classList.replace("fixed-top", "translate-middle-y");
    }
  });
});
// let response;
let response = [];
async function getData(code = "mmorpg") {
  $(".loading").fadeIn();
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "07d2c13069msha1c20ec5a6c3e44p12bf70jsnaa00a2de7b2a",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  const api = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=3d.${code}.fantasy.pvp&platform=pc`,
    options
  );
  response = await api.json();

  if (response) {
    $(".loading").fadeOut(1000);
  } else {
    $(".loading").fadeIn(1000);
  }
  displayData(response);
}

getData();
function displayData(response) {
  let cartona = ``;
  for (let i = 0; i < response.length; i++) {
    cartona += `<div class="col-md-3" onclick="showDetails(${i})">
                    <div class="card-group">
                        <div class="card bg-transparent">
                            <img src="${response[i].thumbnail}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <div class="d-flex justify-content-between mb-5">
                                    <h5 class="card-title">${response[i].title}</h5>
                                    <span class="btn btn-primary">FREE</span>
                                </div>
                                <p class="card-text mb-5">${response[i].short_description}</p>
                            </div>
                            <small class="card-footer d-flex justify-content-between">
                                <span class="btn btn-secondary">${response[i].genre}</span>
                                <span class="btn btn-secondary">${response[i].platform}</span>
                            </small>
                        </div>

                    </div>
                </div>`;
  }
  document.getElementById("displayDate").innerHTML = cartona;
}
function showDetails(i) {
  const details = document.getElementById("showDetails");
  console.log(response[i]);

  let cartona = `<i class="fa-solid fa-xmark fs-1 text-white-50 position-absolute end-0 translate-middle-x" onclick="closeWindow()"></i>
                <div class="container p-5">
                    <div class="row">
                        <h1 class="me-auto">Details Game</h1>
                        <div class="col-md-4">
                        
                            <img src="${response[i].thumbnail}" class="w-100" alt="...">
                        </div>
                        <div class="col-md-8">
                            <h2 class="mb-4">Title: <span class="btn btn-primary">${response[i].title}</span></h2>
                            <h6 class="mb-4">Category: <span class="btn btn-primary">${response[i].genre}</span></h6>
                            <h6 class="mb-4">Platform: <span class="btn btn-primary">${response[i].platform}</span></h6>
                            <h6 class="mb-4">Status: <span class="btn btn-primary">Live</span></h6>
                            <p class="mb-4=-">${response[i].short_description}</p>
                                <a target="_blank" href="${response[i].game_url}"><button class="btn btn-outline-warning text-white">Show Game</button></a>
                        </div>
                    </div>
                </div>`;
  details.style.display = "block";
  details.innerHTML = cartona;
}
for (let i = 0; i < list.length; i++) {
  list[i].addEventListener("click", (e) => {
    getData(list[i].getAttribute("data-code"));
    removeActiveClasses();
    anchors[i].classList.add("active");
  });
}

function removeActiveClasses() {
  anchors.map((anchor) => anchor.classList.remove("active"));
}

function closeWindow() {
  const details = document.getElementById("showDetails");
  details.style.display = "none";
}
