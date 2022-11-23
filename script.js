const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=acc332cca3be1491ed13d94125158689&page1"
const IMG_PATH = "https://image.tmdb.org/t/p/w1280"
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie?&api_key=acc332cca3be1491ed13d94125158689&query=''"


const main = document.getElementById("main")
const form = document.getElementById("form")
const search = document.getElementById("search")



getmovies(API_URL)


async function getmovies(url) {
    const res = await fetch(url)
    const data = await res.json()
    showMovies(data.results)
    console.log(data)
}

function showMovies(movies) {
    main.innerHTML = ""
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie


        const movieEl = document.createElement("div")
        movieEl.classList.add("movie")

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
       `
        main.appendChild(movieEl)
    })
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green"
    } else if (vote >= 5) {
        return "orange"
    } else {
        return "red"
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const searchTerm = search.value
    if (searchTerm && searchTerm !== "") {
        getmovies(SEARCH_URL + searchTerm)
    } else {
        window.location.reload()
    }
})