import { combineReducers } from 'redux';
import weatherReducer from './WeatherReducer'

const combineReducer = combineReducers({  // not really needed for one reducer
    weatherReducer // ES6 syntax
})

export default combineReducer