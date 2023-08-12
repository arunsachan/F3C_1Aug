
const apiKeyInput = document.getElementById("apiKeyInput");
const movieTitleInput = document.getElementById("movieTitleInput");
const searchButton = document.getElementById("searchButton");
const loader = document.getElementById("loader");
const results = document.getElementById("results");

searchButton.addEventListener("click", searchMovies);

async function searchMovies() {
  const apiKey = apiKeyInput.value;
  const movieTitle = movieTitleInput.value;

  if (!apiKey || !movieTitle) {
    alert("Please enter API key and movie title.");
    return;
  }

  showLoader();

  const apiUrl = `https://www.omdbapi.com/?s=${encodeURIComponent(movieTitle)}&apikey=${encodeURIComponent(apiKey)}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    if (data.Response === "True") {
      displayResults(data.Search);
    } else {
      showError(data.Error);
    }
  } catch (error) {
    showError("An error occurred while fetching data.");
  }

  hideLoader();
}

function showLoader() {
  loader.classList.remove("hidden");
  results.innerHTML = "";
}

function hideLoader() {
  loader.classList.add("hidden");
}

function displayResults(movies) {
  results.innerHTML = "";
  movies.forEach(movie => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    movieCard.innerHTML = `
      <img src="${movie.Poster}" alt="${movie.Title} Poster">
      <h2>${movie.Title} (${movie.Year})</h2>
      <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank">More Details</a>
    `;
    results.appendChild(movieCard);
  });
  results.classList.remove("hidden");
}

function showError(message) {
  results.innerHTML = `<p class="error">${message}</p>`;
  results.classList.remove("hidden");
}