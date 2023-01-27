const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//set up paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup templates engine and path to views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up root directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Ali Al-Marsumi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Ali Al-Marsumi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        message: 'This is a sample help message',
        name: "Ali Al-Marsumi"
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address) {
        return res.send({
            error: 'You must provide an address'
        })
    } 
    geocode(address, (error, {longitude, latitude, location} = {}) => {
        if(error) {
            return res.send({error}) 
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                location,
                data: forecastData,
                address
            })
        })

    })
 

    // res.send({
    //     address: req.query.address,
    //     forecast : 'Sunny outside',
    //     location: 'London'
    // })
})

app.get('/products', (req, res) => {

    if(!req.query.search) {
        return res.send({
            error:'You must provide a search value'
        })
    }


    console.log(req.query)
    res.send({
        products: []
    })

})



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found.',
        name: 'System administrator'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.',
        name: 'System administrator'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})