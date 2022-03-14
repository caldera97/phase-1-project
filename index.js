document.addEventListener('DOMContentLoaded', () => {
    const refreshFeedBttn = document.querySelector('#reload').addEventListener('click', () => {
        // console.log("heyulp!");
        window.location.reload(true);
    });

    // console.log('hello.its ready');
    fetch("https://api.artic.edu/api/v1/artworks").then(res => res.json())
.then(artData =>renderArtData(artData))



function renderArtData(artData) {
    const thumbnailElement = document.querySelector("#thumbnailDiv");
    const bigArtDiv = document.querySelector(".popupImageDiv");
    // const thumbnailElement = document.querySelector("#thumbnailDiv")
    let artDataArray = [artData]
    artDataArray= artDataArray[0].data
    for (let i=0; i<12; i++) {
        {
            if ((artData.data[i].image_id) !== null) {
                
                
                
                // console.log(artData.data[i])
                // console.log(artData.data[i].artist_title)
                const artIdElement = document.createElement("img");
                // console.log(artIdElement)

                thumbnailElement.appendChild(artIdElement)
                artIdElement.id = artData.data[i].id
                artIdElement.src = `https://www.artic.edu/iiif/2/${artData.data[i].image_id}/full/843,/0/default.jpg`
                
              
                artIdElement.addEventListener('click', bigArt);

                // const artNameElement = document.createElement("span");
                // console.log(artNameElement)
                // artNameElement.id = artData.data[i].name
                // artNameElement.textContent = `https://www.artic.edu/iiif/2/${artData.data[i].artist_titles}/full/843,/0/default.jpg`
                // thumbnailElement.appendChild(artNameElement)

                //info box   
                const hoverEl = document.querySelectorAll('.art-detailsBox');
          
                const artworkDetail = document.createElement('div');
                artworkDetail.id = 'main-content';
                thumbnailElement.appendChild(artworkDetail);

                //data."title" ->  "Untitled (Garvey Day Deedee in Car)"
                const artTitleEl = document.createElement('p');
                artworkDetail.appendChild(artTitleEl);
                // artTitleEl.id = artData.data[i].id;
                artTitleEl.textContent = `https://www.artic.edu/iiif/2/${artData.data[i].title}`;
                artTitleEl.textContent = 'Name : ' + artData.data[i].title;
                // console.log(artTitleEl);

                //"artist_titles"  -> "Kwame Brathwaite"
                const artistNameEl = document.createElement('p');
                artworkDetail.appendChild(artTitleEl);
                // artistNameEl.id = artData.data[i].id
                artistNameEl.textContent = `https://www.artic.edu/iiif/2/${artData.data[i].artist_titles}`;
                artistNameEl.textContent = 'Artist : ' + artData.data[i].artist_titles;

                // console.log(artistNameEl);


                //data."date_display"  -> "c. 1965, printed 2018"
                const artDateEl = document.createElement('p')
                artworkDetail.appendChild(artTitleEl);
                // artistNameEl.id = artData.data[i].id
                artDateEl.textContent = `https://www.artic.edu/iiif/2/${artData.data[i].date_display}`;
                artDateEl.textContent = 'Date : ' + artData.data[i].date_display;

                // console.log(artDateEl);

                //data."artwork_type_title" ->  "Photograph"
                const artTypeEl = document.createElement('p')
                artworkDetail.appendChild(artTypeEl);
                // artistNameEl.id = artData.data[i].id
                artTypeEl.textContent = `https://www.artic.edu/iiif/2/${artData.data[i].artwork_type_title}`;
                artTypeEl.textContent = 'Medium : ' + artData.data[i].artwork_type_title;

                // console.log(artTypeEl);


                //data."place_of_origin"  -> "American"
                const artOriginEl = document.createElement('p')
                artworkDetail.appendChild(artOriginEl);
                // artistNameEl.id = artData.data[i].id
                artOriginEl.textContent = `https://www.artic.edu/iiif/2/${artData.data[i].place_of_origin}`;
                artOriginEl.textContent = 'Origin : ' + artData.data[i].place_of_origin;

                // console.log(artOriginEl);

            
                // artIdElement.addEventListener('click', () => bigArt(event, artDataArray))
            } 
        } 
    }
}


function bigArt(event, artDataArray) {
    console.log('helloo');
    bigArtDiv = artDataArray;

function bigArt(event) {
 console.log("hello");
}

//     const bannerDiv = document.querySelector("#imgContainer")
//     bannerDiv.innerHTML = ""
//     const bannerImg = document.createElement("img")
//     console.log(artDataArray)
//     //path to image ID is e.path[0].id
//     const artInfo = artDataArray.find(e => e.id == event.path[0].id)
//     console.log(artInfo)
//     bannerDiv.append(bannerImg)
//     bannerImg.src = `https://www.artic.edu/iiif/2/${artInfo.image_id}/full/843,/0/default.jpg`

}
const commentUl = document.querySelector('#comment-ul');
const commentForm = document.querySelector('#comment-list');
commentForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const commentInput = document.querySelector('#comment-input').value;
    const newLi = document.createElement('li');
    newLi.append(commentInput);
    commentUl.append(newLi);
    commentForm.reset();
})

})