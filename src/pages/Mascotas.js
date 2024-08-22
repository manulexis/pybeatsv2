import React, { useState } from 'react';

const Mascotas = () => {
  const [mascotas, setMascotas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [raza, setRaza] = useState('');
  const [edad, setEdad] = useState('');
  const [dueno, setDueno] = useState('');

  const handleAddMascota = () => {
    const nuevaMascota = { nombre, raza, edad, dueno };
    setMascotas([...mascotas, nuevaMascota]);
    setNombre('');
    setRaza('');
    setEdad('');
    setDueno('');
  };

  const handleRemoveMascota = (index) => {
    const nuevasMascotas = mascotas.filter((_, i) => i !== index);
    setMascotas(nuevasMascotas);
  };

  return (
    <div>
      <br />
      <br />
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
                      onClick={() => handleRemoveMascota(index)}
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


