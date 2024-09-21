---

# Netflix Clone

This project is a front-end Netflix clone designed to simulate the look and feel of Netflix's streaming platform. It fetches movie data from The Movie Database (TMDb) API and allows users to browse trending movies, view details, and search for specific titles. Additional features such as detailed movie pages and integrated trailers have been added.

## Live Demo

Check out the live version of the project here: [Netflix Clone](https://mynetflixx.surge.sh/)

## Features

- **Responsive Design**: The layout adapts to different screen sizes.
- **Movie Categories**: Displays various movie categories fetched from the TMDb API.
- **Trending Banner**: Showcases trending movies with a dynamic background image.
- **Search Functionality**: Allows users to search for movies and TV shows.
- **Hover Effects**: Movie cards expand on hover, displaying more information.
- **Play & Info Buttons**: Interactive buttons for movie interactions (placeholders).
- **Movie Details Page**: Clicking on a movie shows detailed information such as title, overview, and an embedded trailer from YouTube.

## New Additions

- **Movie Details Page** (`movie-details.html`): Displays a dedicated page for each movie with its title, overview, and an embedded YouTube trailer fetched based on the movie's title. The page layout and styling match the Netflix theme.
- **Dynamic Movie Details** (`movie-details.js`): Fetches detailed information for each movie using its ID from the TMDb API and displays it dynamically on the movie details page. It also integrates a YouTube API call to embed the movie trailer.
  
## Project Structure

- **HTML**:
  - `netflix.html`: The main structure of the Netflix-like homepage, which includes a header, banner section, and containers for movie lists. It links to the CSS and JavaScript files.
  - `movie-details.html`: A new page that shows detailed information about a movie, including a background banner, title, overview, and a YouTube trailer.
  
- **CSS** (`netflix.css`): Styles the webpage to resemble Netflix's UI, including a dark theme, responsive layout, and smooth hover effects. Specific styles have been added for the movie details page, such as banner styling, movie information, and action buttons.

- **JavaScript**:
  - `netflix.js`: Handles the interaction with the TMDb API, fetches movie data, dynamically builds the movie sections, and adds interactive features like search and scroll events.
  - `movie-details.js`: Handles the fetching of movie details from the TMDb API and dynamically updates the movie details page with the retrieved data. It also fetches and embeds the movie trailer from YouTube.

## API Integration

This project uses the TMDb API to fetch:
- Movie categories
- Trending movies
- Detailed information about each movie

Additionally, the YouTube API is used on the movie details page to embed trailers for each movie.

## Technologies Used

- **HTML5**
- **CSS3**
- **JavaScript (ES6)**
- **TMDb API**: Provides the movie data
- **YouTube API**: Embeds movie trailers on the details page

--- 
