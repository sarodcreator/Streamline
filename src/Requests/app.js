import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Row from './Row';
import MovieDetail from './MovieDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Row />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}

export default App;