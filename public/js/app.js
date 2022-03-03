fetch('http://puzzle.mead.io/puzzle').then((res) => {
    res.json().then((data) => {
        console.log("data", data);
    })
})

// fetch('http://localhost:3030/weather?address=boston').then((res) => {
//     res.json().then((data) => {
//         if (data.error) {
//             console.log(data.error);
//         } else {
//             console.log("l", data.location);
//             console.log("f", data.forcast);
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = "from javascript"
messageOne.textContent = "Loading..."
messageTwo.textContent = ""


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    // fetch('http://localhost:3030/weather?address=' + location).then((response) => {

    //removed localhost beacuse of deployment

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                console.log("datadatadatadata",data);
                messageOne.textContent = data.location
                messageTwo.textContent = data
            }   
        })
    })
})