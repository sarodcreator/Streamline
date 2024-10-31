import React, { useState, useEffect } from 'react';
import instance from './URL';
import './row.css';

const base_Url = "https://image.tmdb.org/t/p/original/";


function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(fetchUrl);
      setMovies(request.data.results);
      console.log(request);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className='movierow'>
      <h2>{title}</h2>
      <div className="row_poster">
        {/*several row posters*/}
        {movies.map(movie => (
          <img key={movie.id} src={`${base_Url}${isLargeRow ? movie.poster_path : movie.poster_path}`} alt={movie.name} />
        ))};
      </div>
      <div className="rating">
        <p>Rating:{movies.map(movie => (movie.vote_average))}</p>
      </div>
    </div>
  );
}


export default Row;