$(document).ready(function(){  
    //array for the user-inputted cities
    let cities = []


    getLocalStorage()

    // function getCity(){
        // //api key
        // let apiKey = ""
        // //user input
        // let city = $("#search-value").val()
        // //query url
        // let queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey
        
        

        // //create AJAX call for specific city being queried
        // $.ajax({
        //     url: queryURL,
        //     method: "GET"
        // }).then(function(response){
        //     var goodCity = "yes"
        //     console.log(goodCity)
        //     var cityName = response.name
        //     //var icon = response.weather
        //     var now = new Date()
        //     var date = (now.getMonth() + 1)+"/"+now.getDate()+"/"+now.getFullYear()
        //     //display city name and date in header in "today" div
        //     $("#today").append("<h1>"+cityName+" ("+date+") </h1>")

        // })
        // .catch(function(){
        //     var goodCity = "no"
        //     console.log(goodCity)
        //     alert("Please input a valid city")
        // })

    // }

    //create an event listener for the search button function
    $("#search-button").on("click", function(event){
        event.preventDefault()
        //api key
        let apiKey = ""
        //user input
        let city = $("#search-value").val()
        //query url
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey
        //checks if input is a good city
        // var goodCity
        
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

                //create function of the buttons
                // function cityButtons(){
                    //for(j=0;j<cities.length;j++){
                        $("#"+cities[i]+"btn").on("click", function(){
                            //create new div to house city's weather in "today"
                            $("#today").append('<div id="'+cities[i]+'"></div>') //this shows up as id undefined
                            //display city name and date in header in new div
                            $("#"+cities[i]).append("<h1>"+cityName+" ("+date+") </h1>")
                        })
                    //}
                // }
            }

            // cityButtons()
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