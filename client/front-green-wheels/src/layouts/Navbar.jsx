import React from 'react';
import { useSpring, animated } from 'react-spring';
import '../css/Navbar.css';

export const Navbar = () => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(-10px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 500 }
  });

  return (
    <nav className="navbar">
      <input type="checkbox" id="navbar-toggle" className="navbar-toggle" />
      <label htmlFor="navbar-toggle" className="navbar-toggle-label">
        <span className="navbar-toggle-icon"></span>
      </label>
      <ul className="navbar-nav">
        <animated.li style={fadeIn} className="nav-item">
          <a href="#" className="nav-link">Inicio</a>
        </animated.li>
        <animated.li style={fadeIn} className="nav-item">
          <a href="#" className="nav-link">Vehículos</a>
        </animated.li>
        <animated.li style={fadeIn} className="nav-item">
          <a href="#" className="nav-link">Contacto</a>
        </animated.li>
        <animated.li style={fadeIn} className="nav-item">
          <a href="#" className="nav-link">Ingresar</a>
        </animated.li>
      </ul>
    </nav>
  );
}

//export {Navbar};