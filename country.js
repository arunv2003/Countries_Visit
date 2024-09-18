const countryName = new URLSearchParams(window.location.search).get('name');
const flagImage = document.querySelector('.country-detail img')
const countryNames = document.querySelector('.country-detail h1')
const native = document.querySelector('.native')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subregion = document.querySelector('.subregion')
const capital = document.querySelector('.capital')
const tld = document.querySelector('.tld')
const currencies = document.querySelector('.currencies')
const languages = document.querySelector('.languages')
const borderCountries=document.querySelector('.border-countries')
const dark=document.querySelector('.dark')

dark.addEventListener('click',()=>{
    document.body.classList.toggle('dark')
})


async function getCountriesfull() {
    const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    const data = await res.json()
    data.forEach((country) => {
        flagImage.src = country.flags.svg
        countryNames.innerText = country.name.common
        if (country.name.nativeName) {
            native.innerText = Object.values(country.name.nativeName)[0].common
        }
        else {
            native.innerText = 'Not Available'
        }
        population.innerText = country.population
        region.innerText = country.region
        if (country.subregion) {
            subregion.innerText = country.subregion
        }
        else {
            subregion.innerText = 'Not Available'
        }
        if (country.capital) {
            capital.innerHTML = (country.capital.join(','))
        }
        else {
            capital.innerText = 'Not Available'
        }
        tld.innerHTML = Object.values(country.demonyms)[0].f
        if (country.currencies) {
            currencies.innerText = Object.values(country.currencies).map((currencies) => currencies.name).join(',')
        }
        else {
            currencies.innerText = 'Not Available'
        }
        if (country.languages) {
            languages.innerText = Object.values(country.languages).join(',')
        }
        else {
            languages.innerText = 'Not Available'
        }
        if (country.borders) {
            country.borders.forEach((border) => {
                async function borders() {
                    const getborder = await fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                    const getBorder = await getborder.json()
                    // console.log(getBorder)
                    getBorder.forEach((countryBorder) => {
                        // console.log(countryBorder)
                        const borderCountryTag=document.createElement('a')
                        borderCountryTag.innerText=countryBorder.name.common
                        borderCountryTag.href=`country.html?name=${countryBorder.name.common}`
                        // console.log(borderCountryTag)
                        borderCountries.append(borderCountryTag)
                    })
                }
                borders()
            })
        }
        
       
    })

}
getCountriesfull()