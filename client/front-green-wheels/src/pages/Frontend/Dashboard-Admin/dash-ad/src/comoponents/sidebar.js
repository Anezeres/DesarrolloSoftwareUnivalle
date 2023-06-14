import { Link } from 'react-router-dom' 
import * as FaIcons from 'react-icons/fa'


const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul>
                <li>
                    <Link to="/" style={{ color: '#C0D860' }}> <FaIcons.FaHome className='me-2'/> Inicio </Link>
                </li>

                <li>
                    <Link to="/Sales" style={{ color: '#C0D860' }}> <FaIcons.FaRegChartBar className='me-2'/> Informes ventas </Link>
                </li>

                <li>
                    <Link to="/Clients" style={{ color: '#C0D860' }}> <FaIcons.FaUserCircle className='me-2'/> Informes clientes </Link>
                </li>
                
                <li>
                    <Link to="/Users" style={{ color: '#C0D860' }}> <FaIcons.FaUsersCog className='me-2'/> Usuarios </Link>
                </li>

            </ul>
        </div>
    )

}

export default Sidebar