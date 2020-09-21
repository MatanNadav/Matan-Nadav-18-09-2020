const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 8080;

const app = express()


app.use(bodyParser.json());
app.use(express.static( 'public' ));

if (process.env.NODE_ENV !== 'production') {
    const corsOptions = {
        origin: 'http://localhost:3000',
        credentials: true
    };
    app.use(cors(corsOptions));
}


const weatherRoute = require('./api/weather/weather.route')
app.use('/api/weather', weatherRoute)

app.listen(port,
    () => console.log(`Weatherly listening on port ${port}!`))