
//calling the view button function on click
function viewButton() {

    //showing msg while fetching api
    const WaitMessage = document.getElementById("WaitMessage");
    WaitMessage.innerHTML = "Please Wait, Data is Loading..."

    setTimeout(() => {

        //Fetching API data
        fetch('https://dummyjson.com/posts').then(response => response.json()).then(data => {

            // displayapidata(data.posts)
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
    disabledButton();

}
//Disabled Button after Displying Data
function disabledButton() {
    const viewButton = document.getElementById("viewButton");
    viewButton.disabled = true;
    viewButton.innerHTML = "Data Loaded"
}