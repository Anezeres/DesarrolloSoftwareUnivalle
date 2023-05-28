import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';
import {LoginPage} from './pages/LoginPage'
import {LogoutPage} from './pages/LogoutPage'
<<<<<<< HEAD
import {ControlPanel} from './pages/ControlPanel'
import { TestPnl } from './components/panel_components/TestPnl';
import { Prueba } from './components/panel_components/Prueba';
=======
import { EmailPage } from './pages/EmailPage'
>>>>>>> nicolOrt

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/logout" element={<LogoutPage/>}/>
<<<<<<< HEAD
          <Route path="/control_panels/test_panel" element={<ControlPanel panel={<TestPnl/>}/>}/>
          <Route path="/control_panels/prueba" element={<ControlPanel panel={<Prueba/>}/>}/>
=======
          <Route path="/send_email" element={<EmailPage/>}/>
>>>>>>> nicolOrt
        </Routes>
      </BrowserRouter>
  );
}

export default App;
