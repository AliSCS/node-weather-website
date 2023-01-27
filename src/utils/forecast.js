const request = require('postman-request')

const forecast = (long, lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=15326b102ae4e12dba442b4d6b00fc90&query='+ lat + ',' + long
    request({ url, json:true}, (error, {body}) => {
        if (error) {
            callback('could not connect to the API', undefined)
        } else if (body.error){
            callback('please try a different criteria', undefined)
        } else {
            callback(undefined,
                body.current.weather_descriptions[0]+ ', It is currently ' + body.current.temperature +' out. It feels like ' + body.current.feelslike +' out.'
                
            )
        }
    })
}

module.exports = forecast