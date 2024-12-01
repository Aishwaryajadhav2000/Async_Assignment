
//calling the view button function on click
function viewButton() {

    const WaitMessage = document.getElementById("WaitMessage");

    WaitMessage.innerHTML = "Please Wait Data is Loading."

    setTimeout(() => {

        fetch('https://dummyjson.com/posts').then(response => response.json()).then(data => {

            displayapidata(data.posts)

            WaitMessage.innerHTML = ""
        })

    }, 3000)

}

function displayapidata(posts) {

    // const card = document.createElement("div");
    // card.innerHTML = `
    // <h3>${posts.title}</h3>
    // <p>${posts.body}</p>`;
    // document.getElementById("APIData").appendChild(card);

    const createCard = posts.map(post =>
        `<div class="card">
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        </div>`
    ).join('');

    document.getElementById("APIData").innerHTML = createCard;

    disabledButton();


}
//Disabled Button after Displying Data
function disabledButton() {
    const viewButton = document.getElementById("viewButton");
    viewButton.disabled = true;
}