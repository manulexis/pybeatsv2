import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [costo, setCosto] = useState('');
    const [precioVenta, setPrecioVenta] = useState('');
    const [stock, setStock] = useState('');
    const [error, setError] = useState('');
    
    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const response = await axios.get('/productos/');
                setProductos(response.data);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
                setError('No se pudo obtener la lista de productos');
            }
        };

        obtenerProductos();
    }, []);

    const agregarProducto = async () => {
        // Validaciones simples
        if (!nombre || !descripcion || !costo || !precioVenta || !stock) {
            setError('Todos los campos son obligatorios');
            return;
        }
        if (isNaN(costo) || isNaN(precioVenta) || isNaN(stock)) {
            setError('Costo, precio de venta y stock deben ser valores numéricos');
            return;
        }

        const nuevoProducto = {
            nombre,
            descripcion,
            costo: parseFloat(costo) || 0,
            precio_venta: parseFloat(precioVenta) || 0,
            stock: parseInt(stock, 10) || 0,
        };

        try {
            await axios.post('/productos/', nuevoProducto);
            const response = await axios.get('/productos/');
            setProductos(response.data);
            limpiarFormulario();
            setError('');  // Limpiar cualquier error previo
        } catch (error) {
            console.error('Error al agregar el producto:', error);
            setError('Hubo un problema al agregar el producto');
        }
    };

    const limpiarFormulario = () => {
        setNombre('');
        setDescripcion('');
        setCosto('');
        setPrecioVenta('');
        setStock('');
    };

    return (
        <div>
            <h1>Productos</h1>
            <div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                <input type="text" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                <input type="number" placeholder="Costo" value={costo} onChange={(e) => setCosto(e.target.value)} />
                <input type="number" placeholder="Precio de Venta" value={precioVenta} onChange={(e) => setPrecioVenta(e.target.value)} />
                <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
                <button onClick={agregarProducto}>Agregar Producto</button>
            </div>
            <ul>
                {productos.map((producto) => (
                    <li key={producto.id}>
                        {producto.nombre} - {producto.descripcion}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Productos;
