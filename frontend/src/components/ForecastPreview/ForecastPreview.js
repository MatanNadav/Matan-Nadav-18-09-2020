import React from 'react';
import { useSelector } from 'react-redux'
import "./ForecastPreview.css"

const ForecastPreview = (props) => {
    const unit = useSelector(state => state.weatherReducer.unit)
    let maxTemp, minTemp

    if (!props.weather && unit) return null
    let date = new Date(props.weather.Date).toUTCString().substring(0 , props.weather.Date.length - 13)
    maxTemp = (unit === "C") ? props.weather.Temperature.Maximum.Value : (props.weather.Temperature.Maximum.Value * (9/5) + 32)
    minTemp= (unit === "C") ? props.weather.Temperature.Maximum.Value : (props.weather.Temperature.Minimum.Value * (9/5) + 32)
    
 
    return (
        <div className="forecast-preview-container">
                       <div className="forecast flex column">
                           <h4>{date}</h4>
                           <div className="forecast-details flex column space-between">
                               <p>
                                   {props.weather.WeatherText}
                               </p>
                               <p>
                                   Max: {Math.floor(maxTemp)} {unit}
                               </p>
                               <p>
                                   Min: {Math.floor(minTemp)} {unit}
                               </p>

                           </div>
                         
                       </div>
             
                   </div>
       );
}

export default ForecastPreview