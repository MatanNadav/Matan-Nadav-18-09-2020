import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setFavoritesAction, toggleFavorite, setFilterAction } from '../../store/actions/WeatherActions'
import FavoritePreview from "../../components/FavoritePreview/FavoritePreview"
import './FavoritesPage.css'


const FavoritePage = () => {
    const favorites = useSelector(state => state.weatherReducer.favorites)
    const dispatch = useDispatch()
    const filter = useSelector(state => state.weatherReducer.filter)
    
    useEffect(() => {
        dispatch(setFavoritesAction())
        dispatch(setFilterAction(filter))
    }, [dispatch, filter])

    const removeFavorite = (favorite) => {
        dispatch(toggleFavorite(favorite))
        dispatch(setFavoritesAction())
    }

    return (
        <section className="favorites-container flex column">
            {
                (favorites[0]) ? favorites.map(city => <FavoritePreview key={city.cityName} city={city} removeFavorite={removeFavorite}></FavoritePreview>) : <h3 className="default-header">No Favorites</h3>
            }
        </section>
    )
}
export default FavoritePage
