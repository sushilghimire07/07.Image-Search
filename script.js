const accessKey = "XPouM2ziLVwFMrBxwvXQ6eO3xinvnA3POZDKDu6T18o";
const searchForm = document.querySelector("form");
const imagesContainer = document.querySelector(".images-container");
const searchInput = document.querySelector(".search-input");
const loadMoreBtn = document.querySelector(".loadMoreBtn");
let page = 1;

const fetchImages = async (query, pageNO) => {
  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNO}&client_id=${accessKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Clear previous images if it's a new search
    if (pageNO === 1) {
      imagesContainer.innerHTML = "";
    }

    if (data.results.length > 0) {
      // Display images
      data.results.forEach((photo) => {
        const imageElement = document.createElement("div");
        imageElement.classList.add("imageDiv");
        imageElement.innerHTML = `<img src="${photo.urls.regular}" alt="${photo.alt_description}">`;

        // Create overlay
        const overlayElement = document.createElement("div");
        overlayElement.classList.add("overlay");

        imageElement.appendChild(overlayElement); // Append overlay to imageElement
        imagesContainer.appendChild(imageElement);

        // Create overlay text
        const overlayText = document.createElement("h3");
        overlayText.innerText = `${photo.alt_description.toUpperCase()}`;

        overlayElement.appendChild(overlayText);
        imageElement.appendChild(overlayElement);
      });
    } else {
      imagesContainer.innerHTML = `<h2>No images found for "${query}"</h2>`;
    }

    if (data.total_pages === pageNO) {
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.style.display = "block";
    }
  } catch (error) {
    console.error("Error fetching images:", error);
    imagesContainer.innerHTML = `<h2>Error fetching images</h2>`;
  }
};

// To search when clicking enter
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputText = searchInput.value.trim();
  if (inputText !== "") {
    page = 1;
    fetchImages(inputText, page);
  } else {
    imagesContainer.innerHTML = `<h2>Please enter a search query</h2>`;
  }
});

// Adding Event Listener to load more button to fetch more images
loadMoreBtn.addEventListener("click", () => {
  fetchImages(searchInput.value.trim(), ++page);
});

// Adding Event Listner to load more button to fetch more images

loadMoreBtn.addEventListener("click", () => {
  fetchImages(searchInput.value.trim(), ++page);
});
