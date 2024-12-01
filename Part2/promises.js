

// const viewButon = document.getElementById("viewButton").addEventListener("click")

// viewButon = new Promise(function (resolve , reject){

// })

const takeDiv = document.getElementById("APIData");
const createDiv = document.createElement("div");
const createPara = document.createElement("p");
createPara.className ="para"
createDiv.appendChild(createPara);
takeDiv.appendChild(createDiv);

function viewButton() {

    const myPromise = new Promise((myResolve, myReject)=> {

        //pending state
        createPara.textContent = "Wait Data is Loading";

        const timeOutDuration = 2000;

        setTimeout(() => {


            if (timeOutDuration < 5000) {

                fetch("https://dummyjson.com/posts").then(response => response.json())
                .then(data => {
                    const createCard = data.posts.map(post =>
                        `<div class="card">
                     <h3>${post.title}</h3>
                      <p >${post.body}</p>
                      </div>`
                    ).join('');

                    takeDiv.innerHTML = createCard;
                    myResolve("Successfull");
                })

                disabledButton();

            } else {
                console.log("else called");
                myReject("Operation Timed Out")
            }

        }, timeOutDuration)

    })

    console.log(myPromise);

    myPromise.then(result => console.log("result calledd", result));
    myPromise.catch(err => createPara.textContent = err);

}

//Disabled Button after Displying Data
function disabledButton() {
    const viewButton = document.getElementById("viewButton");
    viewButton.disabled = true; 
}