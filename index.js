let artData = null
const bookmarkDropdown = document.querySelector("#bookmarks")
const selectBar = document.querySelector("#bookmarks")
selectBar.addEventListener("change", e => selectBookmark(e))
let currentPage = 1
const thumbnailElement = document.querySelector("#thumbnailDiv")
const pageCount = document.querySelector("#pageCount")
let bookmarks = []
function countPage () {
    pageCount.textContent = `Page: ${currentPage}`
}
fetch("https://api.artic.edu/api/v1/artworks").then(res => res.json())
.then(newartData =>renderArtData(newartData))


function renderArtData(newartData) {
    artData = [newartData]
    artData= artData[0].data
    for (let i=0; i<12; i++) {
        {
            if ((newartData.data[i].image_id) !== null) {
                // console.log(artData.data[i])
                // console.log(artData.data[i].artist_title)
                const artIdElement = document.createElement("img")
                // console.log(artIdElement)

                thumbnailElement.appendChild(artIdElement)
                artIdElement.id = newartData.data[i].id
                artIdElement.src = `https://www.artic.edu/iiif/2/${newartData.data[i].image_id}/full/843,/0/default.jpg`
                artIdElement.addEventListener('click', () => bigArt(event, i, 0))
            } 
        }
       
    }
    countPage()
    return artData
}

function bigArt(event, i, x) {
if (x==1) {
    let ID = event
    const floatDiv = document.querySelector("#float")
    floatDiv.style.display = "block"
    const xButton = document.createElement("button")
    xButton.type = "button"
    xButton.id = "exit"
    xButton.textContent = "x"
    xButton.addEventListener("click", (e)=> exit(e))
    i = artData.findIndex(e => e.id == ID.event.target.id)
    const bigImage = document.createElement("img")
    bigImage.id = ID
    bigImage.src = `https://www.artic.edu/iiif/2/${artData[i].image_id}/full/843,/0/default.jpg`
    bigImage.className = "bigImage"
    const bigDiv = document.querySelector("#float")
    bigDiv.innerHTML= ""
    bigDiv.appendChild(bigImage)
    bigDiv.appendChild(xButton)
    ID = event.event.target.id
    renderDescription(ID)
    const bookmarkButton = document.createElement("button")
    bookmarkButton.innerHTML = `&#10084;`
    bookmarkButton.id = "bookmark"
    floatDiv.appendChild(bookmarkButton)
    bookmarkButton.addEventListener("click", ID => addBookmark(ID))
} else if (x==0){
 const ID = parseInt(event.target.id)
 const floatDiv = document.querySelector("#float")
 floatDiv.style.display = "block"
 const xButton = document.createElement("button")
 xButton.type = "button"
 xButton.id = "exit"
 xButton.textContent = "x"
 xButton.addEventListener("click", (e)=> exit(e))
 const bigImage = document.createElement("img")
 bigImage.id = ID
 bigImage.src = `https://www.artic.edu/iiif/2/${artData[i].image_id}/full/843,/0/default.jpg`
 bigImage.className = "bigImage"
 const bigDiv = document.querySelector("#float")
 bigDiv.innerHTML= ""
 bigDiv.appendChild(bigImage)
 bigDiv.appendChild(xButton)
 renderDescription(ID)
 const bookmarkButton = document.createElement("button")
 bookmarkButton.innerHTML = `&#10084;`
 bookmarkButton.id = "bookmark"
 floatDiv.appendChild(bookmarkButton)
 bookmarkButton.addEventListener("click", ID => addBookmark(ID))}
}

function renderDescription(eleme) {
const ID = parseInt(eleme)
const artwork = artData.find(element => element.id == ID)
const parent = document.querySelector("#float")
const artTitle = document.createElement("H4")
parent.appendChild(artTitle)
artTitle.id = "title"
artTitle.textContent = artwork.title
const artArtist = document.createElement("h3")
artArtist.id = "artist"
parent.appendChild(artArtist)
artArtist.textContent = artwork.artist_title
const dateDisplayed = document.createElement("div")
dateDisplayed.id = "dateDisplayed"
artArtist.appendChild(dateDisplayed)
dateDisplayed.textContent = `Date displayed: ${artwork.date_display}`
const artWorkType = document.createElement("div")
artWorkType.id = "artType"
dateDisplayed.appendChild(artWorkType)
artWorkType.textContent = (`Artwork Type : ${artwork.artwork_type_title}`)
const artDimensions = document.createElement("div")
artDimensions.id = "dimensions"
artWorkType.appendChild(artDimensions)
artDimensions.textContent = `Dimensions: ${artwork.dimensions}`
}

function exit(exitEvent) {
    const floatDiv = document.querySelector("#float")
    floatDiv.style.display = "none"
}

const forwardButton = document.querySelector("#frontPage")
forwardButton.addEventListener("click", e => pageForward(e) )
function pageForward(pageEvent) {
    console.log(pageEvent)
    currentPage = currentPage +1
    thumbnailElement.innerHTML = ""
    fetch(`https://api.artic.edu/api/v1/artworks?page=${currentPage}&limit=12
    `).then(res => res.json()).then(newartData =>renderArtData(newartData))
    countPage()
    return currentPage
}

const backButton = document.querySelector("#backPage")
backButton.addEventListener("click",e => pageBack(e) )
function pageBack(pageEvent) {
    if (currentPage == 1) {
        null
    } else {
        currentPage = currentPage - 1
        thumbnailElement.innerHTML = ""
        fetch(`https://api.artic.edu/api/v1/artworks?page=${currentPage}&limit=12
        `).then(res => res.json()).then(newartData =>renderArtData(newartData))
        countPage()
        return currentPage
    }
return currentPage
}

function addBookmark(bigImage) {
const ID = bigImage.target.parentElement.firstChild.id
let title = document.querySelector("#title")
title = title.textContent
let check = bookmarks.find(element => element[0].title == title)
if (check) {
    null
} else {
let newBookmark = [{
    "event": {target: {"id": ID}},
    title: title
}]
bookmarks.push(newBookmark)
const newListMark = document.createElement("option")
newListMark.value = title
newListMark.innerHTML = title
newListMark.for = ID
selectBar.appendChild(newListMark)
return bookmarks}
return bookmarks
}
function selectBookmark(title) {
    let booktitle = title.target.value
    const book = bookmarks.find(element => element[0].title == booktitle)
    bigArt(book[0], null, 1)
}