document.addEventListener("DOMContentLoaded", () => {
    const movieList = document.getElementById("movieList");
    const createMovieForm = document.getElementById("createMovieForm");
    const updateMovieForm = document.getElementById("updateMovieForm");
    const deleteMovieForm = document.getElementById("deleteMovieForm");

    // Function to fetch and display movies
    function displayMovies() {
        fetch("http://localhost:5090/api/movies")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(movies => {
                movieList.innerHTML = "";  // Clear previous list
                movies.forEach(movie => {
                    const listItem = document.createElement("li");
                    listItem.textContent = `ID: ${movie.id}, Title: ${movie.title}, Description: ${movie.description}, Release Date: ${movie.releaseDate}`;
                    movieList.appendChild(listItem);
                });
            })
            .catch(error => {
                console.error("Fetch error:", error);
                movieList.innerHTML = "Error fetching movies.";
            });
    }

    // Event listener for create movie form submission
    createMovieForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const releaseDate = document.getElementById("releaseDate").value;

        fetch("http://localhost:5090/api/movies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, description, releaseDate }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                // Clear form fields after successful creation
                document.getElementById("title").value = "";
                document.getElementById("description").value = "";
                document.getElementById("releaseDate").value = "";

                // Refresh the movie list
                displayMovies();
            })
            .catch(error => {
                console.error("Fetch error:", error);
            });
    });

    // Event listener for update movie form submission
    updateMovieForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const movieId = document.getElementById("movieId").value;
        const title = document.getElementById("updateTitle").value;
        const description = document.getElementById("updateDescription").value;
        const releaseDate = document.getElementById("updateReleaseDate").value;

        fetch(`http://localhost:5090/api/movies/${movieId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: movieId, title: updateTitle, description: updateDescription, releaseDate: updateReleaseDate })
           
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                // Clear form fields after successful update
                document.getElementById("movieId").value = "";
                document.getElementById("updateTitle").value = "";
                document.getElementById("updateDescription").value = "";
                document.getElementById("updateReleaseDate").value = "";

                // Refresh the movie list
                displayMovies();
            })
            .catch(error => {
                console.error("Fetch error:", error);
            });
    });

    // Event listener for delete movie form submission
    deleteMovieForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const movieIdToDelete = document.getElementById("movieIdToDelete").value;

        fetch(`http://localhost:5090/api/movies/${movieIdToDelete}`, {
            method: "DELETE",
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                // Clear form fields after successful deletion
                document.getElementById("movieIdToDelete").value = "";

                // Refresh the movie list
                displayMovies();
            })
            .catch(error => {
                console.error("Fetch error:", error);
            });
    });

    // Initial display of movies when the page loads
    displayMovies();
});
