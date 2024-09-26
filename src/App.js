import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';  // Importa el Navbar
import Home from './pages/Home';
import Registro from './pages/Registro';
import Login from './pages/Login';
import Roles from './pages/Roles';
import Paises from './pages/Paises';

function App() {
  return (
    <Router>
      {/* Mostrar el Navbar solo si no estamos en las rutas /login o /registro */}
      <NavbarControl /> 
      <div>
        <header>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/paises" element={<Paises />} />
            {/* Ruta comodín: redirecciona a /login si no se encuentra otra ruta */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

function NavbarControl() {
  const location = useLocation();  // Obtener la ubicación actual dentro del Router
  const hideNavbar = location.pathname === '/login' || location.pathname === '/registro';

  return !hideNavbar && <Navbar />;
}

export default App;
