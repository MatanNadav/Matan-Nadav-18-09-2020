import React, { useEffect }from 'react';
import './App.css';
import { HashRouter, Switch, Route } from 'react-router-dom'
import HomePage from "./pages/HomePage/HomePage"
import AppHeader from "./components/AppHeader/AppHeader"
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage"
import { useSelector } from 'react-redux';



function App() {
  const theme = useSelector(state => state.weatherReducer.theme)
  
  useEffect(() => {
    let bg = document.getElementById('app-bg')
    if (theme === "Dark") bg.classList.add('dark')
    else bg.classList.remove('dark') // not using toggle so useEffect wont change background on load
  }, [theme])

  return (
    <div className="App">
      <div id="app-bg" className="bg"></div>
      <HashRouter>
          <AppHeader></AppHeader>
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/favorites" component={FavoritesPage}></Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
