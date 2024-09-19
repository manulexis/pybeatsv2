import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar'; // Importa el Navbar
import Login from './pages/Login';
import Home from './pages/Home'; // Ruta para la página principal
import Productos from './pages/Productos'; // Ruta para la página de productos
import Mascotas from './pages/Mascotas';
import Merca from './pages/Merca';
import Presentaciones from './pages/Presentaciones';
import Registro from './pages/Registro';

import Usuario from './pages/Usuario';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar />  {/* Incluye el Navbar aquí */}
          
          <Routes>
          <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/mascotas" element={<Mascotas />} />
            <Route path="/merca" element={<Merca />} />
            <Route path="/presentaciones" element={<Presentaciones />} />
            <Route path="/usuario" element={<Usuario />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </header>
      </div>
    </Router>
    /*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*///esto es lo que se va a borrar para póner otro
  );
}

export default App;
