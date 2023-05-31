import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';
import {LoginPage} from './pages/LoginPage'
import {LogoutPage} from './pages/LogoutPage'
import {ControlPanel} from './pages/ControlPanel'
import { TestPnl } from './components/panel_components/TestPnl';
import { Prueba } from './components/panel_components/Prueba';
import { EmailPage } from './pages/EmailPage'
import { ClientForm } from './components/ClientRegisterForm'
import { CreateSeller } from './components/panel_components/CreateSeller';
import { CreateWorkshopBoss } from './components/panel_components/CreateWorkshopBoss';
import { CreateManager } from './components/panel_components/CreateManager';


const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/logout" element={<LogoutPage/>}/>

          <Route path="/create_client" element={<ClientForm/>}/>
          <Route path="/control_panels/send_email" element={<ControlPanel panel={<EmailPage/>}/>}/>
          <Route path="/testing" element={<CreateSeller/>}/>
          <Route path="/control_panels/test_panel" element={<ControlPanel panel={<TestPnl/>}/>}/>
          <Route path="/control_panels/prueba" element={<ControlPanel panel={<Prueba/>}/>}/>
          <Route path="/control_panels/create_seller" element={<ControlPanel panel={<CreateSeller/>}/>}/>
          <Route path="/control_panels/create_workshopboss" element={<ControlPanel panel={<CreateWorkshopBoss/>}/>}/>
          <Route path="/control_panels/create_manager" element={<ControlPanel panel={<CreateManager/>}/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
