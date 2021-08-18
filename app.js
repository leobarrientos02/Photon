// Global
const auth = "563492ad6f91700001000001cf81b6f69e2042f3ae93eb40abe89298";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;

//Event Listeners
searchInput.addEventListener("input", updateInput);

// Search event listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchPhotos(searchValue);
});
//updateInput()
function updateInput(e) {
  //console.log(e.target.value);
  searchValue = e.target.value;
}

// curatedPhotos() get images from the API
async function curatedPhotos() {
  const dataFetch = await fetch(
    "https://api.pexels.com/v1/curated?per_page=15&page=1",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    }
  );
  const data = await dataFetch.json();
  //console.log(data);

  //Loop through photo object
  data.photos.forEach((photo) => {
    console.log(photo);
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `<img src=${photo.src.large}></img>
    <p id="photographer-id">Photographer:  <a href=${photo.photographer_url} target="_blank" rel="noopener noreferrer">  ${photo.photographer}</a></p>
    `;
    // Append galleryImg
    gallery.appendChild(galleryImg);
  });
}

// SearchPhotos() is used to search photos from the API
async function searchPhotos(query) {
  const dataFetch = await fetch(
    `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    }
  );
  const data = await dataFetch.json();
  //console.log(data);

  //Loop through photo object
  data.photos.forEach((photo) => {
    console.log(photo);
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `<img src=${photo.src.large}></img>
    <p id="photographer-id">Photographer:  <a href=${photo.photographer_url} target="_blank" rel="noopener noreferrer">  ${photo.photographer}</a></p>
    `;
    // Append galleryImg
    gallery.appendChild(galleryImg);
  });
}
curatedPhotos();
