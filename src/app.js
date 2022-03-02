const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forCast = require('./utils/forcast')
const geocode = require('./utils/geocode')

const app = express()
console.log("__dirname",path.join(__dirname, '../public'));
app.use(express.static(path.join(__dirname, '../public')));

app.set('view engine', 'hbs')


const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partial')
app.set('views', viewsPath) 
hbs.registerPartials(partialPath)

app.get('/', (req, res) => {
    res.render("index",{
        name:'Home Page'
    })
})

app.get('/about', (req, res) => {
    res.render("about",{
        name : "About"
    })
})

app.get('/help', (req, res) => {
    res.render("help",{
        name: "Help"
    })
})
app.get('/product', (req, res) => {
    console.log("==", req.query.search);
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }
    res.send([{
        product: []
    }])
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    } 
    geocode(req.query.address,(error,{latitude, longitude, location} = {})=>{
        if(error){
            return res.send({error})
        }
        getForcast(latitude,longitude, (error,forCaseData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                'forCast':forCaseData,
                location,
                "address":req.query.address 
            })
               
        })
    })
})


app.listen("3030")