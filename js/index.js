let nav = document.getElementById("nav");

$(window).scroll(function () {
  let windowScroll = $(window).scrollTop();
  if (windowScroll >= 250) {
    nav.classList.replace("translate-middle-y", "fixed-top");
  } else {
    nav.classList.replace("fixed-top", "translate-middle-y");
  }
});

async function getData() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "07d2c13069msha1c20ec5a6c3e44p12bf70jsnaa00a2de7b2a",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  fetch(
    "https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=3d.mmorpg.fantasy.pvp&platform=pc",
    options
  )
    .then((response) => response.json())
    .then((response) => displayData(response))
    .catch((err) => console.error(err));
}
getData();

function displayData(response) {
  let cartona = ``;
  for (let i = 0; i < response.length; i++) {
    cartona += `<div class="col-md-4">
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
  console.log(response);
}
