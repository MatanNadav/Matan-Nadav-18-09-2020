import WeatherService from "../../services/WeatherService"

const defaultState = {
    data: {},
    favorites: [],
    locationSuggestions: [],
    filter: {
        key: 215854,
        name:'Tel Aviv'
    },
    prevPath: '/',
    unit: "C",
    theme: "Light"
}

export default function weatherReducer(state = defaultState, action) {
    let idx
    let newFavorites = state.favorites
    let newStateData = state.data
    let newUnit = state.unit
    let newTheme = state.theme
    switch(action.type) {
        case 'SET_WEATHER':
            return {...state, data:action.data}
        
        case 'SET_FILTER':
            return {...state, filter: action.data}

        case 'UPDATE_WEATHER_FAVORITE':
            idx = findFavorite(newFavorites, action.data)
            let {favorites} = updateWeatherFavorite(idx, newFavorites, action.data)
            return {...state, data:action.data, favorites: favorites}

        case 'SET_FAVORITES':
            let favoritesFromStorage = WeatherService.storageFavorites()
            return {...state, favorites: favoritesFromStorage}

        case 'REMOVE_FROM_FAVORITES':
            idx = findFavorite(newFavorites, action.data)
            if (idx >= 0) {
                let {stateData, favorites}= removeFavorite(idx, newStateData, newFavorites, action.data)
                return {...state, data: stateData,favorites:favorites}
            }
            else {
                return {...state, favorites:action.data}
            }
        case 'SET_LOCATION_SUGGESTIONS':
            return { ...state, locationSuggestions: action.payload }
        case 'SET_PREV_PATH':
            state.prevPath = action.data
            return {...state, prevPath: action.data}

        case 'SET_UNIT':
            newUnit = (newUnit === "C") ? "F" : "C"
            return {...state, unit:newUnit}
        case 'SET_THEME':
            newTheme = (newTheme === "Light") ? "Dark" : "Light"
            return {...state, theme:newTheme}
        default:
            return state
    }
}


function updateWeatherFavorite(idx, favorites, payload) {
    if (idx < 0) favorites.unshift(payload)
    else favorites.splice(idx, 1)
    WeatherService.storageFavorites(favorites, "save")
    return {favorites}
}

function findFavorite(favorites, data) {
    let idx
    if (!favorites[0]) return idx = -1
    else {
        idx =  favorites.findIndex( city => {
            return city.key === data.key // not using id because its random
        })
    }
    return idx
}

function removeFavorite(idx, stateData, favorites) {
    if (idx >= 0) {
        if (stateData.weather.id === favorites[idx].id) { // checking if favorite removed = current weather
            let weather = WeatherService.updateWeatherPreferences() // updating weather in "database"(local storage)
            stateData.weather = weather
        }
        favorites.splice(idx, 1)
        WeatherService.storageFavorites(favorites, "save")
    }
    return {stateData, favorites}
}