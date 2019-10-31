const key = '8vo2e7ukiGv8yU5QhXKmjNeAmhFGtt8u';
// get weather information 
const getWeather = async (cityKey) => {
    const URL = 'http://dataservice.accuweather.com/currentconditions/v1/'
    const query = `${cityKey}?apikey=${key}`;

    const response = await fetch(URL+query);
    const data = await response.json();
    return data[0];

}

//get city information
const getCity = async (city) => {
    const URL ='http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`

    const response = await fetch(URL + query);

    const data = await response.json();
    return data[0];
}

// getCity('liverpool')
// .then(data => {
//     return getWeather(data.Key);
// }).then(data => {
//     console.log(data);
// })
// .catch(err => console.log("rejected"));

// // getWeather("330510");

