const express = require('express')
const weatherController = require('./weather.controller')
const router = express.Router()


router.get('/', weatherController.fetchWeather)
router.get('/suggest', weatherController.fetchSuggestions)

module.exports = router