
const viewBtn = document.getElementById('viewButton');
viewBtn("click", function () {
    console.log("button clicked");
})

//calling the view button function on click
function viewButton(createButtonText, callbackbtntext) {

    //showing msg while fetching api
    const WaitMessage = document.getElementById("WaitMessage");
    WaitMessage.innerHTML = "Please Wait, Data is Loading..."

    setTimeout(() => {

        const buttonText = createButtonText;
        callbackbtntext(buttonText);

        //Fetching API data
        fetch('https://dummyjson.com/posts').then(response => response.json()).then(data => {

            displayapidata(data.posts)
            WaitMessage.innerHTML = ""

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

    //Disabled button call after Displying Data
}
//Disabled Button after Displying Data
function disabledButton(buttonText) {
    console.log("disabledbutton called", buttonText);
    document.getElementById('viewButton').innerHTML = buttonText
}

viewButton("Data Loaded", disabledButton);

