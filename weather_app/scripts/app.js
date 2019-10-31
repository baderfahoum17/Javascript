// for DOM manipulation


const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');


const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');


const updateUI = (data) => {

    // const cityDetails = data.cityDetails;
    // const weather = data.weather;
    console.log(data);
    // console.log(cityDetails,weather);

    // we can achieve the same variable assignments with destructure properties;
    const { cityDetails , weather } = data;


    //update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    // update the image of day/night
  
    // isDayTime is a property fetched from the api
    let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";
    // if(weather.IsDayTime){
    //     timeSrc="img/day.svg";
    // }else{
    //     timeSrc="img/night.svg";
    // }
    time.setAttribute('src', timeSrc);

    //or :
    // time.outerHTML = `
    //     <img src="${timeSrc}" class="time card-img-top">    
    // `;

    // upcate the icon based on the time of day
    let iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src',iconSrc);
    // icon.outerHTML = `
    //     <img src="img/icons/${iconSrc}.svg">
    // `;


    // make the card visible upon sucessful resolvement
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }



};

//
const updateCity = async (cityName) => {

    const cityDetails = await getCity(cityName);
    const cityWeather = await getWeather(cityDetails.Key);
    return {
        cityDetails: cityDetails,
        weather: cityWeather
    };

}

cityForm.addEventListener('submit', e => {
    //dont refresh the page
    e.preventDefault();

    //get city value from from
    let cityName = cityForm.city.value.trim();
    // console.log(cityName.toLowerCase());
    if (cityName.length) {
        updateCity(cityName)
            .then(data => updateUI(data))
            .catch(err => console.log(err));
        cityForm.reset();
    } else {
        alert('please enter something')
    }

    //update the UI with new city
});
