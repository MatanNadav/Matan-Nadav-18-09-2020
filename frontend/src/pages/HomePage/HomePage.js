import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setWeatherAction, toggleFavorite, setPrevPathAction } from '../../store/actions/WeatherActions'
import ForecastPreview from "../../components/ForecastPreview/ForecastPreview"
import WeatherFilter from "../../components/WeatherFilter/WeatherFilter"
import './HomePage.css'


const HomePage = () => {
    const dispatch =  useDispatch()
    const data = useSelector(state => state.weatherReducer.data)
    const prevPath = useSelector(state => state.weatherReducer.prevPath)
    const filter = useSelector(state => state.weatherReducer.filter)
    const unit = useSelector(state => state.weatherReducer.unit)
    
    
    useEffect(() => {
        if (prevPath === '/favorites' ) {
            return
        }
        dispatch(setWeatherAction(filter))
        dispatch(setPrevPathAction('/'))

    }, [prevPath, dispatch, filter])

    const handleFavorite = () => {
        dispatch(toggleFavorite(null))
        dispatch(setWeatherAction(filter, data.weather.cityName))
    }

    const requireSVG = (desc) => {
        if (desc.includes("sunny") || desc.includes("clear")) return require("../../assets/day.svg")
        else if (desc.includes("cloud")) return require("../../assets/cloudy.svg")
        else if (desc.includes("rain") || desc.includes("showers")) return require("../../assets/rainy-5.svg")
        else return require("../../assets/weather.svg")
    }
    if(!data.weather) return null
    return (
            <section className="home-container">
                <WeatherFilter></WeatherFilter>
                <div className = "card">
                    <div className="card-header">{data.weather.cityName} - {data.weather.WeatherText} - {unit === "C" ? data.weather.Temperature.Metric.Value : data.weather.Temperature.Imperial.Value} {unit}</div>
                    <div className="card-main">
                        <div className="main-description">
                            <h3> Date: {new Date(data.weather.EpochTime * 1000).toDateString()}</h3>
                            <img src={requireSVG(data.weather.WeatherText.toLowerCase())} alt="symbol" className="weather-card-symbol"/>
                            <button className="btn" onClick={handleFavorite}>{(data.weather.isFavorite) ? "Remove Favorite" : "Make Favorite" }</button>
                        </div>
                    </div>
                </div>


                <div className="forecast-container flex space-between">
                    {
                        data.forecast.map( (day,i) => <ForecastPreview key={i} weather={day}></ForecastPreview>)
                    }
                </div>
            </section>
    )
    
}


export default HomePage