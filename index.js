fetch("https://api.artic.edu/api/v1/artworks").then(res => res.json())
.then(artData =>renderArtData(artData))


function renderArtData(artData) {
    const thumbnailElement = document.querySelector("#thumbnailDiv")
    const artDataArray = [artData]
    for (let i=0; i<11; i++) {
        {
            if ((artData.data[i].image_id) !== null) {
                console.log(artData.data[i])
                // console.log(artData.data[i].artist_title)
                const artIdElement = document.createElement("img")
                console.log(artIdElement)
                thumbnailElement.appendChild(artIdElement)
                artIdElement.id = artData.data[i].id
                artIdElement.src = `https://www.artic.edu/iiif/2/${artData.data[i].image_id}/full/843,/0/default.jpg`
                artIdElement.addEventListener('click', bigArt)
            } 
        }
       
    }

}

function bigArt() {
    console.log("i got clicked!")
}
