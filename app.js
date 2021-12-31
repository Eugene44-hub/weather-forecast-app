//APIkey: 6654cc7ee15c4c4dabd45732210806
// const main = document.querySelector("main")

let Loading = false;

const userInput = document.querySelector("#userInput")

// main.style.display = "none"
let link = "http://api.weatherapi.com/v1/forecast.json?key=6654cc7ee15c4c4dabd45732210806&q=cross river&days=7&aqi=no&alerts=no"
const getForecast = async(url, load) => {
    const res = await fetch(url)

    const data = await res.json()
    Loading = true
    if (Loading) {

        displayForecast()
    }
    return data
}

// graph 

const chart = (labels, temp) => {
    const data = {
        labels: labels,
        datasets: [{
            label: 'Temperature C',
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            data: temp,

            borderWidth: 2

        }],
    };

    const config = {
        type: 'line',
        data: data,
        options: {}
    };
    return config
}

getForecast(link)
    .then(res => {
        console.log(res)
        let currentDate = res.current.last_updated;
        const forecast = document.querySelector("#forecast")
        const displayDate = document.querySelector("#displayDate");
        const weatherIcon = document.querySelector("#weatherIcon");
        const humidity = document.querySelector("#humidity")
        const windSpeed = document.querySelector("#windSpeed")
        const cityName = document.querySelector("#cityName");

        cityName.textContent = `${res.location.region}, ${res.location.country}`

        weatherIcon.innerHTML = `
        <div class="d-flex justify-content-around">
        <img height=100  src=${res.current.condition.icon}> <span class="fs-1 fw-bold">${res.current.temp_c}<sup>oc<sup></span>
        </div>
        <p class="text-center fs-2">${res.current.condition.text}</p>

        `
        displayDate.innerHTML = `${returnDay(currentDate)} ${currentDate}`
        humidity.innerHTML = `
        <h6>Humidity</h6>
        ${res.current.humidity}%`

        windSpeed.innerHTML = `
        <h6>Wind-Speed</h6>
        ${res.current.humidity}%`


        const forecastDays = res.forecast.forecastday.map(item => returnDay(item.date));
        const temp = res.forecast.forecastday.map(item => item.day.maxtemp_c);
        // console.log(temp)
        // let forecastDay = forecastDays.map(item => );
        // console.log(forecastDays)
        console.log(currentDate)
        forecast.innerHTML = res.forecast.forecastday.map(item => (
            `
      
     <div class="text-center p-3 ${new Date(item.date).getDay()===new Date(currentDate).getDay()?"bg-primary text-light":""}">
       <p> ${item.date}</p>
    <img src=${item.day.condition.icon} class="">
    <p> ${item.day.avghumidity}%</p>

     </div>
         `))

        // console.log(forecastDay)


        const labels = forecastDays;


        let myChart = new Chart(
            document.getElementById('myChart'),
            chart(labels, temp)
        );

        let destroy = () => {
                myChart.destroy()
                console.log("destroyed")
            }
            // key down destroy chart
        userInput.addEventListener("keydown", e => {

            destroy()

        })

        // key up render chart
        userInput.addEventListener("keyup", e => {
            const location = e.target.value

            if (e.target.value) {
                main.innerHTML = `<h1 class="m-auto pt-5">Loading...</h1>`

                link = `http://api.weatherapi.com/v1/forecast.json?key=6654cc7ee15c4c4dabd45732210806&q=${location}&days=7&aqi=no&alerts=no
                `
                getForecast(link)
                    .then(res => {
                        if (res.error) {
                            return main.innerHTML = `<h1 class="m-auto pt-5">${res.error.message}</h1>`
                        }
                        Loading = true;
                        displayForecast();
                        console.log()
                        let currentDate = res.current.last_updated;
                        const forecast = document.querySelector("#forecast")
                        const displayDate = document.querySelector("#displayDate");
                        const weatherIcon = document.querySelector("#weatherIcon");
                        const humidity = document.querySelector("#humidity")
                        const windSpeed = document.querySelector("#windSpeed")
                        const cityName = document.querySelector("#cityName");

                        cityName.textContent = `${res.location.region}, ${res.location.country}`

                        weatherIcon.innerHTML = `
            <div class="d-flex justify-content-around">
            <img height=100  src=${res.current.condition.icon}> <span class="fs-1 fw-bold">${res.current.temp_c}<sup>oc<sup></span>
            </div>
            <p class="text-center fs-2">${res.current.condition.text}</p>
    
            `
                        displayDate.innerHTML = `${returnDay(currentDate)} ${currentDate}`
                        humidity.innerHTML = `
            <h6>Humidity</h6>
            ${res.current.humidity}%`

                        windSpeed.innerHTML = `
            <h6>Wind-Speed</h6>
            ${res.current.humidity}%`


                        const forecastDays = res.forecast.forecastday.map(item => returnDay(item.date));
                        const temp = res.forecast.forecastday.map(item => item.day.maxtemp_c);
                        // console.log(temp)
                        // let forecastDay = forecastDays.map(item => );
                        // console.log(forecastDays)
                        console.log(currentDate)
                        forecast.innerHTML = res.forecast.forecastday.map(item => (
                            `
          
         <div class="text-center p-3 ${new Date(item.date).getDay()===new Date(currentDate).getDay()?"bg-primary text-light":""}">
           <p> ${item.date}</p>
        <img src=${item.day.condition.icon} class="">
        <p> ${item.day.avghumidity}%</p>
    
         </div>
             `))

                        // console.log(forecastDay)


                        const labels = forecastDays;

                        chart(labels, temp)



                        let render = () => {
                                myChart = new Chart(
                                    document.getElementById('myChart'),
                                    chart(labels, temp)
                                );
                                console.log('rendered')

                            }
                            // myChart instanceof Chart && myChart.destroy()
                        render()

                    })
            } else {
                main.innerHTML = `<h1 class="m-auto pt-5">Please input a Location</h1>`
            }
            console.log(location)

        })


        // const chart = document.querySelector("#myChart");

        // myChart instanceof Chart && myChart.destroy()
    })
    // .catch(err => main.innerHTML = `<h1 class="m-auto pt-5">You are probably Having network issues please change network connection and try again</h1>`)




const returnDay = date => {
    const currentdate = new Date(date);

    let day = currentdate.getDay();

    switch (day) {

        case 0:
            return "Sunday"

        case 1:
            return "Monday"
        case 2:
            return "Tuesday"
        case 3:
            return "Wednesday"
        case 4:
            return "Thursday"
        case 5:
            return "Friday"
        case 6:
            return "Saturday"

        default:
            return "No such day"

    }

}