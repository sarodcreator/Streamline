import React, { useState, useEffect } from 'react';
import instance from './URL';
import './row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_Url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [comments, setComments] = useState(["Great movie!", "Loved the soundtrack!"]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "400",
    width: "100%",
    playerVars: { autoplay: 1 },
  };

  const handleClick = (movie) => {
    setSelectedMovie(movie);

    movieTrailer(movie?.name || movie?.title || "")
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
      })
      .catch((error) => console.log(error));
  };

  const handleBackToList = () => {
    setSelectedMovie(null);
    setTrailerUrl("");
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  const handleDeleteComment = (index) => {
    setComments(comments.filter((_, i) => i !== index));
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  if (selectedMovie) {
    // Detailed View with Rating and Comments
    return (
      <div className="movieDetail">
        <button onClick={handleBackToList}>Back to list</button>
        <h1>{selectedMovie.title || selectedMovie.name}</h1>
        <p>{selectedMovie.overview}</p>
        <p>Rating: {selectedMovie.vote_average}</p>

        {/* User Rating */}
        <div className="userRating">
          <label htmlFor="rating">Your Rating: </label>
          <input
            type="number"
            id="rating"
            min="1"
            max="10"
            value={rating}
            onChange={handleRatingChange}
          />
          <span> / 10</span>
        </div>

        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}

        {/* Comments Section */}
        <div className="comments">
          <h2>Comments</h2>
          {comments.map((comment, index) => (
            <div key={index} className="comment">
              <p>{comment}</p>
              <button onClick={() => handleDeleteComment(index)}>Delete</button>
            </div>
          ))}
          <div className="commentInput">
            <input
              type="text"
              placeholder="Add a comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleAddComment}>Submit</button>
          </div>
        </div>
      </div>
    );
  }

  // Movie List View
  return (
    <div className="movierow">
      <h2>{title}</h2>
      <div className="row_poster">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster_img ${isLargeRow && "row_posterLarge"}`}
            src={`${base_Url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name || movie.title}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;