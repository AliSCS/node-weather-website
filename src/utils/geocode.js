const { response } = require('express')
const request = require('postman-request')
const geoCode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=2459d50b21903922ebc396519dbc441a&query='+address  
    request({ url, json: true}, (error, {body}) => {
        if(error) {
            callback('cannot connect to url', undefined)
        } else if (body.error) {
            callback('invalid address , please try a different address', undefined)
        } else {
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].label
            })
        }
    })
}

module.exports = geoCode
