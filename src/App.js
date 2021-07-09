import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);



  const fetchMovieshandler_ASAW = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://react-http-d6e60-default-rtdb.europe-west1.firebasedatabase.app/movies.json');
      if (!response.ok) {
        throw new Error('Something went Wrong');
      }
      const data = await response.json();
      
      const loadedMovies = [];

      for(const key in data){
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        })
      }


      // const transformedMovies = data.map(movieData => {
      //   return {
      //     id: movieData.episode_id,
      //     title: movieData.title,
      //     openingText: movieData.opening_crawl,
      //     releaseDate: movieData.release_date
      //   };
      // });
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);


  useEffect(() => {
    fetchMovieshandler_ASAW();
  }, [fetchMovieshandler_ASAW]);

  async function addMovieHandler(movie){
    const response = await fetch('https://react-http-d6e60-default-rtdb.europe-west1.firebasedatabase.app/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers:{
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
  }
  //using async - await
  // async function fetchMovieshandler_ASAW() {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetch('https://swapi.dev/api/films');
  //     if(!response.ok){
  //       throw new Error('Something went Wrong');
  //     }
  //     const data = await response.json();
  //     const transformedMovies = data.results.map(movieData => {
  //       return {
  //         id: movieData.episode_id,
  //         title: movieData.title,
  //         openingText: movieData.opening_crawl,
  //         releaseDate: movieData.release_date
  //       };
  //     });
  //     setMovies(transformedMovies);
  //     } catch (error) {
  //     setError(error.message);
  //   }
  //   setIsLoading(false);

  // }

  let content = <p> Found No movies</p>
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />
  }

  if (error) {
    content = <p> {error} </p>
  }

  if (isLoading) {
    content = <p> loading...</p>
  }

  //Using Promises
  // function fetchMovieshandler() {
  //   setIsLoading(true);
  //   fetch('https://swapi.dev/api/film')
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(data => {
  //       const transformedMovies = data.results.map(movieData => {
  //         return {
  //           id: movieData.episode_id,
  //           title: movieData.title,
  //           openingText: movieData.opening_crawl,
  //           releaseDate: movieData.release_date
  //         };
  //       });
  //       setMovies(transformedMovies);
  //       setIsLoading(false);
  //     })
  // }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovieshandler_ASAW}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
