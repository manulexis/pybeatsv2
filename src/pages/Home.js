import React from 'react';

import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();//modulo para navegar entre paginas

  const ir_productos_navegador = () => {
    navigate('/productos');
  };

  


  return (
    <div>
      <div className="container">
        <br/>
        <br/>
        <h1 className="text-center">Bienvenido a Home</h1>
        <br/>
        <br/>
        
        <button class="btn btn-success" onClick={ir_productos_navegador}>
          Productos
        </button>

        {/*
        <button className="btn btn-primary">Haz clic aquí</button>
        */}

      </div>
    </div>
  );
};

export default Home;
//<div className="container"> = esto es el contenedor del lo que esta dentro de el html