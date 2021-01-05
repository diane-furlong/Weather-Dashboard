$(document).ready(function(){  
    //array for the user-inputted cities
    let cities = []

    getLocalStorage()

    //create an event listener for the search button function
    $("#search-button").on("click", function(event){
        event.preventDefault()
        //api key
        let apiKey = config.key
        //user input
        let city = $("#search-value").val()
        //query url
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey
        let queryURL2 = "api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+apiKey //add this next in a new ajax call?
  
        
        //create AJAX call for specific city being queried
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            goodCity = "yes"
            console.log(goodCity)
            var cityName = response.name
            //var icon = response.weather
            var now = new Date()
            var date = (now.getMonth() + 1)+"/"+now.getDate()+"/"+now.getFullYear()
            let temp = parseInt(1.8*(response.main.temp-273)+32)
            let humidity = response.main.humidity
            let windSpeed = response.wind.speed
            //let uvIndex = response.
            //user input 
            let city = $("#search-value").val()
            
            //append user-inputted city to the cities array
            cities.push(city)

            //append past searched cities to the ul element- create buttons for each city
            $(".list-group").empty()
            for (i=0;i<cities.length;i++){
                $(".list-group").append($("<button id="+cities[i]+"btn>"+cities[i]+"</button>"))

                //set local storage for past cities searched
                localStorage.setItem("City"+[i+1], cities[i])

                //create new div to house city's weather in "today"
                $("#today").append('<div id="'+cities[i]+'"></div>')
                $("#"+cities[i]).css("border","solid 1px black")
                //display city name and date in header in new div
                $("#"+cities[i]).append("<h1>"+cityName+" ("+date+") </h1>")
                //display temp, humidity, wind speed, and UV index
                $("#"+cities[i]).append("<br><p>Temperature: "+temp+"&#8457<br><br>Humidity: "+humidity+"%<br><br>Wind Speed: "+windSpeed+" mph</p>")
                
                //create new div to house city's forecast in "forecast"
                $("#forecast").append('div id="'+cities[i]+'forecast"></div>')
                $("#"+cities[i]+"forecast").append("")

            }
                //create function of the city buttons
                $("#"+cities[i]+"btn").on("click", function(){
                    $("#cities[i]").show()
                    $("#cities["+!+"i]").hide()
                })
        })
        .catch(function(){
            goodCity = "no"
            console.log(goodCity)
            alert("Please input a valid city")
        })
    })

    //on page reload, get city names from local storage and put back into array
    function getLocalStorage(){
        cities = []
        for (i=0;i<localStorage.length;i++){
            cities.push(localStorage.getItem("City"+[i+1]))
        }
        returnButtons()
        function returnButtons(){
            for(i=0;i<cities.length;i++){
                $(".list-group").append("<button>"+cities[i]+"</button>")
            }
        }
    }

    //create clear button
    function clearBtn(){
        let buttons=$(".list-group")
        let clrBtn=$("<button>")
        clrBtn.attr("id","clrBtn")
        clrBtn.text("Clear All")
        clrBtn.css("height","40px")
        clrBtn.css("border-top-right-radius","15px").css("border-top-left-radius","15px").css("border-bottom-left-radius","15px").css("border-bottom-right-radius","15px")
        clrBtn.css("background-color","black").css("color","white")
        clrBtn.insertAfter(buttons)
    }
    clearBtn()

    // function for clearing local storage & removing buttons
    function clearLS(){
        if(confirm("Are you sure you want to clear all saved cities?")){
        localStorage.clear()
        cities.splice(0, cities.length)
        $(".list-group").empty()
        }
    }
    $("#clrBtn").on("click",clearLS)

    
})