import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';
import {LoginPage} from './pages/LoginPage'
import {LogoutPage} from './pages/LogoutPage'
import {ControlPanel} from './pages/ControlPanel'
import { TestPnl } from './components/panel_components/TestPnl';
import { Prueba } from './components/panel_components/Prueba';
import { EmailPage } from './pages/EmailPage'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/logout" element={<LogoutPage/>}/>
          <Route path="/control_panels/test_panel" element={<ControlPanel panel={<TestPnl/>}/>}/>
          <Route path="/control_panels/prueba" element={<ControlPanel panel={<Prueba/>}/>}/>
          <Route path="/control_panels/send_email" element={<ControlPanel panel={<EmailPage/>}/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
