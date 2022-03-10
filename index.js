fetch("https://api.artic.edu/api/v1/artworks").then(res => res.json())
.then(artData =>renderArtData(artData))


function renderArtData(artData) {
    const thumbnailElement = document.querySelector("#thumbnailDiv")
    let artDataArray = [artData]
    artDataArray= artDataArray[0].data
    for (let i=0; i<12; i++) {
        {
            if ((artData.data[i].image_id) !== null) {
                const artIdElement = document.createElement("img")
                thumbnailElement.appendChild(artIdElement)
                artIdElement.id = artData.data[i].id
                artIdElement.src = `https://www.artic.edu/iiif/2/${artData.data[i].image_id}/full/843,/0/default.jpg`
                artIdElement.addEventListener('click', () => bigArt(event, artDataArray))
            } 
        }
       
    }

}

function bigArt(event, artDataArray) {
    const bannerDiv = document.querySelector("#imgContainer")
    bannerDiv.innerHTML = ""
    const bannerImg = document.createElement("img")
    console.log(artDataArray)
    //path to image ID is e.path[0].id
    const artInfo = artDataArray.find(e => e.id == event.path[0].id)
    console.log(artInfo)
    bannerDiv.append(bannerImg)
    bannerImg.src = `https://www.artic.edu/iiif/2/${artInfo.image_id}/full/843,/0/default.jpg`

}
