import { NavLink } from 'react-router-dom' 
import * as FaIcons from 'react-icons/fa'


const Sidebar = () => {
    return (
        <div className="sidebar bg-light">
            <ul>
                <li>
                    < NavLink to="/" exact className="text-dark rounded py-2 w-100 d-inline-block px-2" activeClassName="active"> <FaIcons.FaHome className='me-1.5'/> Inicio </ NavLink>
                </li>

                <li>
                    < NavLink to="/Sales" exact className="text-dark rounded py-2 w-100 d-inline-block px-2" activeClassName="active"> <FaIcons.FaRegChartBar className='me-1.5'/> Informes ventas </ NavLink>
                </li>

                <li>
                    < NavLink to="/Clients" exact className="text-dark rounded py-2 w-100 d-inline-block px-2" activeClassName="active"> <FaIcons.FaUserCircle className='me-1.5'/> Informes clientes </ NavLink>
                </li>
                
                <li>
                    < NavLink to="/Users" exact className="text-dark rounded py-2 w-100 d-inline-block px-2" activeClassName="active"> <FaIcons.FaUsersCog className='me-1.5'/> Usuarios </ NavLink>
                </li>

            </ul>
        </div>
    )

}

export default Sidebar