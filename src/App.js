import logo from './logo.svg';
//import './App.css';//esto es el estilo personalizado de react

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';//estamos instalando los modulos de reac router dom
import Navbar from './components/Navbar';  // Importa el Navbar
//desde aca se enruta las pestañas
import Home from './pages/Home';//esto es una ruta para la pagina principañ
import Productos from './pages/Productos';//esto es una ruta para la pagina de productos
import Mascotas from './pages/Mascotas';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
<Navbar />  {/* Incluye el Navbar aquí */}

          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/mascotas" element={<Mascotas />} />

            {/* Puedes agregar más rutas aquí si es necesario */}
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
