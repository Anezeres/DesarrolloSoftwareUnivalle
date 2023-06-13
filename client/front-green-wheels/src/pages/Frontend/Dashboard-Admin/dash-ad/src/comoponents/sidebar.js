import { Link } from 'react-router-dom' 

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul>
                <li>
                    <Link to="/"> Inicio </Link>
                </li>

                <li>
                    <Link to="/Sales"> Informes ventas </Link>
                </li>

                <li>
                    <Link to="/Clients"> Informes clientes </Link>
                </li>

                <li>
                    <Link to="/Users"> Usuarios </Link>
                </li>

            </ul>
        </div>
    )

}

export default Sidebar