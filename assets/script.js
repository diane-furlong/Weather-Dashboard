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
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid="+apiKey
        let queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&units=imperial&appid="+apiKey

        
        //create AJAX call for specific city being queried
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            $.ajax({
                url: queryURL2,
                method: "GET"
            }).then(function(response2){
                goodCity = "yes"
                console.log(goodCity)
                let cityName = response.name
                let icon = "http://openweathermap.org/img/wn/"+response.weather[0].icon+".png"
                let now = new Date()
                let date = (now.getMonth() + 1)+"/"+now.getDate()+"/"+now.getFullYear()
                let temp = response.main.temp
                let humidity = response.main.humidity
                let windSpeed = response.wind.speed
                //let uvIndex = response.
                let date1 = (now.getMonth() + 1)+"/"+(now.getDate() + 1)+"/"+now.getFullYear()
                let date2 = (now.getMonth() + 1)+"/"+(now.getDate() + 2)+"/"+now.getFullYear()
                let date3 = (now.getMonth() + 1)+"/"+(now.getDate() + 3)+"/"+now.getFullYear()
                let date4 = (now.getMonth() + 1)+"/"+(now.getDate() + 4)+"/"+now.getFullYear()
                let date5 = (now.getMonth() + 1)+"/"+(now.getDate() + 5)+"/"+now.getFullYear()
                let icon1 = "http://openweathermap.org/img/wn/"+response2.list[2].weather[0].icon+".png"
                let icon2 = "http://openweathermap.org/img/wn/"+response2.list[10].weather[0].icon+".png"
                let icon3 = "http://openweathermap.org/img/wn/"+response2.list[18].weather[0].icon+".png"
                let icon4 = "http://openweathermap.org/img/wn/"+response2.list[26].weather[0].icon+".png"
                let icon5 = "http://openweathermap.org/img/wn/"+response2.list[34].weather[0].icon+".png"
                let temp1 = response2.list[2].main.temp
                let temp2 = response2.list[10].main.temp
                let temp3 = response2.list[18].main.temp
                let temp4 = response2.list[26].main.temp
                let temp5 = response2.list[34].main.temp
                let humidity1 = response2.list[2].main.humidity
                let humidity2 = response2.list[10].main.humidity
                let humidity3 = response2.list[18].main.humidity
                let humidity4 = response2.list[26].main.humidity
                let humidity5 = response2.list[34].main.humidity
                
                //user input 
                let city = $("#search-value").val()
                
                //append user-inputted city to the cities array
                cities.push(city)

                
                $(".list-group").empty()
                for (i=0;i<cities.length;i++){
                    
                    //append past searched cities to the ul element- create buttons for each city
                    $(".list-group").append($("<button class='"+cities[i]+"' id="+cities[i]+"btn>"+cities[i]+"</button>"))

                    //set local storage for past cities searched
                    localStorage.setItem("City"+[i+1], cities[i])
                
                    //create new div to house city's weather in "today"
                    $("#today").empty()
                    // $("#today").children().hide()
                    $("#today").prepend('<div class="'+cities[i]+'" id="'+cities[i]+'"></div>')
                    $("#"+cities[i]).css("border","solid 1px black")
                    //display city name and date in header in new div
                    $("#"+cities[i]).append("<h1>"+cityName+" ("+date+") <img src='"+icon+"'></h1>")
                    //display temp, humidity, wind speed, and UV index
                    $("#"+cities[i]).append("<br><p>Temperature: "+temp+"&#8457<br><br>Humidity: "+humidity+"%<br><br>Wind Speed: "+windSpeed+" mph</p>")
                    $("#search-value").val('')

                    //create new div to house city's forecast in "forecast"
                    $("#forecast").children().hide()
                    $("#forecast").prepend('<div id="'+cities[i]+'-forecast"></div>')
                    $("#forecast").css("overflow","hidden")
                    $("#"+cities[i]+"-forecast").append("<h1>5-Day Forecast:</h1>")
                    $("#"+cities[i]+"-forecast").append('<div class="col-2 forecastDiv">'+date1+'<br><img src="'+icon1+'"><br>Temp: '+temp1+'&#8457<br>Humidity: '+humidity1+'%</div>')
                    $("#"+cities[i]+"-forecast").append('<div class="col-2 forecastDiv">'+date2+'<br><img src="'+icon2+'"><br>Temp: '+temp2+'&#8457<br>Humidity: '+humidity2+'%</div>')
                    $("#"+cities[i]+"-forecast").append('<div class="col-2 forecastDiv">'+date3+'<br><img src="'+icon3+'"><br>Temp: '+temp3+'&#8457<br>Humidity: '+humidity3+'%</div>')
                    $("#"+cities[i]+"-forecast").append('<div class="col-2 forecastDiv">'+date4+'<br><img src="'+icon4+'"><br>Temp: '+temp4+'&#8457<br>Humidity: '+humidity4+'%</div>')
                    $("#"+cities[i]+"-forecast").append('<div class="col-2 forecastDiv">'+date5+'<br><img src="'+icon5+'"><br>Temp: '+temp5+'&#8457<br>Humidity: '+humidity5+'%</div>')
                    $(".forecastDiv").css("border","solid 1px black").css("width","200px").css("float","left").css("background-color","blue").css("color","white")
                

                    //create function of the city buttons     
                    $("#"+cities[i]+"btn").on("click",function(){
                        //console.log($("#"+cities[i]+"btn").text)
                        // $("#today").toggle()
                        // $("#forecast").toggle()
                        // console.log(cities)
                    })
                }
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