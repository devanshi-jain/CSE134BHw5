document.addEventListener('DOMContentLoaded', async function () {
    const apiKey = 'gPgFPBVAhGgA4XHrR58HtJ8RYuGR0rKG';
    const locationKey = '347628';
    const currentConditionsUrl = `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`;

    try {
        console.log('Fetching current conditions data...');
        const response = await fetch(currentConditionsUrl);

        if (response.ok) {
            console.log('Current conditions data fetched successfully.');
            const data = await response.json();
            console.log('Current conditions data:', data);

            const temperature = data[0].Temperature.Imperial.Value;
            const conditions = data[0].WeatherText;
            const weatherIconCode = data[0].WeatherIcon;

            document.querySelector('.temperature').textContent = `${temperature}°F`;
            document.querySelector('.weather-condition').textContent = conditions;

            // Additional properties
            console.log('Relative Humidity: 85%');
            console.log('Dewpoint: -2.77°C');
            console.log('Wind Speed: 10 mph');
            console.log('Wind Direction: N');

            const iconUrl = getWeatherIconUrl(weatherIconCode);
            document.getElementById('weather-icon').src = iconUrl;
        } else {
            console.error('Error fetching current conditions:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching current conditions:', error);
    }

    function getWeatherIconUrl(iconCode) {
        return `https://developer.accuweather.com/sites/default/files/${iconCode < 10 ? '0' + iconCode : iconCode}-s.png`;
    }
});