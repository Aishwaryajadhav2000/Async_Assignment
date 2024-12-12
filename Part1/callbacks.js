
const takeDiv = document.getElementById("APIData");
const createDiv = document.createElement("div");
createDiv.className = "creatDiv"
const WaitMessage = document.createElement("p");
WaitMessage.className ="para"
createDiv.appendChild(WaitMessage);
takeDiv.appendChild(createDiv);

//calling the view button function on click
function viewButton(createButtonText, callbackbtntext, apiCallback) {

    //showing msg while fetching api
    const WaitMessage = document.getElementById("WaitMessage");
    // WaitMessage.innerHTML = "Please Wait, Data is Loading..."
    WaitMessage.innerHTML = `<span>Please Wait..</span> <span> Data is Loading...</span>`

    setTimeout(() => {

        const buttonText = createButtonText;
        callbackbtntext(buttonText);

        //Fetching API data
        fetch('https://dummyjson.com/posts').then(response => response.json()).
            then(data => {

                // displayapidata(data.posts)
                apiCallback(data.posts)
                WaitMessage.innerHTML = "Callback executed after 5 seconds"

            }).catch(error => {
                console.log("display error", error);
                WaitMessage.innerHTML = "Please try again later..."
            })

    }, 5000)

}

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

    if (document.getElementById('viewButton').textContent == "Data Loaded") {
        console.log("If condition.. Data has been loaded already")
        WaitMessage.innerHTML = "Data has been loaded already..."

    } else {
        console.log("else");
        viewButton("Data Loaded", disabledButton, displayapidata);

    }

}
