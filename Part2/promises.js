
const takeDiv = document.getElementById("APIData");
const createDiv = document.createElement("div");
createDiv.className = "creatDiv"
const createPara = document.createElement("p");
createPara.className = "para"
createDiv.appendChild(createPara);
takeDiv.appendChild(createDiv);

function viewButton() {

    console.log("button Clicked");

    //Hide popup after clicking on button
    document.getElementById("toggle").style.display = "none";
    //Changing the button position style after clicking on button
    document.getElementById("viewButton").style.position = "relative"

    const myPromise = new Promise((myResolve, myReject) => {

        //pending state
        createPara.innerHTML = `<span>Please Wait..</span> <span> Data is Loading...</span>`

        //declaring timeoutduration 
        const timeOutDuration = 5000;

        setTimeout(() => {

            //If it tooks more than 5 seconds to fetch data
            if (timeOutDuration <= 5000) {
                fetch("https://dummyjson.com/posts").then(response => {
                    console.log("response", response)
                    if (!response.ok) {
                        createPara.innerHTML = `${waiterrormsg} ${response.status} ${response.statusText}`;
                    }
                    return response.json()
                })
                    .then(data => {
                        const createCard = data.posts.map(post =>
                            `<div class="card">
                     <h3>${post.title}</h3>
                      <p >${post.body}</p>
                      </div>`
                        ).join('');

                        takeDiv.innerHTML = createCard;
                        myResolve("Data Fetch Successfully...");
                        disabledButton();
                    }).catch(error => {
                        console.log("error", error);

                        //Error message for different type of error
                        if (error.message == "Failed to fetch") {
                            myReject(error.message + "... Please check your network connection")
                        } else if (error instanceof ReferenceError) {
                            myReject("Please check your API")
                        } else {
                            myReject(error.message)
                        }
                    })
            } else {
                console.log("else called");

                //Displaying Error
                myReject("Operation Timed Out")
            }
        }, timeOutDuration)

    })

    console.log("mypromise", myPromise);

    //Resolve ==> will show message "Data fetch successfully"
    myPromise.then(result => document.getElementById("message").textContent = result);

    //Reject ==> will show error message
    myPromise.catch(error => createPara.textContent = error);

}

//Disabled Button after Displying Data
function disabledButton() {
    const viewButton = document.getElementById("viewButton");
    viewButton.disabled = true;

    //button text chang after displaying data
    viewButton.textContent = "Data Loaded"
}