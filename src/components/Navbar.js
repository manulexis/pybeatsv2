// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">Inicio</Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/productos">Productos</Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/registro">Registro</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/usuario">Usuario</Link>
              
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/roles">Roles</Link>
              
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/paises">Paises</Link>
              
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;