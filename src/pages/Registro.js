// src/pages/Registro.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    fk_pais: '',
    fk_rol: '',
    username: '',  // Nuevo campo para el nombre de usuario
    password: '',  // Campo para la contraseña
  });

  const [roles, setRoles] = useState([]);  // Cargar roles desde el backend
  const [paises, setPaises] = useState([]); // Cargar los países desde el backend
  const navigate = useNavigate();

  // Cargar roles y países desde el backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const rolesResponse = await axios.get('http://127.0.0.1:8000/api/roles/');
        const paisesResponse = await axios.get('http://127.0.0.1:8000/api/paises/');
        setRoles(rolesResponse.data);
        setPaises(paisesResponse.data);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/usuarios/', formData); // Enviar los datos al backend
      navigate('/home'); // Redirige al usuario después del registro
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Apellido:</label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Correo:</label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
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
          <label>País:</label>
          <select
            name="fk_pais"
            value={formData.fk_pais}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Seleccionar</option>
            {paises.map((pais) => (
              <option key={pais.id} value={pais.id}>
                {pais.descripcion}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Rol (opcional):</label>
          <select
            name="fk_rol"
            value={formData.fk_rol}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Seleccionar</option>
            {roles.map((rol) => (
              <option key={rol.id_rol} value={rol.id_rol}>
                {rol.descripcion}
              </option>
            ))}
          </select>
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
        <button type="submit" className="btn btn-primary mt-3">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Registro;
