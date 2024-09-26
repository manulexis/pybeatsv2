// src/pages/Paises.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Paises = () => {
  const [paises, setPaises] = useState([]);  // Para almacenar los países
  const [formData, setFormData] = useState({ descripcion: '', moneda: '' });  // Para el formulario de agregar/editar
  const [isEditing, setIsEditing] = useState(false);  // Para saber si estamos editando
  const [editingId, setEditingId] = useState(null);  // ID del país que se está editando

  // Cargar todos los países desde el backend
  useEffect(() => {
    fetchPaises();
  }, []);

  const fetchPaises = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/paises/');
      setPaises(response.data);
    } catch (error) {
      console.error('Error al cargar los países:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updatePais();
    } else {
      await addPais();
    }
  };

  const addPais = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/paises/', formData);
      fetchPaises();  // Recargar la lista de países
      setFormData({ descripcion: '', moneda: '' });
    } catch (error) {
      console.error('Error al agregar el país:', error);
    }
  };

  const updatePais = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/paises/${editingId}/`, formData);
      fetchPaises();  // Recargar la lista de países
      setFormData({ descripcion: '', moneda: '' });
      setIsEditing(false);
      setEditingId(null);
    } catch (error) {
      console.error('Error al actualizar el país:', error);
    }
  };

  const deletePais = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/paises/${id}/`);
      fetchPaises();  // Recargar la lista de países
    } catch (error) {
      console.error('Error al eliminar el país:', error);
    }
  };

  const handleEdit = (pais) => {
    setIsEditing(true);
    setFormData({ descripcion: pais.descripcion, moneda: pais.moneda });
    setEditingId(pais.id);
  };

  return (
    <div className="container mt-5">
      <h2>Gestión de Países</h2>

      <form onSubmit={handleSubmit} className="mb-3">
        <div className="form-group">
          <label>Descripción del País:</label>
          <input
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Moneda:</label>
          <input
            type="text"
            name="moneda"
            value={formData.moneda}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          {isEditing ? 'Actualizar País' : 'Agregar País'}
        </button>
        {isEditing && (
          <button
            type="button"
            className="btn btn-secondary mt-2 ms-2"
            onClick={() => {
              setIsEditing(false);
              setFormData({ descripcion: '', moneda: '' });
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <h3>Lista de Países</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Moneda</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paises.map((pais) => (
            <tr key={pais.id}>
              <td>{pais.id}</td>
              <td>{pais.descripcion}</td>
              <td>{pais.moneda}</td>
              <td>
                <button className="btn btn-warning btn-sm" onClick={() => handleEdit(pais)}>
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() => deletePais(pais.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Paises;
