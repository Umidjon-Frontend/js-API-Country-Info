const input = document.querySelector(".input");
const btnSearch = document.querySelector(".btn-search");
const countryBox = document.querySelector(".country-box");

input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        loadSearchCountry();
    }
});
btnSearch.addEventListener("click", loadSearchCountry);

function loadSearchCountry() {
    let inputText = input.value;
    fetch(`https://restcountries.com/v3.1/name/${inputText}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                countryBox.innerHTML = "Not Found";
            }
        })
        .then((data) => {
            let border = data[0].borders.map(
                (item) =>
                    `<span>
                            ${item}
                        </span>`
            );
            const lanValues = Object.values(data[0].languages);
            const curValues = Object.values(data[0].currencies);
            let showCountry = `
                    <div class="show-country">
                        <div class="img-wrapper">
                            <h1>${data[0].name.common}</h1>
                            <img src=${data[0].flags.png} alt="">
                        </div>
                        <div class="card">
                            <h2>Name: <span>${data[0].name.common}</span></h2>
                            <h2>Name official: <span>${
                                data[0].name.official
                            }</span></h2>
                            <h2>Capital: <span>${data[0].capital}</span></h2>
                            <h2>Continents: <span>${
                                data[0].continents
                            }</span></h2>
                            <h2>Population: <span>${
                                data[0].population
                            }</span></h2>
                            <h2>Region: <span>${data[0].region}</span></h2>
                            <h2>SubRegion: <span>${
                                data[0].subregion
                            }</span></h2>
                            <h2>Border:<span>${border}</span></h2>
                            <h2>Area: <span>${data[0].area}</span></h2>
                            <h2>Languages: <span>${lanValues}</span></h2>
                            <h2>Independent: <span>${
                                data[0].independent ? "Yes" : "No"
                            }</span></h2>
                            <h2>Currencies: <span>${
                                curValues[0].name
                            }</span></h2>
                            <a class="card-name-map" href=${
                                data[0].maps.googleMaps
                            }>Google maps</a>
                        </div>
                    </div>
                    `;
            countryBox.innerHTML = showCountry;
        })
        .catch((response) => {
            console.log(response);
        });
}
