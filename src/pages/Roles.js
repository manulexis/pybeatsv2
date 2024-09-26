// src/pages/Roles.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Roles = () => {
  const [roles, setRoles] = useState([]);  // Para almacenar los roles
  const [formData, setFormData] = useState({ descripcion: '' });  // Para el formulario de agregar/editar
  const [isEditing, setIsEditing] = useState(false);  // Para saber si estamos editando
  const [editingId, setEditingId] = useState(null);  // ID del rol que se está editando


  // Cargar todos los roles desde el backend navigate
  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/roles/');
      setRoles(response.data);
    } catch (error) {
      console.error('Error al cargar los roles:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateRole();
    } else {
      await addRole();
    }
  };

  const addRole = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/roles/', formData);
      fetchRoles();  // Recargar la lista de roles
      setFormData({ descripcion: '' });
    } catch (error) {
      console.error('Error al agregar el rol:', error);
    }
  };

  const updateRole = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/roles/${editingId}/`, formData);
      fetchRoles();  // Recargar la lista de roles
      setFormData({ descripcion: '' });
      setIsEditing(false);
      setEditingId(null);
    } catch (error) {
      console.error('Error al actualizar el rol:', error);
    }
  };

  const deleteRole = async (id_rol) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/roles/${id_rol}/`);
      fetchRoles();  // Recargar la lista de roles
    } catch (error) {
      console.error('Error al eliminar el rol:', error);
    }
  };

  const handleEdit = (role) => {
    setIsEditing(true);
    setFormData({ descripcion: role.descripcion });
    setEditingId(role.id_rol);
  };

  return (
    <div className="container mt-5">
      <h2>Gestión de Roles</h2>

      <form onSubmit={handleSubmit} className="mb-3">
        <div className="form-group">
          <label>Descripción del Rol:</label>
          <input
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          {isEditing ? 'Actualizar Rol' : 'Agregar Rol'}
        </button>
        {isEditing && (
          <button
            type="button"
            className="btn btn-secondary mt-2 ms-2"
            onClick={() => {
              setIsEditing(false);
              setFormData({ descripcion: '' });
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <h3>Lista de Roles</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id_rol}>
              <td>{role.id_rol}</td>
              <td>{role.descripcion}</td>
              <td>
                <button className="btn btn-warning btn-sm" onClick={() => handleEdit(role)}>
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() => deleteRole(role.id_rol)}
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

export default Roles;
