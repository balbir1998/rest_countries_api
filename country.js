import darkMode from "./darkMode.js";

const countryName = new URLSearchParams(location.search).get('name');
const flagImg = document.querySelector(".country-details img");
const countryTitle = document.querySelector(".country-title");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const domain = document.querySelector(".domain");
const currency = document.querySelector(".currency");
const languages = document.querySelector(".languages");
const borderCountries = document.querySelector(".border-countries-name");
const darkModeBtn = document.querySelector(".dark-mode-btn");

darkMode(darkModeBtn);

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`).then(res => res.json())
    .then(([country]) => {
        flagImg.src = `${country.flags.svg}`;
        countryTitle.innerText = `${country.name.common}`;
        if (country.name.nativeName) {
            nativeName.innerText = `${country.name.nativeName[(Object.keys(country.name.nativeName)[0])].common}`
        } else {
            nativeName.innerText = `${country.name.common}`;
        }

        population.innerText = country.population.toLocaleString('en-IN');
        region.innerText = country.region
        subRegion.innerText = (country.subregion) ? country.subregion : "unkown";
        if (country.capital) {
            capital.innerText = country.capital.join(", ");
        } else {
            capital.innerText = "unkown";
        }

        domain.innerText = country.tld.join(", ");

        if (country.currencies) {
            currency.innerText = Object.values(country.currencies).map(currencyName => currencyName.name).join(", ");
        } else {
            currency.innerText = "unkown";
        }

        if (country.languages) {
            languages.innerText = Object.values(country.languages).slice(0, 3).join(", ");
        } else {
            languages.innerText = "unkown";
        }
        if (country.borders) {
            fetch(`https://restcountries.com/v3.1/alpha?codes=${country.borders.join(",")}`).then(res => res.json())
                .then(borderCountry => {
                    borderCountry.forEach(country => {
                        const a = document.createElement("a");
                        a.innerText = country.name.common;
                        borderCountries.appendChild(a);
                        a.href = `/country.html?name=${country.name.common}`;
                    });
                }).catch(err => console.log(err));
        }
    }).catch(err => console.log(err))