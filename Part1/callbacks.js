
//declaring it here so it can be use everytime and no need to declare everywhere
const displayingData = document.getElementById("APIData");

//calling the view button function on click
function viewButton(createButtonText, callbackbtntext, apiCallback, waitmsg, waiterrormsg) {

    //showing msg while fetching api
    const WaitMessage = document.getElementById("WaitMessage");
    WaitMessage.innerHTML = `<span>Please Wait , </span> <span> Data is Loading...
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
   </svg>
    </span>`

    setTimeout(() => {

        //Fetching API data
        fetch('https://dummyjson.com/posts').then(response => {
            //if got an error while fetching api
            if (!response.ok) {
                WaitMessage.innerHTML = `${waiterrormsg} ${response.status} ${response.statusText}`;
            }
            return response.json();
        }).
            then(data => {
                console.log("response", data);

                //If the data structure is not in array format then it will throw an error 
                if (!Array.isArray(data.posts)) {
                    WaitMessage.innerHTML = "Invalid data structure received from API";
                    throw new Error("Invalid data structure received from API");
                }
                apiCallback(data.posts)
                WaitMessage.innerHTML = waitmsg;

                const buttonText = createButtonText;
                callbackbtntext(buttonText);

            }).catch(error => {
                console.log("API Fetch error", error);
                // WaitMessage.innerHTML = "Please try again later..."
                WaitMessage.innerHTML = waiterrormsg;
                throw new Error(waiterrormsg);
            })
    }, 5000)
}

//Creating another function to fetch api and error handling
// function fetchAPI(successfull , callbackerrors){
// fetch('https://dummyjson.com/posts').then((response) => {
//     if (!response.ok) {
//         WaitMessage.innerHTML = `${waiterrormsg} ${response.status} ${response.statusText}`;
//     }
//     return response.json();
// }).then((data) => successfull(data))
// .catch((error)=>callbackerrors(error));
// }

//Displaying data in card format
function displayapidata(posts) {
    console.log("displayapidata function called");

    //If there is no posts then will show error
    if (!posts || posts.length == 0) {
        displayingData.innerHTML = "<p>No Posts are available to display</p>"
        // document.getElementById("APIData").innerHTML = "<p>No Posts are available to display</p>"
    }

    // Creating and displaying Cards after calling API
    const createCard = posts.map(post =>
        `<div class="card">
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        </div>`
    ).join('');
    displayingData.innerHTML = createCard
    // document.getElementById("APIData").innerHTML = createCard;
}

//Disabled Button after Displying Data
//changing button text after displaying data
function disabledButton(buttonText) {
    console.log("disabledbutton called", buttonText);
    document.getElementById('viewButton').innerHTML = buttonText
    this.disabled = true;
}

//clicking the button functionality
function viewButtonClicked() {

    //Hide popup after clicking on button
    document.getElementById("toggle").style.display = "none";

    //Changing the button position style after clicking on button
    document.getElementById("viewButton").style.position = "relative"

    //Checking if data is already Loaded 
    if (document.getElementById('viewButton').textContent == "Data Loaded") {
        console.log("If condition.. Data has been loaded already")
        WaitMessage.innerHTML = "Data has been loaded already..."
    } else {
        console.log("else, button is clicked now");
        viewButton("Data Loaded", disabledButton, displayapidata, "Callback executed after 5 seconds", "Please try again later...");
    }
}
