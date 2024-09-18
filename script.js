
const countriesContainer = document.querySelector('.countries-container')
const filterByRegion = document.querySelector('.filter-by-region')
const body = document.querySelector('body')
const dark = document.querySelector('.dark')
const lights = document.querySelector('light')
const searchInputContainer = document.querySelector('.search-container input')

let allCountriesData
dark.addEventListener('click',()=>{
   body.classList.toggle('dark')
   if(body.classList.contains('dark')){
    dark.innerHTML = `<i class="fa-regular fa-sun"></i>&nbsp;&nbsp; Light Mode`
   }else{
  
     dark.innerHTML=`<i class="fa-regular fa-moon"></i>&nbsp;&nbsp; Dark Mode`
   }
})



async function getCountries() {
    const res = await fetch('https://restcountries.com/v3.1/all')
    const data = await res.json()

    renderCountries(data)

    allCountriesData = data
    // console.log(allCountriesData)

    // countriesContainer.innerHTML = ''
    // data.forEach((country) => {
    //     const countryCard = document.createElement('a')
    //     countryCard.classList.add('country-card')
    //     countryCard.href = `country.html?name=${country.name.common}`
    //     const cardHTML = `
    //     <img src="${country.flags.svg}" alt="flag">
    //     <div class="card-text">
    //         <h3 class="card-title">${country.name.common}</h3>
    //         <p><b>Population: </b> ${country.population.toLocaleString('en-IN')}</p>
    //         <p><b>Region: </b> ${country.region}</p>
    //         <p><b>capital: </b>"${country.capital}"</p>
    //         <p><b>Map</b> <a href="${country.maps.googleMaps}"> Click here </a></p>
    //     </div>`
    //     countryCard.innerHTML = cardHTML
    //     countriesContainer.append(countryCard)

    // })


}
getCountries()

filterByRegion.addEventListener('change', (e) => {
    // console.log(filterByRegion.value)
    async function getCountries() {
        const res = await fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
        const data = await res.json()
        renderCountries(data)
        // console.log(data)
        // countriesContainer.innerHTML = ''
        // data.forEach((country) => {
        //     const countryCard = document.createElement('a')
        //     countryCard.classList.add('country-card')
        //     countryCard.href = `country.html?name=${country.name.common}`
        //     const cardHTML = `
        //     <img src="${country.flags.svg}" alt="flag">
        //     <div class="card-text">
        //         <h3 class="card-title">${country.name.common}</h3>
        //         <p><b>Population: </b> ${country.population.toLocaleString('en-IN')}</p>
        //         <p><b>Region: </b> ${country.region}</p>
        //         <p><b>capital: </b>"${country.capital}"</p>
        //         <p><b>Map</b> <a href="${country.maps.googleMaps}"> Click here </a></p>
        //     </div>`
        //     countryCard.innerHTML = cardHTML
        //     countriesContainer.append(countryCard)
        // })

    }
    getCountries()
})
function renderCountries(data) {
    countriesContainer.innerHTML = ''
    data.forEach((country) => {
        const countryCard = document.createElement('a')
        countryCard.classList.add('country-card')
        countryCard.href = `country.html?name=${country.name.common}`
        const cardHTML = `
        <img src="${country.flags.svg}" alt="flag">
        <div class="card-text">
            <h3 class="card-title">${country.name.common}</h3>
            <p><b>Population: </b> ${country.population.toLocaleString('en-IN')}</p>
            <p><b>Region: </b> ${country.region}</p>
            <p><b>capital: </b>"${country.capital}"</p>
            <p><b>Map</b> <a href="${country.maps.googleMaps}"> Click here </a></p>
        </div>`
        countryCard.innerHTML = cardHTML
        countriesContainer.append(countryCard)

    })
}


searchInputContainer.addEventListener('input', (e) => {
   
    const filterCountriesName = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    // console.log(filterCountriesName)
    renderCountries(filterCountriesName)
})