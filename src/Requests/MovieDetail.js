import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import instance from './URL';

const base_Url = "https://image.tmdb.org/t/p/original/";

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [comments, setComments] = useState(["Amazing movie!", "Great story!"]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    async function fetchMovie() {
      const request = await instance.get(`/movie/${id}`);
      setMovie(request.data);
      movieTrailer(request.data.title || request.data.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
    fetchMovie();
  }, [id]);

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

  return (
    <div className="movieDetail">
      <button onClick={() => navigate(-1)}>Back to list</button>
      {movie && (
        <>
          <h1>{movie.title || movie.name}</h1>
          <p>{movie.overview}</p>
          <p>Rating: {movie.vote_average}</p>

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

          {trailerUrl && <YouTube videoId={trailerUrl} opts={{ height: "400", width: "100%", playerVars: { autoplay: 1 } }} />}

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
        </>
      )}
    </div>
  );
}

export default MovieDetail;