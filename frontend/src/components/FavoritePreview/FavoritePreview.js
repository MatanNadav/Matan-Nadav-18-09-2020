import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setWeatherAction, setFilterAction, setPrevPathAction } from '../../store/actions/WeatherActions'
import { NavLink } from 'react-router-dom'
import "./FavoritePreview.css"



const FavoritePreview = (props) => {
    const city = props.city
    const unit = useSelector(state => state.weatherReducer.unit)
    let filter = {key: city.key, name:city.cityName}
    const dispatch = useDispatch()

    const weatherRoute = () => {
        dispatch(setPrevPathAction('/favorites'))
        dispatch(setFilterAction(filter))
        dispatch(setWeatherAction(filter))
    }
    return (
        city && <div className="favorite-preview-container">
                      <div className = "card fav-card">
                          <div className="card-header">{city.cityName} - {city.WeatherText} - {unit === "C" ? city.Temperature.Metric.Value : city.Temperature.Imperial.Value} {unit}</div>
                          <div className="card-main">
                              <div className="main-description">
                                  <h3> Date: {new Date(city.EpochTime * 1000).toDateString()}</h3>
                                  <button className="btn fav-btn" onClick={ () => props.removeFavorite(city)}>Remove</button>
                                  <button className="btn fav-btn" onClick={weatherRoute}><NavLink className="favorite-link" to='/'>Weather</NavLink></button>
                              </div>
                          </div>
                      </div>
            
                </div>
      );
}

export default FavoritePreview