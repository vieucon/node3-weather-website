const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/c3d7e1922e68f8a639db45235c04ea00/' + encodeURIComponent(longitude) + ',' + encodeURIComponent(latitude) + '?units=si&lang=fr'
    request ({ url, json: true}, (error, { body }) => {
    
        if (error) {
            callback('Unable to connect to forecast service', undefined)
        } else if  (body.error) {
           callback('Coordinate error, try another search', undefined)
        } else {
            function msToTime(milliseconds) {
                var day, hour, minute, seconds;
                seconds = Math.floor(milliseconds / 1000);
                minute = Math.floor(seconds / 60);
                seconds = seconds % 60;
                hour = Math.floor(minute / 60);
                minute = minute % 60;
                day = Math.floor(hour / 24);
                hour = hour % 24;
                return hour + "h" + minute;
              }
            callback(undefined, body.daily.data[0].summary + ' Il fait actuellement ' + body.currently.temperature + ' degrés. Le plus haut du jour est ' + body.daily.data[0].temperatureHigh + ' et le plus bas ' + body.daily.data[0].temperatureLow + '. Il y a ' + body.currently.precipProbability + '% de chance de pleuvoir. Le soleil se lève à ' + msToTime(body.daily.data[0].sunriseTime) + ' et se couche à ' + msToTime(body.daily.data[0].sunsetTime) + '.' )
        }
    })
}



// request({ url: url, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to weather service')
//     } else if (response.body.error) {
//         console.log('Unable to find location')
//     } else {
//         console.log(response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
//     }
    
// })




module.exports = forecast