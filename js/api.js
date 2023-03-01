async function getData(code = "mmorpg") {
  $(document).ready(function () {
    $(".loading").fadeIn();
  });
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
  const response = await api.json();
  $(document).ready(function () {
    $(".loading").fadeOut(1000);
  });
  //   displayData(response);
  return response;
}

export default getData();