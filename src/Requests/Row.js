import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import instance from './URL';

const base_Url = "https://image.tmdb.org/t/p/original/";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [trailerUrl, setTrailerUrl] = useState("");
  const [comments, setComments] = useState([]); // Placeholder for comments

  useEffect(() => {
    async function fetchMovie() {
      const request = await instance.get(`/movie/${id}`);
      setMovie(request.data);
      return request;
    }
    fetchMovie();
  }, [id]);

  useEffect(() => {
    movieTrailer(movie?.name || movie?.title || "")
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
      })
      .catch((error) => console.log(error));
  }, [movie]);

  const opts = {
    height: "400",
    width: "100%",
    playerVars: { autoplay: 1 },
  };

  return (
    <div className="movieDetail">
      <h1>{movie.title || movie.name}</h1>
      <p>{movie.overview}</p>
      <p>Rating: {movie.vote_average}</p>

      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      
      {/* Comments Section */}
      <div className="comments">
        <h2>Comments</h2>
        {/* Map through comments */}
        {comments.map((comment, index) => (
          <p key={index}>{comment}</p>
        ))}
      </div>
    </div>
  );
}

export default MovieDetail;