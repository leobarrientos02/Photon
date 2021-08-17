// Global
const auth = "563492ad6f91700001000001cf81b6f69e2042f3ae93eb40abe89298";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const submitBtn = document.querySelector(".submit-btn");
let searchValue;

// Functions
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
    <p>Photographer:  <a href=${photo.photographer_url} target="_blank" rel="noopener noreferrer">  ${photo.photographer}</a></p>
    `;
    // Append galleryImg
    gallery.appendChild(galleryImg);
  });
}
curatedPhotos();
