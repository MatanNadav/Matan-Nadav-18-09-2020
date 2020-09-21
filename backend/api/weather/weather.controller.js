const weatherService = require('./weather.service')


module.exports = {
    fetchWeather,
    fetchSuggestions
}

async function fetchWeather(req, res) {
    let {q, name} = req.query
    console.log(q, name)
    try {
        let data = await weatherService.getWeatherFromApi(q, name)
        res.json(data)
    }
    catch (err) {
        res.status('500').send('could not fetch weather at controller')
    }
}

async function fetchSuggestions(req, res) {
    let {q} = req.query
    try {
        let data = await weatherService.getSuggestionsFromApi(q)
        res.json(data)
    }
    catch (err) {
        res.status('500').send('could not fetch suggestions at controller')
    }
}