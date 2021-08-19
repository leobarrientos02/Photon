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

//updateInput() event listener is used to search for images
function updateInput(e) {
  //console.log(e.target.value);
  searchValue = e.target.value;
} // Ends updateInput()

// FetchAPI is used to not need to rewrite the same code over.
async function fetchAPI(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
} // Ends fetchAPI()

// generatePictures() is used to get the images from the API
function generatePictures(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
            <div class="gallery-info">
            <a id="photographer" href=${photo.photographer_url} target="_blank" rel="noopener noreferrer">${photo.photographer}</a>
            <a href=${photo.src.original} target="_blank" rel="noopener noreferrer">Download</a>
            </div>
            <img src=${photo.src.large}></img>
            `;
    gallery.appendChild(galleryImg);
  });
}

// curatedPhotos() get images from the API
async function curatedPhotos() {
  const data = await fetchAPI(
    "https://api.pexels.com/v1/curated?per_page=15&page=1"
  );
  generatePictures(data);
} // Ends curatedPhotos()

// clear() is used to clear the screen from previous images
function clear() {
  gallery.innerHTML = "";
  // resets the search bar
  searchInput.value = "";
} // ends clear()

// SearchPhotos() is used to search photos from the API
async function searchPhotos(query) {
  // Call clear() first to clear old images
  clear();
  const data = await fetchAPI(
    `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`
  );
  generatePictures(data);
} // Ends searchPhotos()

// Function call
curatedPhotos();
