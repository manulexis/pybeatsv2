import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [genero, setGenero] = useState('');
  const [correo, setCorreo] = useState('');
  const [fkImagen, setFkImagen] = useState(''); // Puede ser vacío
  const [fkPais, setFkPais] = useState('');
  const [userId, setUserId] = useState('');

  // Obtener los usuarios del backend al cargar el componente
  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await axios.get('/usuarios/');
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    obtenerUsuarios();
  }, []);

  // Agregar un nuevo usuario
  const handleAddUsuario = async () => {
    const nuevoUsuario = { 
      nombre, 
      apellido, 
      genero, 
      correo, 
      fk_imagen: fkImagen || null, // Permitir que sea null
      fk_pais: fkPais, 
      user_id: userId 
    };
    try {
      await axios.post('/usuarios/crear/', nuevoUsuario);
      const response = await axios.get('/usuarios/');  // Obtener la lista actualizada
      setUsuarios(response.data);
      setNombre('');
      setApellido('');
      setGenero('');
      setCorreo('');
      setFkImagen('');
      setFkPais('');
      setUserId('');
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
    }
  };

  // Eliminar un usuario
  const handleRemoveUsuario = async (id) => {
    try {
      await axios.delete(`/usuarios/eliminar/${id}/`);
      const response = await axios.get('/usuarios/');  // Obtener la lista actualizada
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  return (
    <div>
      <div className="container">
        <h1 className="text-center">Bienvenido al módulo Usuarios</h1>

        <div className="card mt-4 mx-auto" style={{ width: '50%' }}>
          <div className="card-header">
            <h2 className="text-center">ABM de usuarios</h2>
          </div>
          <div className="card-body">
            <form>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Género</label>
                <input
                  type="text"
                  className="form-control"
                  value={genero}
                  onChange={(e) => setGenero(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Correo</label>
                <input
                  type="email"
                  className="form-control"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">ID Imagen</label>
                <input
                  type="number"
                  className="form-control"
                  value={fkImagen}
                  onChange={(e) => setFkImagen(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">ID País</label>
                <input
                  type="number"
                  className="form-control"
                  value={fkPais}
                  onChange={(e) => setFkPais(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">ID Usuario</label>
                <input
                  type="number"
                  className="form-control"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleAddUsuario}
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-4 mx-auto" style={{ width: '50%' }}>
          <h3>Listado de Usuarios</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Género</th>
                <th>Correo</th>
                <th>ID Imagen</th>
                <th>ID País</th>
                <th>ID Usuario</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario, index) => (
                <tr key={index}>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.apellido}</td>
                  <td>{usuario.genero}</td>
                  <td>{usuario.correo}</td>
                  <td>{usuario.fk_imagen !== null ? usuario.fk_imagen : 'N/A'}</td>
                  <td>{usuario.fk_pais}</td>
                  <td>{usuario.user_id}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveUsuario(usuario.id)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Usuarios;
