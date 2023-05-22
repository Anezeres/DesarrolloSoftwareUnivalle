import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { PersonListPage } from './pages/PersonListPage';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<PersonListPage/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
