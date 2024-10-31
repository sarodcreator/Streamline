import './trend.css';
import { Type } from '../components/dropdowns';
import Search from '../../assets/search.png';
import Next from '../../assets/arrow-right.png';
import Requests from '../../Requests/Requests';
import Row from '../../Requests/Row';

const Trend = () => {

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
                <Row title='Trending' fetchUrl={Requests.fetchTrending} className='list_items' />
                <div className="nextbtn">
                    <img src={Next} alt="" />
                </div>
            </div>
        </div>
    )
};

export default Trend;