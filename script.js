import darkMode from './darkMode.js';

const countriesContainer = document.querySelector(".countries-container");
const searchContainer = document.querySelector(".search-container");
const input = document.querySelector(".search-container input");
const filterByRegion = document.querySelector(".filter-by-region");
const darkModeBtn = document.querySelector(".dark-mode-btn");

let allCountriesData;
darkMode(darkModeBtn);

fetch("https://restcountries.com/v3.1/all").then(res => res.json())
    .then(data => {
        renderCountries(data);
        allCountriesData = data;
    })
    .catch(err => console.log(err));

searchContainer.addEventListener("click", () => {
    input.focus();
});

filterByRegion.addEventListener("change", () => {
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`).then(res => res.json())
        .then(renderCountries)
        .catch(err => console.log(err));
});

function renderCountries(countries) {
    countriesContainer.innerHTML = "";

    countries.forEach(country => {
        const countryCard = document.createElement("a");
        countryCard.classList.add("country-card");
        countryCard.href = `/country.html?name=${country.name.common}`;
        const cardHTML = `
                    <img src=${country.flags.svg} class="country-img" alt=${country.name.common}>
                    <div class="card-text"> 
                        <h3 class="card-title">${country.name.common}</h3>
                        <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
                        <p><b>Region: </b>${country.region}</p>
                        <p><b>Capital: </b>${country.capital?.[0] || "Unknown"}</p>
                    </div>
                `;
        countryCard.innerHTML = cardHTML;
        countriesContainer.appendChild(countryCard);
    });
}

input.addEventListener("input", () => {
    let filterCountries = allCountriesData.filter(country => country.name.common.toLowerCase().includes(input.value.toLowerCase()));
    renderCountries(filterCountries);
});