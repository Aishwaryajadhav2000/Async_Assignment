
const takeDiv = document.getElementById("APIData");
const createDiv = document.createElement("div");
createDiv.className = "creatDiv"
const createPara = document.createElement("p");
createPara.className ="para"
createDiv.appendChild(createPara);
takeDiv.appendChild(createDiv);

function viewButton() {

    console.log("button Clicked")

    const myPromise = new Promise((myResolve, myReject)=> {

        //pending state
        // createPara.textContent = "Please Wait Data is Loading.";
        createPara.innerHTML = `<span>Please Wait..</span> <span> Data is Loading...</span>`


        const timeOutDuration = 5000;

        setTimeout(() => {

            if (timeOutDuration <= 5000) {

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
                    disabledButton();
                }).catch(error => {
                    myReject(error.message +  "... Please check your network connection")
                })
            } else {
                console.log("else called");
                myReject("Operation Timed Out")
            }

        }, timeOutDuration)

    })

    console.log(myPromise);

    myPromise.then(result => console.log("result calledd", result));
    myPromise.catch(error => createPara.textContent = error);

}

//Disabled Button after Displying Data
function disabledButton() {
    const viewButton = document.getElementById("viewButton");
    viewButton.disabled = true; 
    viewButton.textContent = "Data Loaded"
}