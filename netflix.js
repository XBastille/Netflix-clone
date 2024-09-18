const apikey = "e950e51d5d49e85f7c2f17f01eb23ba3";
const apiEndpoint = "https://api.themoviedb.org/3"
const imgPath = "https://image.tmdb.org/t/p/original";


const apiPaths = {
    fetchAllCategories: `${apiEndpoint}/genre/movie/list?api_key=${apikey}`,
    fetchMoviesList: (id) => `${apiEndpoint}/discover/movie?api_key=${apikey}&with_genres=${id}`,
    fetchTrending:`${apiEndpoint}/trending/all/day?api_key=${apikey}&language=en-US`,
    searchOnYoutube: (query) => `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=AIzaSyA_eZ5WJhmYhRQOM8-jAyVIzzdfWUlp_P0`
}

function init() {
    fetchTrendingMovies();
    fetchAndBuildAllSections();
}

function fetchTrendingMovies() {
    fetchAndbuildMovieSection(apiPaths.fetchTrending, 'Trending Now')
        .then(list => {
            const randomIndex = parseInt(Math.random() * list.length);
            buildBannerSection(list[randomIndex]);
        })
        .catch(err => {
            console.error(err);
        });
}


function buildBannerSection(movie){
    const bannerCont = document.getElementById('banner-section');
    
    bannerCont.style.backgroundImage = `url('${imgPath}${movie.backdrop_path}')`;

    const div = document.createElement('div');

    div.innerHTML = `
            <h2 class="banner__title">${movie.title}</h2>
            <p class="banner__info">Trending in movies | Released - ${movie.release_date} </p>
            <p class="banner__overview">${movie.overview && movie.overview.length > 200 ? movie.overview.slice(0,200).trim()+ '...':movie.overview}</p>
            <div class="action-buttons-cont">
                <button class="action-button"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path></svg> &nbsp;&nbsp; Play</button>
                <button class="action-button"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" fill="currentColor"></path></svg> &nbsp;&nbsp; More Info</button>
            </div>
        `;
    div.className = "banner-content container";

    bannerCont.append(div);
}


function fetchAndBuildAllSections(){
    fetch(apiPaths.fetchAllCategories)
    .then(res => res.json())
    .then(res => {
        const categories = res.genres;
        if (Array.isArray(categories) && categories.length) {
            categories.forEach(category => {
                fetchAndbuildMovieSection(
                    apiPaths.fetchMoviesList(category.id),
                    category.name
                );
            });
        }
    })
    .catch(err=>console.error(err));
}

function fetchAndbuildMovieSection(fetchUrl, categoryName) {
    console.log(fetchUrl, categoryName);
    return fetch(fetchUrl)
        .then(res => res.json())
        .then(res => {
            const movies = res.results;
            if (Array.isArray(movies) && movies.length) {
                buildMoviesSection(movies.slice(0, 6), categoryName); 
            }
            return movies;
        })
        .catch(err => console.error(err));
}

function buildMoviesSection(list, categoryName) {
    const moviesCont = document.getElementById('movies-cont');

    const sectionClass = categoryName === 'Trending Now' ? 'trending-now-section' : ''; 

    const moviesListHTML = list.map(item => {
        const title = item.title || item.name;
        const releaseDate = item.release_date || item.first_air_date;

        const imagePath = categoryName === 'Trending Now' && item.poster_path 
            ? `${imgPath}${item.poster_path}`  
            : `${imgPath}${item.backdrop_path}`;  

        return `
        <div class="movie-item">
            <img class="move-item-img" src="${imagePath}" alt="${title}" />
            <div class="movie-info-overlay">
                <h3>${title}</h3>
                <p>Release Date: ${releaseDate}</p>
            </div>
        </div>`;
    }).join('');

    const moviesSectionHTML = `
        <h2 class="movie-section-heading">${categoryName} <span class="explore-nudge">Explore All</span></h2>
        <div class="movies-row ${sectionClass}">
            ${moviesListHTML}
        </div>
    `;

    const div = document.createElement('div');
    div.className = "movies-section";
    div.innerHTML = moviesSectionHTML;
    moviesCont.append(div);
}


function showMovieInfo(element) {
    const infoOverlay = element.querySelector('.movie-info-overlay');
    infoOverlay.style.display = 'block';
}

function hideMovieInfo(element) {
    const infoOverlay = element.querySelector('.movie-info-overlay');
    infoOverlay.style.display = 'none';
}

function searchMovieTrailer(movieName, iframId) {
    if (!movieName) {
      return;
    }

    fetch(apiPaths.searchOnYoutube(movieName))
    .then(res => res.json())
    .then(res => {
        const bestResult = res.items[0];
        
        const elements = document.getElementById(iframId);
        console.log(elements, iframId);

        const div = document.createElement('div');
        div.innerHTML = `<iframe width="245px" height="150px" src="https://www.youtube.com/embed/${bestResult.id.videoId}?autoplay=1&controls=0"></iframe>`
// window.open(youtubeUrl,'_blank');
        elements.append(div);
        
    })
    .catch(err=>console.log(err));
}



window.addEventListener('load',function() {
    init();
    window.addEventListener('scroll', function(){
        const header = document.getElementById('header');
        if (window.scrollY > 5) {
          header.classList.add('black-bg')
        } else header.classList.remove('black-bg');
    })
})

function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

document.querySelector('.search-icon').addEventListener('click', function() {
    document.body.classList.add('modal-active');
});

document.getElementById('search-modal').addEventListener('click', function(event) {
    if (event.target === this) {
        document.body.classList.remove('modal-active');
    }
});

document.getElementById('search-bar').addEventListener('input', debounce(function(event) {
    const query = event.target.value.trim();
    if (query.length > 2) { 
        searchMovies(query);
    }
}, 500)); 

function searchMovies(query) {
    fetch(`${apiEndpoint}/search/multi?api_key=${apikey}&query=${query}`)
        .then(response => response.json())
        .then(data => {
            displaySearchResults(data.results);
        })
        .catch(err => console.error(err));
}

function displaySearchResults(results) {
    const searchModal = document.getElementById('search-modal');
    const resultContainer = document.createElement('div');
    resultContainer.className = 'search-results-grid';
    resultContainer.innerHTML = ''; 

    if (results && results.length > 0) {
        results.forEach(item => {
            const imgSrc = item.poster_path ? `${imgPath}${item.poster_path}` : '';
            const title = item.title || item.name;
            const resultDiv = document.createElement('div');
            resultDiv.className = 'search-result-item';
            resultDiv.innerHTML = `
                <img class="search-result-img" src="${imgSrc}" alt="${title}">
                <p>${title}</p>
            `;
            resultContainer.appendChild(resultDiv);
        });
    } else {
        resultContainer.innerHTML = '<p>No results found</p>';
    }

    const existingResults = document.querySelector('.search-results-grid');
    if (existingResults) {
        existingResults.remove(); 
    }
    searchModal.appendChild(resultContainer);
}
