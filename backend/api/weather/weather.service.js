const axios = require('axios');
const APIKey = require("../../config/config.js").weather_key
const FakeResponse = require('../../FakeResponse') 


const locationAPI = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${APIKey}&q=`;
const conditionAPI = 'http://dataservice.accuweather.com/currentconditions/v1/';
const fiveDaysForecastAPI = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';

module.exports =  {
    getWeatherFromApi,
    getSuggestionsFromApi
}

async function getSuggestionsFromApi( query = 215854) {
    try {
        const res = await axios.get(locationAPI+query)
        return res.data
    }
    catch (err) {

    }
}



async function getWeatherFromApi(query = 215854, name = 'Tel Aviv') {
    try {
        const data = await getCurrWeather(query)
        const forecast = await getFiveDaysForecast(query)
        const weather = data[0]
        weather.isFavorite = false;
        weather.cityName = name
        weather.key = query
        weather.id = makeId()
        return {weather, forecast}
    }
    catch (err) {
        console.warn('something went wrong at main fetch function', err);
        throw err 
    }
}

async function getCurrWeather(locKey = 215854) {
    try {
        const res =  await axios.get(`${conditionAPI}${locKey}?apikey=${APIKey}`)
        return res.data
    }
    catch (err) {
        console.warn('something went wrong at fetching current weather', err)
        throw err
    } 
}

async function getFiveDaysForecast(locKey = 215854) {
    try {
        const res = await axios.get(`${fiveDaysForecastAPI}${locKey}?apikey=${APIKey}&details=false&metric=true`)
        return res.data.DailyForecasts;
    }
    catch (err) {
        console.warn('something went wrong at fetching forecast', err);
        throw err
    }

}

function makeId(length = 5) {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(let i=0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}
    