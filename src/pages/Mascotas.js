import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';

const Mascotas = () => {
  const [mascotas, setMascotas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [raza, setRaza] = useState('');
  const [edad, setEdad] = useState('');
  const [dueno, setDueno] = useState('');

  // Obtener las mascotas del backend al cargar el componente
  useEffect(() => {
    const obtenerMascotas = async () => {
      try {
        const response = await axios.get('/mascotas/');
        setMascotas(response.data);
      } catch (error) {
        console.error('Error al obtener las mascotas:', error);
      }
    };

    obtenerMascotas();
  }, []);

  // Agregar una nueva mascota
  const handleAddMascota = async () => {
    const nuevaMascota = { nombre, raza, edad: parseInt(edad), dueno };
    try {
      await axios.post('/mascotas/crear/', nuevaMascota);
      const response = await axios.get('/mascotas/');  // Obtener la lista actualizada
      setMascotas(response.data);
      setNombre('');
      setRaza('');
      setEdad('');
      setDueno('');
    } catch (error) {
      console.error('Error al agregar la mascota:', error);
    }
  };

  // Eliminar una mascota
  const handleRemoveMascota = async (id) => {
    try {
      await axios.delete(`/mascotas/eliminar/${id}/`);
      const response = await axios.get('/mascotas/');  // Obtener la lista actualizada
      setMascotas(response.data);
    } catch (error) {
      console.error('Error al eliminar la mascota:', error);
    }
  };

  return (
    <div>
      <div className="container">
        <h1 className="text-center">Bienvenido al módulo Mascotas</h1>

        <div className="card mt-4 mx-auto" style={{ width: '50%' }}>
          <div className="card-header">
            <h2 className="text-center">ABM de mascotas</h2>
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
                <label className="form-label">Raza</label>
                <input
                  type="text"
                  className="form-control"
                  value={raza}
                  onChange={(e) => setRaza(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Edad</label>
                <input
                  type="number"
                  className="form-control"
                  value={edad}
                  onChange={(e) => setEdad(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Dueño</label>
                <input
                  type="text"
                  className="form-control"
                  value={dueno}
                  onChange={(e) => setDueno(e.target.value)}
                />
              </div>
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleAddMascota}
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-4 mx-auto" style={{ width: '50%' }}>
          <h3>Listado de Mascotas</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Raza</th>
                <th>Edad</th>
                <th>Dueño</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {mascotas.map((mascota, index) => (
                <tr key={index}>
                  <td>{mascota.nombre}</td>
                  <td>{mascota.raza}</td>
                  <td>{mascota.edad}</td>
                  <td>{mascota.dueno}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveMascota(mascota.id)}
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

export default Mascotas;

