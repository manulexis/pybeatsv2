import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar el hook de navegación

const Merca = () => {
  const [merca, setMerca] = useState([]);
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');

  const navigate = useNavigate(); // Hook para la navegación

  const handleAddMerca = () => {
    const nuevoMerca = { nombre, categoria, precio, stock };
    setMerca([...merca, nuevoMerca]);
    setNombre('');
    setCategoria('');
    setPrecio('');
    setStock('');
  };

  const handleRemoveMerca = (index) => {
    const nuevasMerca = merca.filter((_, i) => i !== index);
    setMerca(nuevasMerca);
  };

  const goToHome = () => {
    navigate('/home'); // Navegar a la ruta de Home
  };

  return (
    <div>
      <br />
      <br />
      <div className="container">
        <h1 className="text-center">Bienvenido al módulo Merca</h1>

        <div className="text-center mt-3">
          <button className="btn btn-primary" onClick={goToHome}>
            Inicio
          </button>
        </div>

        <div className="card mt-4 mx-auto" style={{ width: '50%' }}>
          <div className="card-header">
            <h2 className="text-center">ABM de Mercaderías</h2>
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
                <label className="form-label">Categoría</label>
                <input
                  type="text"
                  className="form-control"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Precio</label>
                <input
                  type="number"
                  className="form-control"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Stock</label>
                <input
                  type="number"
                  className="form-control"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleAddMerca}
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-4 mx-auto" style={{ width: '50%' }}>
          <h3>Listado de Mercaderías</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {merca.map((item, index) => (
                <tr key={index}>
                  <td>{item.nombre}</td>
                  <td>{item.categoria}</td>
                  <td>{item.precio}</td>
                  <td>{item.stock}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveMerca(index)}
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

export default Merca;
