import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavbarD from './comoponents/navbarD';
import Sidebar from './comoponents/sidebar';
import Home from './Pages/Home';
import Sales from './Pages/Sales';
import Clients from './Pages/Clients';
import Users from './Pages/Users';
import './App.scss';

function App() {
  return (
    <Router>
      <div className='flex'>
        <Sidebar />
        <div className='content w-100'>
          <NavbarD />
          <Routes>
            <Route path='/' exact={true} Component={Home} />
            <Route path='/Sales' exact={true} Component={Sales} />
            <Route path='/Clients' exact={true} Component={Clients} />
            <Route path='/Users' exact={true} Component={Users} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
