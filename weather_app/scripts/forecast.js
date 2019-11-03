// class-it up
class Forecast{
    constructor(){
        this.key = '8vo2e7ukiGv8yU5QhXKmjNeAmhFGtt8u';
        this.weatherURL = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURL = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    }
    async updateCity(city){

        const cityDetails = await this.getCity(city);
        const cityWeather = await this.getWeather(cityDetails.Key);
        return {
            cityDetails: cityDetails,
            weather: cityWeather
        };
    
    }

    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`
        const response = await fetch(this.cityURL+query);
        const data = await response.json();
        return data[0];
    }

    async getWeather(id){
        const query = `${id}?apikey=${this.key}`;

        const response = await fetch(this.weatherURL+query);
        const data = await response.json();
        return data[0];

    }

    
}


