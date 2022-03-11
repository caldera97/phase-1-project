fetch("https://api.artic.edu/api/v1/artworks").then(res => res.json())
.then(artData =>renderArtData(artData))


function renderArtData(artData) {
    const thumbnailElement = document.querySelector("#thumbnailDiv")
    let artDataArray = [artData]
    artDataArray= artDataArray[0].data
    for (let i=0; i<12; i++) {
        {
            if ((artData.data[i].image_id) !== null) {
                // console.log(artData.data[i])
                // console.log(artData.data[i].artist_title)
                const artIdElement = document.createElement("img")
                // console.log(artIdElement)

                thumbnailElement.appendChild(artIdElement)
                artIdElement.id = artData.data[i].id
                artIdElement.src = `https://www.artic.edu/iiif/2/${artData.data[i].image_id}/full/843,/0/default.jpg`
                artIdElement.addEventListener('click', () => bigArt(event, artDataArray))
            } 
        }
       
    }

}



function bigArt(event) {
 console.log("hello");
}


