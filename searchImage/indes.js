const accessKey = "kjkwuFUXh_fPSfV89nDutB_KiHzuNeZHqRXmtyt-9AI";

const form = document.querySelector("form");
const searchInput = document.getElementById("search-input")
const searchResults = document.querySelector(".search-results")
const showMoreButton = document.getElementById("show-more-button")

//user input search
let inputData = "";
let page = 1;

async function searchImages(){
    inputData = searchInput.value;
    console.log(inputData);
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    console.log(url);
    const response = await fetch(url);
    const data = await response.json(); //from method  javascript
    console.log(data);
        if (page===1){ 
            searchResults.innerHTML=""; //make it empty
        }
        const results = data.results;

        results.map((result)=>{
            //create the div
            const imageWrapper = document.createElement("div");
            imageWrapper.classList.add("search-result");
            const image = document.createElement("img")
            image.src = result.urls.small;
            image.alt = result.alt_description;
            //anchor tag
            const imageLink = document.createElement("a");
            //change href
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.textContent = result.alt_description;

            //append image url and achor tag inside div
            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);
            searchResults.appendChild(imageWrapper);


        });
        page++;
        console.log(page);


        if (page > 1){
            showMoreButton.style.display = "block"; //string
        }
        console.log(results);
}

form.addEventListener("submit",(event)=>{
    event.preventDefault(); //prevent default refresh
    console.log("Submitted");
    page = 1; //when submit form, the page is 1
    searchImages();

})

showMoreButton.addEventListener("click",()=>{
    searchImages();
})