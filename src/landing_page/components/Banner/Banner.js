import React, { useState, useEffect } from 'react';
import axios from '../../../Requests/URL';
import Requests from '../../../Requests/Requests';
import { APIKEY } from '../../../Requests/Requests';
import './Banner.css';

function truncate(str, n) {
    return str?.length > n ? str.substr(0, n-1) + "..." : str;
};

function Banner() {
    const [movie, setMovie] = useState(null);
    const [videoUrl, setVideoUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            // Fetch trending movies
            const request = await axios.get(Requests.fetchTrending);
            const randomMovie = request.data.results[
                Math.floor(Math.random() * request.data.results.length)
            ];
            setMovie(randomMovie);

            // Fetch video URL for the selected movie
            const videoRequest = await axios.get(
                `https://api.themoviedb.org/3/movie/${randomMovie.id}/videos?api_key=${APIKEY}&language=en-US`
            );

            // Filter for a video of type "Trailer" and get the YouTube URL
            const video = videoRequest.data.results.find(
                (vid) => vid.type === "Trailer" && vid.site === "YouTube"
            );

            if (video) {
                // Generate a random start time (e.g., between 0 and 90 seconds for a 2-minute video)
                const randomStart = Math.floor(Math.random() * 90); // Adjust max start time as needed
                setVideoUrl(`https://www.youtube.com/embed/${video.key}?start=${randomStart}&autoplay=1&mute=1`);
                
                // Stop the video after 30 seconds
                setTimeout(() => {
                    setVideoUrl(""); // Clear the video URL to stop playback
                }, 30000); // 30 seconds in milliseconds
            }
        }

        fetchData();
    }, []);

    if (!movie) return null;

    return (
        <header
            className="banner"
            style={{
                backgroundSize: 'cover',
                backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0)), url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
                backgroundPosition: 'center center',
            }}
        >
            <div className="banner_contents">
                {/* Video Preview */}
                {videoUrl && (
                    <iframe
                        src={videoUrl}
                        title="Movie Trailer"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        style={{
                            width: '100%',
                            border: 'none',
                            borderRadius: '8px',
                            height: '550px',
                        }}
                    />
                )}

                <h1 className="banner_title">{movie.title || movie.name || movie.original_name}</h1>
                <p className="description">{truncate(movie?.overview, 150)}</p>
                <div className='btn'>
                    <button className='banner_btn' id='play'>Play</button>
                    <button className='banner_btn'id='list'>My List</button>
                </div>

            </div>
            <div className='fade'></div>
        </header>
    );
}

export default Banner;