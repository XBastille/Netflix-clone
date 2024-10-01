const apikey = "your_api_keys_here";
const apiEndpoint = "https://api.themoviedb.org/3";
const imgPath = "https://image.tmdb.org/t/p/original";


const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
const movieTitle = urlParams.get('title');


function fetchMovieDetails(movieId) {
    fetch(`${apiEndpoint}/movie/${movieId}?api_key=${apikey}`)
        .then(response => response.json())
        .then(data => {
            displayMovieDetails(data);
        })
        .catch(err => console.error(err));
}


function displayMovieDetails(movie) {
    const bannerSection = document.getElementById('movie-banner');
    const movieTitleElem = document.getElementById('movie-title');
    const movieOverviewElem = document.getElementById('movie-overview');

    bannerSection.style.backgroundImage = `url('${imgPath}${movie.backdrop_path}')`;
    movieTitleElem.textContent = movie.title;
    movieOverviewElem.textContent = movie.overview;

    fetchMovieTrailer(movie.title); 
}

function fetchMovieTrailer(movieTitle) {
    const youtubeApiKey = "AIzaSyA_eZ5WJhmYhRQOM8-jAyVIzzdfWUlp_P0"; 
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${movieTitle} trailer&key=${youtubeApiKey}`)
        .then(response => response.json())
        .then(data => {
            const videoId = data.items[0].id.videoId;
            document.getElementById('trailer-video').src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        })
        .catch(err => console.error(err));
}

document.addEventListener('DOMContentLoaded', () => {
    fetchMovieDetails(movieId);
});
