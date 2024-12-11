"use client";
export default function Modificar({ params }) {
    const producto = JSON.parse(decodeURIComponent(params.id));

    const modificarProducto = async (e) => {
        e.preventDefault();

        const data = {
            id: producto.id,
            producto: document.getElementById("producto").value,
            cantidad: document.getElementById("cantidad").value,
            precio: document.getElementById("precio").value,
        };

        const url = "http://localhost:3000/productos/modificarProducto";

        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        location.replace("http://localhost:3001/productos/mostrar");
    };

    return (
        <div style={containerStyle}>
            <form style={formStyle} onSubmit={modificarProducto}>
                <div style={headerStyle}>
                    <h1 style={headerTextStyle}>Modificar Producto</h1>
                </div>
                <div style={inputContainerStyle}>
                    <input id="id" defaultValue={producto.id} type="text" style={{ display: 'none' }} />
                    <input id="producto" defaultValue={producto.producto} type="text" style={inputStyle} placeholder="Nombre del producto" />
                    <input id="cantidad" defaultValue={producto.cantidad} type="text" style={inputStyle} placeholder="Cantidad" />
                    <input id="precio" defaultValue={producto.precio} type="text" style={inputStyle} placeholder="Precio" />
                </div>
                <div style={buttonContainerStyle}>
                    <button type="submit" style={buttonStyle}>Guardar cambios</button>
                </div>
            </form>
        </div>
    );
}

// Estilos
const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#fff8f0', // Fondo claro con tono cálido
    alignItems: 'center',
};

const formStyle = {
    width: '400px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
};

const headerStyle = {
    backgroundColor: '#ff6f00', // Naranja vibrante para el encabezado
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

const inputContainerStyle = {
    padding: '20px',
};

const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    border: '1px solid #ff6f00', // Naranja suave para los bordes
    borderRadius: '5px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s',
};

inputStyle[':focus'] = {
    borderColor: '#ff6f00', // Cambio de color de borde a naranja al enfocar
};

const buttonContainerStyle = {
    padding: '15px',
};

const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#ff6f00', // Naranja para el fondo del botón
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
};

buttonStyle[':hover'] = {
    backgroundColor: '#e65100', // Un naranja más oscuro para el hover
};
