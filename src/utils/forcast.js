const request = require('request')

getForcast = (latitude,longitude,callback) => {
    url="https://api.mapbox.com/geocoding/v5/mapbox.places/Market%20Street%20and%20Fremont%20Street.json?types=address&proximity=-122.39738575285674,37.792514711136945&access_token=pk.eyJ1IjoibWluYXhpbWFjaGhpIiwiYSI6ImNreXNxbDViMjB6dWcydXRnajRsOGZjYnUifQ.cpZvtHsIKIJlfgczueIdlw&limit=1"

    request({ url: url, json:true}, (error,res)=>{
        if(error){
            callback("unable to connect",undefined)
        }
        else if(res.body.features.length === 0){
            callback("unable to find Localtion",undefined)
        }
        else{
            callback(undefined,{
                latitude:res.body.features[0].center[0],
                longitude:res.body.features[0].center[1],
                location:res.body.features[0].place_name
            })
        }
    })
}

module.exports = getForcast