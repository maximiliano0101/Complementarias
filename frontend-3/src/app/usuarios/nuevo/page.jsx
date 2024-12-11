"use client";
import axios from "axios";

async function nuevoUsuario(e) {
    e.preventDefault();
    const url = "http://localhost:3000/usuarios/nuevoUsuario";
    const datos = {
        nombre: document.getElementById("nombre").value,
        usuario: document.getElementById("usuario").value,
        password: document.getElementById("password").value,
    };

    await axios.post(url, datos);
    location.replace("http://localhost:3001/usuarios/mostrar");
}

export default function Nuevo() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#fff' }}> {/* Fondo blanco */}
            <form style={{ width: '40%', marginTop: '5%', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }} onSubmit={nuevoUsuario}>
                <div style={{ backgroundColor: '#ff6f00', color: '#fff', padding: '15px', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
                    <h1 style={{ textAlign: 'center' }}>Nuevo Usuario</h1>
                </div>
                <div style={{ padding: '20px' }}>
                    <input id="nombre" placeholder="Nombre" autoFocus type="text" style={inputStyle} />
                    <input id="usuario" placeholder="Usuario" type="text" style={inputStyle} />
                    <input id="password" placeholder="Password" type="password" style={inputStyle} />
                </div>
                <div style={{ padding: '15px' }}>
                    <button type="submit" style={buttonStyle}>Guardar usuario</button>
                </div>
            </form>
        </div>
    );
}

// Estilos
const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ff6f00', // Borde naranja
    borderRadius: '5px',
};

const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#ff6f00', // Fondo naranja
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
};
