const $ = jQuery;

var initState = {
    search: ["happy mom", "sad mom", "angry mom", "excited mom", "tired mom"]
}

function makeQueryUrl(search) {
    return "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=uPDFFL0Igz5RZZMo1WiNEuv4fU30j9va"
}

function handleSearchButtonClicked(e) {
            e.preventDefault();
            let sName = $(this).data("name");
            console.log(sName);
            $.ajax({
                url: makeQueryUrl(sName.trim()),
                method: "GET"
                }).then(function (res) {
                    response = res.data;
                    console.log("Ajax Response", response);
                    let divGif = $("#search-results");
                    divGif.html("");
                    response.forEach(function (r) {
                        //divGif.append(r.rating, r.images.fixed_height.url);
                        let img = $( "<img class=\"gif-img\" src =\"" + r.images.fixed_height_still.url + "\" />" );
                        let rating = $("<div>"+ r.rating +"<\div>")
                        let imgPlay = false;
                        img.on("click", function(e1) {
                            e1.preventDefault();
                            imgPlay = !imgPlay;
                            let src = imgPlay ? r.images.fixed_height.url : r.images.fixed_height_still.url;
                            $(this).attr("src", src);
                        })
                        let c = $("<div class=\"img-thumbnail\"></div>");
                        c.append(img);
                        c.append(rating);
                        
                        divGif.append(c);
                    })
                });
        }



var eventDispatch = {
    wireEvents() {
        $("#add-button").on("click", function (e) {
            console.log("Button Clicked");
            e.preventDefault();

            var gif = $("#search-input").val().trim();
            initState.search.push(gif);
            display.renderButtons();

        });
    },
};

$(document).ready(function () {
    display.renderButtons();
    eventDispatch.wireEvents();

});

var display = {
    renderButtons() {
        var buttonDiv = $("<div id='buttons>");
        $(".container").append(buttonDiv);
        $("#buttons").empty();
        for (var i = 0; i < initState.search.length; i++) {
            var b = $("<button>");
            b.addClass("gif");
            b.attr("data-name", initState.search[i]);
            b.text(initState.search[i]);
            b.on("click", handleSearchButtonClicked);
            $("#buttons").append(b);

        }

    },
};

