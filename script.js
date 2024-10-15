let dbMovies = [];

document.getElementById('download-excel-btn').addEventListener('click', () => {
   const worksheet = XLSX.utils.json_to_sheet(dbMovies);
   const workbook = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(workbook, worksheet, "Movies");

   XLSX.writeFile(workbook, "movies.xlsx");
});



document.getElementById('search-form').addEventListener('submit', async (e) => {
   e.preventDefault();
   const searchTitle = document.getElementById('search-title').value;
   const response = await fetch('api/fetch_api_movies.php?title=' + encodeURIComponent(searchTitle));
   const movies = await response.json();
   displaySearchResults(movies);
});


function displaySearchResults(movies) {
   const grid = document.getElementById('api-movies-grid');
   grid.innerHTML = '';

   if (movies.Response === 'True' && movies.Search) {
      movies.Search.forEach(movie => {
         const item = document.createElement('div');
         item.className = 'grid-item';
         item.innerHTML = `
                <h3>${movie.Title}</h3>
                <p>Año: ${movie.Year}</p>
                <img src="${movie.Poster}" alt="${movie.Title} Poster" style="width: 100px; height: auto;">
                <button class="add-to-db-btn" 
                    data-title="${movie.Title}" 
                    data-year="${movie.Year}"
                    data-imdbid="${movie.imdbID}"
                >Agregar a Base de Datos</button>
            `;
         grid.appendChild(item);
      });

      const buttons = document.querySelectorAll('.add-to-db-btn');
      buttons.forEach(button => {
         button.addEventListener('click', async (e) => {
            const title = e.target.getAttribute('data-title');
            const year = e.target.getAttribute('data-year');
            const imdbID = e.target.getAttribute('data-imdbid');

            const movieExists = dbMovies.some(movie => movie.imdbID === imdbID);
            if (movieExists) {
               alert('La película ya está en la base de datos.');
               return;
            }

            const response = await fetch('api/add_movie.php', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                  title: title,
                  year: year,
                  imdbID: imdbID,
               }),
            });

            const result = await response.json();
            if (result.success) {
               alert('Película agregada a la base de datos exitosamente');
               fetchDbMovies();
            } else {
               alert('Error al agregar la película a la base de datos');
            }
         });
      });
   } else {
      grid.innerHTML = `<p>${movies.Error}</p>`;
   }
}


async function fetchDbMovies() {
   const response = await fetch('api/fetch_db_movies.php');
   dbMovies = await response.json();
   displayDbMovies(dbMovies);
}


function displayDbMovies(movies) {
   const grid = document.getElementById('db-movies-grid');
   grid.innerHTML = '';

   movies.forEach(movie => {
      const item = document.createElement('div');
      item.className = 'grid-item';
      item.innerHTML = `
            <h3>${movie.title}</h3>
            <p>Año: ${movie.year}</p>
            <p>Director: ${movie.director}</p>
            <p>Género: ${movie.genre}</p>
            <p>IMDB ID: ${movie.imdbID}</p>
        `;
      grid.appendChild(item);
   });
}


document.getElementById('db-search-title').addEventListener('input', filterDbMovies);
function filterDbMovies() {
   const searchValue = document.getElementById('db-search-title').value.toLowerCase();
   if (searchValue === '') {
      displayDbMovies(dbMovies);
   } else {
      const filteredMovies = dbMovies.filter(movie => movie.title.toLowerCase().includes(searchValue));
      displayDbMovies(filteredMovies);
   }
}


window.onload = () => {
   fetchDbMovies();
};
