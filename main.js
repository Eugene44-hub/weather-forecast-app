const main = document.querySelector(".forecastBox");
console.log(Loading)
    // main.innerHTML = `<h1 class="p-5">Loading....</h1>`

// console.log
main.innerHTML = `<h1 class="m-auto text-center pt-5">Loading...</h1>`

const displayForecast = () => {
    main.innerHTML = `
  

    <div id="container1" class="col-8 col-md-4 m-auto ">

    <p id="cityName" class="text-center h1"></p>
    
    <!-- display date -->
    <div id="displayDate" class="mt-5 text-center"> </div>
    
    <div class="my-3" id="weatherIcon"></div>
    <div class="d-flex justify-content-between text-center ">
        <div id="humidity"></div>
        <div id="windSpeed"></div>
    
    </div>


</div>
<div id="container2" class="col col-md-7 m-auto">
    <div>
        <div id="graph">
            <canvas id="myChart" width="400" height="300"></canvas>

        </div>

    </div>
    <div id="forecast" class="d-flex justify-content-between pt-5">

    </div>

</div>
    
    `
}