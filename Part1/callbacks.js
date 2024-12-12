
//calling the view button function on click
function viewButton(createButtonText, callbackbtntext, apiCallback, waitmsg, waiterrormsg) {

    //showing msg while fetching api
    const WaitMessage = document.getElementById("WaitMessage");
    WaitMessage.innerHTML = `<span>Please Wait , </span> <span> Data is Loading...</span>`

    setTimeout(() => {

       

        //Fetching API data
        fetch('https://dummyjson.com/posts').then(response => response.json()).
            then(data => {

                apiCallback(data.posts)
                // WaitMessage.innerHTML = "Callback executed after 5 seconds"
                WaitMessage.innerHTML= waitmsg;

                const buttonText = createButtonText;
                callbackbtntext(buttonText);

            }).catch(error => {
                console.log("display error", error);
                // WaitMessage.innerHTML = "Please try again later..."
                WaitMessage.innerHTML = waiterrormsg;
            })

    }, 5000)

}

//Displaying data in card format
function displayapidata(posts) {
    console.log("displayapidata function called");
    // Creating Card after calling API
    const createCard = posts.map(post =>
        `<div class="card">
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        </div>`
    ).join('');
    document.getElementById("APIData").innerHTML = createCard;
}

//Disabled Button after Displying Data
function disabledButton(buttonText) {
    console.log("disabledbutton called", buttonText);
    document.getElementById('viewButton').innerHTML = buttonText
    this.disabled = true;
}

//clicking the button functionality
function viewButtonClicked() {

    //if the button is already clicked 
    if (document.getElementById('viewButton').textContent == "Data Loaded") {
        console.log("If condition.. Data has been loaded already")
        WaitMessage.innerHTML = "Data has been loaded already..."
    }else {
        console.log("else");
        viewButton("Data Loaded", disabledButton, displayapidata, "Callback executed after 5 seconds" , "Please try again later...");

    }

}
