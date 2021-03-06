//INIT AND GLOBALS 
// First, a function to display the waifu  
function displayWaifuInfo () {

  var waifu = $(this).attr("data-waifu"); 

  //Call upon ajax to grab the giphy API via the two parameters: URL and METHOD
  //URL is a string equal to the API + SEARCH TERM + API KEY. Concat because needs to be parsed as a string.
  //When done, store all response.data in a results variable 
  //Use comparator logic to first check the quality (in this case, "rating") of each result 

  $.ajax({
    url: "https://api.giphy.com/v1/gifs/search?q=" + waifu + "&api_key=dc6zaTOxFJmzC&limit=10", 
    method: "GET"
  })

  .done(function(response) {
    //store an array of results in the results variable 
    var results = response.data;  
    
    //loop over every result item
    for (var i = 0; i < results.length; i++) { 

      //ensure that the results.ratings are ABSOLUTELY NOT "r" or "pg-13"
      if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
        
        //now if the data passes the conditional above, do the following: 
        //use jq to create a div class to hold the gifs and store it in a variable 
        var gifDiv = $("<div class='waifuGifDiv'>");
        //notate so that each result item's rating can be discreet, and store it in a variable 
        var rating = results[i].rating; 
        //use jq to create a paragraph tag with the result item's rating 
        var p = $("<p>").text("Rating: " + rating); 
        //use jq to create an image tag to store images 
        var waifuImage = $("<img>"); 
 
        waifuImage.addClass("waifuGif"); 
        
        //give the image tag an src attribute of a property pulled off of the result item 
        waifuImage.attr("src", results[i].images.fixed_height_still.url); 
        //in the image tag, let the moving images have moving image attributes
        waifuImage.attr("moving-image", results[i].images.fixed_height.url); 
        //in the image tag, let the still images have still image attributes
        waifuImage.attr("still-image", results[i].images.fixed_height_still.url); 


        //append both the paragraph and waifuImage we created to the gifDiv that we created
        gifDiv.prepend(p); 
        gifDiv.prepend(waifuImage); 

        //prepend the gifDiv to the "#gifs-appear-here" div in the HTML
          $("#gifs-appear-here").prepend(gifDiv); 

          }
         }
      }); 
    }

//FUNCTIONS 

        //call upon a function to handle events when user wants to add a new waifu item  
        $("#add-waifu").on("click", function(event) { 
            //prevent the default action of the element from happening
            event.preventDefault();
       
        //inside the form input, use jq to grab the waifu input without spaces  
        var waifu = $("#waifu-input").val().trim(); 

        //the waifu from the text box has to be queued up in the array 
        var a = $("<button>"); 

          //for the button stored in variable a, add a class of waifu 
          a.addClass("waifu"); 

          //for the button stored in variable a, add the data attribute 
          a.attr("data-waifu", waifu); 

          //for the button stored in variable a, write the text of the waifu 
          a.text(waifu); 

          //use jq to grab the buttons view div and add the button to it
          //this is how we control the view, whether it is removed or added, etc.
          $("#buttons-view").append(a); 

    }); 
          //this is basically like a "document ready" but is more dynamic 
          //and the event handler has more parameters  
          $('body').on('click', "img", function (event) { 

            var movingImage = $(this).attr("moving-image"); 

            $(this).attr("src", movingImage); 
            console.log("click")

          }); 

            $(document).on("click", ".waifu", displayWaifuInfo); 
            