
const takeDiv = document.getElementById("APIData");
const createDiv = document.createElement("div");
createDiv.className = "creatDiv"
const createPara = document.createElement("p");
createPara.className ="para"
createDiv.appendChild(createPara);
takeDiv.appendChild(createDiv);

async function viewButton() {

    createPara.innerHTML = "Please Wait Data is Loading.";

    console.log("button clicked");

    try {
        const response = await fetch("https://dummyjson.com/posts");
        const result = await response.json();
        createCards(result);
    } catch (error) {
        console.log("error", error);
    }

    disabledButton();
}
function createCards(result) {

    const createCard = result.posts.map(post =>
        ` <div class="card">
         <h3>${post.title}</h3>
        <p>${post.body}</p>
        </div>`
    ).join('');
    takeDiv.innerHTML = createCard;

    

}

//Disabled Button after Displying Data
function disabledButton() {
    const viewButton = document.getElementById("viewButton");
    viewButton.disabled = true; 
    viewButton.textContent = "Data Loaded";
}




