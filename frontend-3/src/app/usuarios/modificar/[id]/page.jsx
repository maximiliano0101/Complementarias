"use client";

import { useRouter } from "next/navigation";

export default function ModificarUsuario({ params }) {
    const router = useRouter();
    const usuarioId = params.id;

    const modificarUsuario = async (e) => {
        e.preventDefault();

        const data = {
            id: usuarioId,
            nombre: document.getElementById("nombre").value.trim(),
            usuario: document.getElementById("usuario").value.trim(),
            password: document.getElementById("password").value.trim(),
        };

        if (!data.nombre || !data.usuario || !data.password) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/usuarios/modificarUsuario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Error al modificar el usuario.");
            }

            alert("Usuario modificado correctamente.");
            // Redirigir a la ruta correcta
            router.push("/usuarios/mostrar");
        } catch (error) {
            console.error("Error al modificar el usuario:", error);
            alert("Hubo un problema al modificar el usuario.");
        }
    };

    return (
        <div style={containerStyle}>
            <form style={formStyle} onSubmit={modificarUsuario}>
                <div style={headerStyle}>
                    <h1 style={headerTextStyle}>Modificar Usuario</h1>
                </div>
                <div style={inputContainerStyle}>
                    <input id="nombre" type="text" placeholder="Nombre" style={inputStyle} />
                    <input id="usuario" type="text" placeholder="Usuario" style={inputStyle} />
                    <input id="password" required placeholder="Nuevo password" type="password" style={inputStyle} />
                </div>
                <div style={buttonContainerStyle}>
                    <button type="submit" style={buttonStyle}>Guardar cambios</button>
                </div>
            </form>
        </div>
    );
}

// Estilos del formulario
const containerStyle = { 
    display: 'flex', 
    justifyContent: 'center', 
    minHeight: '100vh', 
    backgroundColor: '#fff8f0', // Fondo suave y cálido
    alignItems: 'center' 
};

const formStyle = { 
    width: '400px', 
    backgroundColor: '#fff', 
    borderRadius: '8px', 
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', 
    overflow: 'hidden' 
};

const headerStyle = { 
    backgroundColor: '#ff6f00', // Fondo naranja
    color: '#fff', 
    padding: '15px', 
    borderTopLeftRadius: '8px', 
    borderTopRightRadius: '8px', 
    textAlign: 'center' 
};

const headerTextStyle = { 
    margin: 0, 
    fontSize: '24px' 
};

const inputContainerStyle = { 
    padding: '20px' 
};

const inputStyle = { 
    width: '100%', 
    padding: '12px', 
    marginBottom: '20px', 
    border: '1px solid #ff6f00', // Bordes naranjas
    borderRadius: '5px', 
    fontSize: '16px', 
    outline: 'none' 
};

const buttonContainerStyle = { 
    padding: '15px' 
};

const buttonStyle = { 
    width: '100%', 
    padding: '12px', 
    backgroundColor: '#ff6f00', // Fondo naranja
    color: '#fff', 
    border: 'none', 
    borderRadius: '5px', 
    cursor: 'pointer', 
    fontSize: '16px' 
};
