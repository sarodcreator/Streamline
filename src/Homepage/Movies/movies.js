import React from 'react'
import Row from '../../Requests/Row'
import Requests from '../../Requests/Requests';
import Banner from '../../landing_page/components/Banner/Banner';
import Nav from './Nav';
import Footer from '../../landing_page/Footer/footer';
import './movies.css';

function Home() {
    return (
        <>
            <div className='rows_movies'>
                <Nav />
                <Banner />
                <div className="listrow">
                    <Row title='NETFLIX ORIGINALS' fetchUrl={Requests.fetchNetflixOriginals}
                        isLargeRow={true} />
                    <Row title='Trending' fetchUrl={Requests.fetchTrending} />
                    <Row title='Action' fetchUrl={Requests.fetchActionMovies} />
                    <Row title='Documentary' fetchUrl={Requests.fetchDocumentaries} />
                    <Row title='Horror' fetchUrl={Requests.fetchHorrorMovies} />
                    <Row title='Romance' fetchUrl={Requests.fetchRomanceMovies} />
                    <Row title='Top Rated' fetchUrl={Requests.fetchTopRated} />
                    <Row title='Adventure' fetchUrl={Requests.fetchAdventureMovies} />
                    <Row title='Dramas' fetchUrl={Requests.fetchDramaMovies} />
                    <Row title='Animations' fetchUrl={Requests.fetchAnimatedMovies} />
                    <Row title='Fantasy' fetchUrl={Requests.fetchFantasyMovies} />
                    <Row title='Family' fetchUrl={Requests.fetchFamilyMovies} />
                    <Row title='Anime' fetchUrl={Requests.fetchAnimeShows} />
                    <Row title='Back in Time' fetchUrl={Requests.fetchHistoryMovies} />
                    <Row title='Sing Along' fetchUrl={Requests.fetchMusicMovies} />
                    <Row title='Mystery' fetchUrl={Requests.fetchMysteryMovies} />
                    <Row title='Game Shows' fetchUrl={Requests.fetchGameShows} />
                    <Row title='For Kids' fetchUrl={Requests.fetchKidsMovies} />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home;