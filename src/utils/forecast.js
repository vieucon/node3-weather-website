const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/c3d7e1922e68f8a639db45235c04ea00/' + encodeURIComponent(longitude) + ',' + encodeURIComponent(latitude) + '?units=si&lang=fr'
    request ({ url, json: true}, (error, { body }) => {
    
        if (error) {
            callback('Unable to connect to forecast service', undefined)
        } else if  (body.error) {
           callback('Coordinate error, try another search', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
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