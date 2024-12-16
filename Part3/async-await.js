
const takeDiv = document.getElementById("APIData");
const createDiv = document.createElement("div");
createDiv.className = "creatDiv"
const createPara = document.createElement("p");
createPara.className = "para"
createDiv.appendChild(createPara);
takeDiv.appendChild(createDiv);

//Onclick function
async function viewButton() {

    //Hide popup after clicking on button
    document.getElementById("toggle").style.display = "none";

    //Changing the button position style after clicking on button
    document.getElementById("viewButton").style.position = "relative"

    //displaying wait message
    createPara.innerHTML = "Please Wait Data is Loading.";

    console.log("button clicked");

    try {
        //Fetching API and storing it in response object
        const response = await fetch("https://dummyjson.com/posts");

        //store the response in result
        const result = await response.json();
        console.log("result", result)

        //Creating Cards
        createCards(result);
    } catch (error) {
        console.log("error", error);
        createPara.innerHTML = error.message;

        //Network error and wrong API error will show different message
        if (error.message == "Failed to fetch") {
            createPara.innerHTML = error.message + "... Please check your network connection";
        }else if(error instanceof SyntaxError){
            createPara.innerHTML = "Please check your API..."
        }else{
            createPara.innerHTML = error.message; 
        }
    }

}

//Creating cards function
function createCards(result) {
    const createCard = result.posts.map(post =>
        ` <div class="card">
         <h3>${post.title}</h3>
        <p>${post.body}</p>
        </div>`
    ).join('');
    takeDiv.innerHTML = createCard;

    //Disabled button after displaying data
    disabledButton();

    //Displaying message above the cards
    document.getElementById("message").textContent = "DATA FETCH SUCCESSFULLY..."

}

//Disabled Button after Displying Data
function disabledButton() {
    const viewButton = document.getElementById("viewButton");
    viewButton.disabled = true;

    //Displaying Text on button
    viewButton.textContent = "Data Loaded";
}




