import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegisterPage/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
