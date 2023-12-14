// server.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/weather', async (req, res) => {
    const apiKey = 'gPgFPBVAhGgA4XHrR58HtJ8RYuGR0rKG';
    const locationKey = '347628';
    const currentConditionsUrl = `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`;

    try {
        const response = await fetch(currentConditionsUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching current conditions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
