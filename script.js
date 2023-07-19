const container = document.createElement("div");
container.className = "container";

const heading = document.createElement("h1");
heading.setAttribute("id", "title");
heading.setAttribute("class", "text-center");
heading.innerText = "Rest Countries Weather Reports!";

const row = document.createElement("div");
row.setAttribute("class", "row");

document.body.append(container);
container.append(heading, row);

async function getCountries() {
  try {
    let restCountries = await fetch("https://restcountries.com/v3.1/all");
    let countryData = await restCountries.json();
    console.log(countryData);

    countryData.forEach((country, index) => {
      const col = document.createElement("div");
      col.classList.add(
        "column",
        "col-sm-6",
        "col-md-4",
        "col-lg-4",
        "col-xl-4",
        "text-center",
        "mt-4"
      );

      const cardHeader = document.createElement("div");
      cardHeader.classList.add("card-header");
      cardHeader.innerText = country.name.common;

      const card = document.createElement("div");
      card.classList.add("card", "h-100");
      const cardImg = document.createElement("img");
      cardImg.src = country.flags.png;
      cardImg.classList.add("card-img-top", "mb-2");

      const cardbody = document.createElement("div");
      cardbody.classList.add("card-body");

      const cardText = document.createElement("div");
      cardText.classList.add("card-Text");

      cardText.innerText =
        "Capital : " +
        country.capital +
        "\n" +
        "Region : " +
        country.region +
        "\n" +
        "Country Code : " +
        country.borders;

      
      const climate = document.createElement("div");
      climate.setAttribute("class", "card-text text-center mt-2");

      const button = document.createElement("button");
      button.innerText = "Click for Weather";
      button.setAttribute("class", "btn btn-primary");
      
      button.onclick = async function weatherApi() {
        try {
          let weatherData = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=cbaac264b1a3bdf7099d6b56f3d31bd3`
          );

          let data = await weatherData.json();
          console.log(data);

          climate.innerHTML =
            (data.main.temp - 273.15).toFixed(2) +
            "&#176; C ," +
            data.weather[0].description;
        } catch (e) {
          console.log(e);
        }
      };

      col.append(cardHeader, card);
      card.append(cardImg, cardbody);
      cardbody.appendChild(cardText);
      cardText.append(climate, button);
      
      row.appendChild(col);
    });
  } catch (err) {
    console.log(err);
  }
}

getCountries();