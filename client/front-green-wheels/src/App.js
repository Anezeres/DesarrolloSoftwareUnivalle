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
import { CreateVehicleComponents} from './components/panel_components/CreateVehicleComponents';
import { CheckNegotations } from './components/panel_components/CheckNegotations';
import { CheckRepairs } from './components/panel_components/CheckRepairs';
import { CheckInventory } from './components/panel_components/CheckInventory';
import { ManageUsersPanel } from './components/panel_components/ManageUsersPanel';
import { RequestSellService } from './components/panel_components/RequestSellService';
import { AssignNegotation } from './components/panel_components/AssignNegotation';
import { CreateEditNegotation } from './components/panel_components/CreateEditNegotation'; 
import { CreateLocations } from './components/panel_components/CreateLocations';
import { ManageUsersAsManager } from './components/panel_components/ManageUsersAsManager';
import { ManageUsersAsAdmin } from './components/panel_components/ManageUsersAsAdmin';
import { RequestVehicleRepairService } from './components/panel_components/RequestVehicleRepairService';
import { AssignRepair } from './components/panel_components/AssignRepair';
import { CreateEditRepair } from './components/panel_components/CreateEditRepair';
import { CreateEditReplacementPart } from './components/panel_components/CreateEditReplacementPart';
import { AssignReplacementPart } from './components/panel_components/AssignReplacementPart';
const App = () => {

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/logout" element={<LogoutPage/>}/>
          
          <Route path="/testing" element={<AssignRepair/>}/>
          <Route path="/create_client" element={<ClientForm/>}/>
          <Route path="/control_panels/send_email" element={<ControlPanel panel={<EmailPage/>}/>}/>
          <Route path="/control_panels/test_panel" element={<ControlPanel panel={<TestPnl/>}/>}/>
          <Route path="/control_panels/prueba" element={<ControlPanel panel={<Prueba/>}/>}/>
          <Route path="/control_panels/create_seller" element={<ControlPanel panel={<CreateSeller/>}/>}/>
          <Route path="/control_panels/create_workshopboss" element={<ControlPanel panel={<CreateWorkshopBoss/>}/>}/>
          <Route path="/control_panels/create_manager" element={<ControlPanel panel={<CreateManager/>}/>}/>
          <Route path="/control_panels/check_negotations" element={ <ControlPanel panel={<CheckNegotations/>}/>   }/>
          <Route path="/control_panels/check_repairs" element={ <ControlPanel panel={<CheckRepairs/>}/>   }/>
          <Route path="/control_panels/check_inventory" element={<ControlPanel panel={<CheckInventory/>}/> }/>
          <Route path="/control_panels/create_vehicle_components" element={<ControlPanel panel={<CreateVehicleComponents/>}/>}/>
          <Route path="/control_panels/manage_users" element={<ControlPanel panel={<ManageUsersPanel/>}/>}/>
          <Route path="/control_panels/request_sell_service" element={<ControlPanel panel={<RequestSellService/>}/>}/>
          <Route path="/control_panels/request_repair_vehicle_service" element={<ControlPanel panel={<RequestVehicleRepairService/>}/>}/>
          <Route path="/control_panels/assign_negotation" element={<ControlPanel panel={<AssignNegotation/>}/>}/>
          <Route path="/control_panels/create_edit_negotation" element={<ControlPanel panel={<CreateEditNegotation/>}/>}/>
          <Route path="/control_panels/create_locations" element={<ControlPanel panel={<CreateLocations/>}/>}/>
          <Route path="/control_panels/manage_users_as_manager" element={<ControlPanel panel={<ManageUsersAsManager/>}/>}/>
          <Route path="/control_panels/manage_users_as_admin" element={<ControlPanel panel={<ManageUsersAsAdmin/>}/>}/>
          <Route path="/control_panels/assign_repair" element={<ControlPanel panel={<AssignRepair/>}/>}/>
          <Route path="/control_panels/create_edit_repair_service" element={<ControlPanel panel={<CreateEditRepair/>}/>}/>
          <Route path="/control_panels/create_edit_replacement_part" element={<ControlPanel panel={<CreateEditReplacementPart/>}/>}/>
          <Route path="/control_panels/assign_replacement_part" element={<ControlPanel panel={<AssignReplacementPart/>}/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
