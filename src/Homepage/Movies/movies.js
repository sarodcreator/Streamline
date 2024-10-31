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
                    <Row title='Trending' fetchUrl={Requests.fetchTopRated} />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home;