import WeatherService from '../../services/WeatherService';


// action functions:

export function setWeatherAction(filter, cityName) {
    if (!cityName) {
        let res = WeatherService.loadFromStorage('weather')
        cityName =  (res) ? res.weather.cityName : '' // passing to service to check against storage before calling api
    }
    return async (dispatch) => {
        try {
            let data = await WeatherService.getWeather(filter, cityName)
            dispatch({
                type: "SET_WEATHER",
                data: data
            })
        } catch (err) {
            throw err
        }
    }
}


export function toggleFavorite(favorite) {
    if (favorite) { // if action disptached from Favorite page = removing from favorites page
        favorite.isFavorite = !favorite.isFavorite
        return (dispatch) => {
            dispatch({
                type: "REMOVE_FROM_FAVORITES",
                data: favorite
            })
        }
    }
    return (dispatch) => { // if action disptached from Home page = removing/favoriting current weather
        let weather = WeatherService.updateWeatherPreferences()
        dispatch({
            type: "UPDATE_WEATHER_FAVORITE",
            data: weather
        })
    }
}

export function setLocationSuggestions(value) {
    return async (dispatch) => {
        try {
           let suggestions = await WeatherService.getAutocomplete(value)
           dispatch({ type: 'SET_LOCATION_SUGGESTIONS', payload: suggestions })
        }catch(err) {
          throw err
        }
     }
}

export function setFilterAction(value) {
    return (dispatch) => {
        dispatch({
            type:"SET_FILTER",
            data: value
        })
    }
}

export function setUnitAction() {
    return (dispatch) => {
        dispatch({
            type: 'SET_UNIT', 
            data:null
        })
    }
}

export function setThemeAction() {
    return (dispatch) => {
        dispatch({
            type: 'SET_THEME', 
            data:null
        })
    }
}

export function setFavoritesAction() {
    return (dispatch) => {
        dispatch({
            type: 'SET_FAVORITES',
            data: null
        })
    }
}

export function setPrevPathAction(path) {
    return (dispatch) => {
        dispatch({
            type: 'SET_PREV_PATH',
            data: path
        })
    }
}