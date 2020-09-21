import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setFilterAction, setPrevPathAction, setLocationSuggestions } from '../../store/actions/WeatherActions'
import Swal from 'sweetalert2'
import './WeatherFilter.css'



const WeatherFilter = () => {
    const dispatch =  useDispatch()
    const suggestions = useSelector(state => state.weatherReducer.locationSuggestions)
    let datalist = document.getElementById('search-options')
    let timeout

    const onSearch = () => {
        let input = document.getElementById("filter-input")
        let param = (suggestions) ? suggestions.find(city => {return city.name.toLowerCase() === input.value.toLowerCase()}) : null
        let errorText = (param) ? "Not a valid search" : "Api is not available"

        if (input.value.trim() === '' || input.value.length < 3 || !param) {
            Swal.fire({
                icon: 'error',
                title: 'Uh-oh',
                text: errorText
            })
            return
        }
        
        dispatch(setPrevPathAction('/'))
        dispatch(setFilterAction(param))
        input.value = ''
        clearTimeout(timeout)
    }

    const onInputChange= (ev) => {
        let term = ev.target.value
        timeout = setTimeout(() => { // timeout is because of API limit
            dispatch(setLocationSuggestions(term))
        }, 1000)
    }
    useEffect(()=> {
        if (!datalist || !suggestions) return
        datalist.innerHTML = ''
        suggestions.forEach(value => {
            let el = document.createElement('option')
            el.value = value.name
            datalist.appendChild(el)
        })
        
    }, [suggestions, datalist])
    return (
        <div className="filter-container flex row align-center">
                <input id="filter-input" name="filter-input" className="input-filter" placeholder="Search for weather" onChange={onInputChange} list="search-options"/>
                <datalist id="search-options">

                </datalist>
            <button className="btn btn-filter" onClick={onSearch} >Search</button>
        </div>
    )
}

export default WeatherFilter
