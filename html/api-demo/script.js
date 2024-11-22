const API_URL = 'https://www.omdbapi.com/?apikey=b30aaa20';

    // Fetch movie by IMDb ID (example)
    function callAPImovies() {
      const movieId = 'tt3896198';
      const url = `${API_URL}&i=${movieId}`;

      fetch(url)
        .then(response => response.json())
        .then(json => {
          console.log(json);
          document.querySelector("#movie_id").innerHTML = json.imdbID || 'N/A';
          document.querySelector("#movie_title").innerHTML = json.Title || 'N/A';
          document.querySelector("#movie_year").innerHTML = json.Year || 'N/A';
          document.querySelector("#movie_poster").innerHTML = `<img src="${json.Poster || 'N/A'}" />`;
        })
        .catch(error => console.error('Error fetching the API:', error));
    }

    function getTopMovies() {
      const searchQuery = 'action'; 
      const type = 'movie';  
    
      const url = `${API_URL}&s=${searchQuery}&type=${type}`;

      fetch(url)
        .then(response => response.json())
        .then(json => {
          if (json.Response === "True") {
            const sortedMovies = json.Search.sort((a, b) => parseFloat(b.imdbRating) - parseFloat(a.imdbRating));
            
            const topMovies = sortedMovies.slice(0, 10);

            let movieListHtml = '';
            topMovies.forEach((movie, index) => {
              movieListHtml += `
                <div>
                  <h3>${index + 1}. ${movie.Title} (${movie.Year})</h3>
                  <p><strong>IMDb Rating:</strong> ${movie.imdbRating}</p>
                  <img src="${movie.Poster}" alt="${movie.Title} Poster" style="width: 150px;">
                </div>
              `;
            });

            document.querySelector("#movie_list").innerHTML = movieListHtml;
          } else {
            console.error('Error fetching movies:', json.Error);
          }
        })
        .catch(error => console.error('Error fetching the API:', error));
    }

const apiKey = 'cbb0b276f1724b6fb1420151241811';
// Change this to the city you want to search
const city = 'Tandag'; 

function callAPIweather() {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);

        document.querySelector("#weather_city").textContent = data.location.name || 'N/A';
        document.querySelector("#weather_temperature").textContent = `${data.current.temp_c}°C` || 'N/A';
        document.querySelector("#weather_condition").textContent = data.current.condition.text || 'N/A';
    });
  }

  function fetchRandomMeal() {
    const url = 'https://www.themealdb.com/api/json/v1/1/random.php';

    fetch(url)
      .then(response => response.json()) // Parse the JSON response
      .then(data => {
        const meal = data.meals[0]; // Extract meal data from the API response

        // Update the meal container with fetched meal details
        const mealContainer = document.querySelector('#meal-container');
        mealContainer.innerHTML = `
          <div class="meal-info">
            <h2>${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <p><strong>Category:</strong> ${meal.strCategory}</p>
            <p><strong>Area:</strong> ${meal.strArea}</p>
            <p><strong>Tags:</strong> ${meal.strTags}</p>
          </div>
          <div class="ingredients">
            <p><strong>Ingredients:</strong></p>
            <ul>
              ${getIngredients(meal)}
            </ul>
          </div>
          <div class="instructions">
            <p><strong>Instructions:</strong></p>
            <p>${meal.strInstructions}</p>
            <p><strong>Source:</strong> <a href="${meal.strSource}" class="link" target="_blank">Recipe Source</a></p>
            <p><strong>Watch on YouTube:</strong> <a href="${meal.strYoutube}" class="link" target="_blank">Video Link</a></p>
          </div>
        `;
      })
      .catch(error => {
        console.error('Error:', error);
        document.querySelector('#meal-container').innerHTML = '<p>Error fetching the recipe.</p>';
      });
  }

  function getIngredients(meal) {
    let ingredientsHtml = '';
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== '') {
        ingredientsHtml += `<li>${measure} ${ingredient}</li>`;
      }
    }
    return ingredientsHtml;
  }