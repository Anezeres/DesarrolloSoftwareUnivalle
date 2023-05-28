import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';
import {LoginPage} from './pages/LoginPage'
import {LogoutPage} from './pages/LogoutPage'
import { EmailPage } from './pages/EmailPage'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/logout" element={<LogoutPage/>}/>
          <Route path="/sendemail" element={<EmailPage/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
