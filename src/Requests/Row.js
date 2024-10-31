import React, { useState, useEffect } from 'react';
import instance from './URL';
import './row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_Url = "https://image.tmdb.org/t/p/original/";


function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(fetchUrl);
      setMovies(request.data.results);
      console.log(request);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts ={
    height: "400",
    width: "100",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
      .then((url) => {
        const UrlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(UrlParams.get('v'));
      })
      .catch((error) => console.log(error));
    }
  };

  return (
    <div className='movierow'>
      <h2>{title}</h2>
      <div className="row_poster">
        {/*several row posters*/}
        {movies.map(movie => (
          <img key={movie.id} onClick={() => handleClick(movie)} src={`${base_Url}${isLargeRow ? movie.poster_path : movie.poster_path}`} alt={movie.name} />
        ))};
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}


export default Row;