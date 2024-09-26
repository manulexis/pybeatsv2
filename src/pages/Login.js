// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');  // Limpiar cualquier error anterior

    try {
      // Hacer la solicitud POST al backend para obtener el token
      const response = await axios.post('http://127.0.0.1:8000/api/token/', formData);
      const { access, refresh } = response.data;

      // Almacenar los tokens en el almacenamiento local (localStorage)
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      
      // Redirigir al usuario a la página principal después de iniciar sesión
      navigate('/home');
    } catch (err) {
      setError('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre de usuario:</label>
          <input 
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input 
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary mt-3">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
