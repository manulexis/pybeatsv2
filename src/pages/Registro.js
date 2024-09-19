import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [genero, setGenero] = useState('');
  const [fk_pais, setFkPais] = useState('');  // Esto será convertido a número
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    // Asegurarse de que fk_pais sea numérico (parsearlo a número entero)
    const paisId = fk_pais ? parseInt(fk_pais, 10) : null;

    // Verificar los datos antes de hacer la solicitud
    console.log({
      username,
      email,
      password,
      nombre,
      apellido,
      genero,
      fk_pais: paisId  // Asegurarse de que sea numérico
    });

    try {
      await axios.post('/api/register/', {
        username,
        email,
        password,
        nombre,
        apellido,
        genero,
        fk_pais: paisId  // Asegurarse de enviar el número
      });
      navigate('/login');  // Redirige al login después de un registro exitoso
    } catch (error) {
      console.error('Error:', error.response?.data || 'Error en el registro');
      setError('Error en el registro, intenta de nuevo');
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Registro de Usuario</h1>
      <div className="card mt-4 mx-auto" style={{ width: '50%' }}>
        <div className="card-header">
          <h2 className="text-center">Crear una cuenta</h2>
        </div>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label className="form-label">Nombre de usuario</label>
              <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Correo Electrónico</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Apellido</label>
              <input type="text" className="form-control" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Género</label>
              <input type="text" className="form-control" value={genero} onChange={(e) => setGenero(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">País (ID)</label>
              <input type="text" className="form-control" value={fk_pais} onChange={(e) => setFkPais(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Confirmar Contraseña</label>
              <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            {error && <p className="text-danger">{error}</p>}
            <div className="text-center">
              <button type="button" className="btn btn-success" onClick={handleRegister}>Registrarse</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registro;
