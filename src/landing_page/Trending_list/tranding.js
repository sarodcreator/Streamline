import './trend.css';
import React, { useState, useEffect } from 'react';
import { Type } from '../components/dropdowns';
import Search from '../../assets/search.png';
import Next from '../../assets/arrow-right.png';
import Requests from '../../Requests/Requests';
import instance from '../../Requests/URL';
//import Row from '../../Requests/Row';
import '../../Requests/row.css';

const base_Url = "https://image.tmdb.org/t/p/original/";

const Trending = () => {
    const [Movies, setMovies] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const request = await instance.get(Requests.fetchTrending);
            setMovies(request.data.results.slice(0, 10));
            console.log(request.data);
            return request;
        }
        fetchData();
    });
    return (
        <div className="trend">
            <h3>Trending</h3>
            <div className="location">
                <div className="search">
                    <input type="search" id='search' placeholder='Location' />
                    <img src={Search} alt="" />
                </div>
                <div className="type">
                    < Type />
                </div>
            </div>
            <div className="Rows">
                <div className="row_poster trend">
                    {Movies.map((movie, index) => (
                        <figure
                            key={movie.id}
                            className={`row_poster_img ${"row_posterLarge"}`}>
                            <div className="items">
                                <img 
                                    src={`${base_Url}${movie.poster_path}`}
                                    alt={movie.name || movie.title}
                                />
                                <p>{index + 1}</p>
                            </div>
                        </figure>
                    ))}
                </div>
                <div className="nextbtn">
                    <img src={Next} alt="" />
                </div>
            </div>
        </div>
    )
};

export default Trending;