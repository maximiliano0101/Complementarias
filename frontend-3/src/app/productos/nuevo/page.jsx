"use client";
import axios from "axios";

async function nuevoProducto(e) {
    e.preventDefault();
    const url = "http://localhost:3000/productos/nuevoProducto";
    const datos = {
        producto: document.getElementById("producto").value,
        cantidad: document.getElementById("cantidad").value,
        precio: document.getElementById("precio").value,
    };
    await axios.post(url, datos);
    location.replace("http://localhost:3001/productos/mostrar");
}

export default function Nuevo() {
    return (
        <div style={containerStyle}>
            <form style={formStyle} onSubmit={nuevoProducto}>
                <div style={headerStyle}>
                    <h1 style={headerTextStyle}>Nuevo Producto</h1>
                </div>
                <div style={inputContainerStyle}>
                    <input id="producto" placeholder="Producto" autoFocus type="text" style={inputStyle} />
                    <input id="cantidad" placeholder="Cantidad" type="text" style={inputStyle} />
                    <input id="precio" placeholder="Precio" type="text" style={inputStyle} />
                </div>
                <div style={buttonContainerStyle}>
                    <button type="submit" style={buttonStyle}>Guardar producto</button>
                </div>
            </form>
        </div>
    );
}

// Estilo del contenedor principal
const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#fff8f0', // Fondo suave y cálido
    alignItems: 'center',
};

// Estilo para el formulario
const formStyle = {
    width: '400px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
};

// Estilo del encabezado
const headerStyle = {
    backgroundColor: '#ff6f00', // Fondo naranja
    color: '#fff',
    padding: '15px',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    textAlign: 'center',
};

const headerTextStyle = {
    margin: 0,
    fontSize: '24px',
};

// Estilo para los contenedores de los inputs y botones
const inputContainerStyle = {
    padding: '20px',
};

// Estilo de los inputs
const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    border: '1px solid #ff6f00', // Bordes naranjas
    borderRadius: '5px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s',
};

inputStyle[':focus'] = {
    borderColor: '#ff6f00', // Bordes naranjas al enfocar
};

// Estilo para el contenedor del botón
const buttonContainerStyle = {
    padding: '15px',
};

// Estilo del botón
const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#ff6f00', // Fondo naranja
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
};

// Efecto al pasar el ratón sobre el botón
buttonStyle[':hover'] = {
    backgroundColor: '#e65c00', // Color naranja más oscuro al pasar el ratón
};
