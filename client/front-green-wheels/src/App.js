import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {CarsListPage} from './pages/CarsListPage';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<CarsListPage/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
