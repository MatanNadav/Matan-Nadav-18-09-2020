import Axios from 'axios'
const BASE_URL = process.env.NODE_ENV === "production" ? "/api/" : "//localhost:8080/api/"

var axios = Axios.create({
    withCredentials: true
})

export default {
    getWeather,
    updateWeatherPreferences,
    storageFavorites,
    loadFromStorage,
    getAutocomplete
}

async function getWeather(filter, currWeatherName) {
    if (filter?.name && currWeatherName && filter.name.toLowerCase() === currWeatherName.toLowerCase()) {
        let storageWeather = loadFromStorage('weather')
        if (storageWeather) return storageWeather
    }
    else {
        try {
            let q = (!filter?.key) ? '?q=215854&name=Tel Aviv' :  `?q=${filter.key}&name=${filter.name}`
            const res = await axios.get(`${BASE_URL}weather` + q)
            if (!res.data.weather) {
                let defaultWeather = loadFromStorage('weather')
                return defaultWeather
            }

            let favorites = storageFavorites(null, "load")
            if (favorites[0]) {
                let idx = favorites.findIndex( city => {
                    return city.key === res.data.weather.key // checking if the weather that came from API is already in favorites
                })

            if (idx >= 0 ) res.data.weather.isFavorite = true
            }
            saveToStorage('weather', res.data)
            return res.data
        }
        catch (err) {
            throw err
        }
    }
}

async function getAutocomplete(val) {
    let q = `?q=${val}`
    try {
        const res = await axios.get(`${BASE_URL}weather/suggest` + q)
        if (!res.data[0]) return null
        let suggestions = res.data.map(city => {
            return {
                key: city.Key,
                name: city.LocalizedName
            }
        })
        if (suggestions.length > 5) suggestions = suggestions.slice(0,5)
        return suggestions
    } catch (err) {
        throw err
    }
}

function updateWeatherPreferences() {
    const data = loadFromStorage('weather')
    data.weather.isFavorite = !data.weather.isFavorite
    saveToStorage('weather', data)
    return data.weather
}

function storageFavorites(favorites = [], action = "load") {
    if (action === "save") {
        saveToStorage('favorites', favorites)
    }
    else {
        let res = loadFromStorage('favorites')
        if (res) return res
        else return []
    }
}


function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return (val)? JSON.parse(val) : null;
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
}
