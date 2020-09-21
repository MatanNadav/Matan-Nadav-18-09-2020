import React from 'react';
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUnitAction, setThemeAction } from '../../store/actions/WeatherActions'

import './AppHeader.css'


const AppHeader = () => {
    const dispatch =  useDispatch()
    const handleUnits = () => {
      dispatch(setUnitAction())
    }
    const handleTheme = () => {
      dispatch(setThemeAction())
    }
    return (
      <div className="app-header">

        <nav className="nav-container flex space-around align-center">
            <li className="nav-item flex align-center"><NavLink className="header-link" to="/"><button className="btn header-btn">Weather</button></NavLink></li>
            <li className="nav-item flex align-center"><button className="btn header-btn" onClick={handleUnits}>C / F</button></li>
            <li className="nav-item flex align-center"> <button className="btn header-btn" onClick={handleTheme}>Dark / Light</button></li>
            <li className="nav-item flex align-center"><NavLink className="header-link" to="/favorites"><button className="btn header-btn">Favorites</button></NavLink></li>
        </nav>
          
      </div>
    );
}

export default AppHeader;
  