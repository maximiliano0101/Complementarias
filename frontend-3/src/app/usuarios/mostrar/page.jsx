'use client';

import BorrarUsuario from "@/components/borrar";
import axios from "axios";
import Link from "next/link";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./db/db";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Usamos este hook para obtener los parámetros de la URL

// Función para obtener todos los usuarios desde el servidor
const fetchUsuarios = async () => {
  const url = "http://localhost:3000/usuarios";
  const response = await axios.get(url);
  return response.data;
};

// Función para obtener usuarios según un filtro en Firestore
const fetchUsuariosFiltrados = async (terminoBusqueda) => {
  try {
    const referenciaUsuarios = collection(db, "usuario");
    const consulta = query(referenciaUsuarios, where("nombre", "==", terminoBusqueda)); // Filtramos por nombre
    const resultado = await getDocs(consulta);
    const listaUsuarios = [];
    resultado.forEach((usuario) => {
      listaUsuarios.push({ id: usuario.id, ...usuario.data() });
    });
    return listaUsuarios;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return [];
  }
};

export default function Usuarios() {
  const [terminoBusqueda, setTerminoBusqueda] = useState(""); // Estado para el término de búsqueda
  const [usuarios, setUsuarios] = useState([]);
  const parametrosBusqueda = useSearchParams(); // Capturamos los parámetros de la URL

  // Carga los usuarios o los filtra según el parámetro `search`
  useEffect(() => {
    const obtenerUsuarios = async () => {
      const terminoParametro = parametrosBusqueda.get("search"); // Capturamos el valor de `search` en la URL
      if (terminoParametro) {
        console.log("Buscando usuarios con nombre:", terminoParametro);
        const usuariosFiltrados = await fetchUsuariosFiltrados(terminoParametro); // Filtramos los usuarios
        setUsuarios(usuariosFiltrados);
      } else {
        const todosLosUsuarios = await fetchUsuarios(); // Cargamos todos los usuarios
        setUsuarios(todosLosUsuarios);
      }
    };
    obtenerUsuarios();
  }, [parametrosBusqueda]); // Se ejecuta cuando cambian los parámetros de búsqueda

  const buscarUsuarios = async () => {
    if (!terminoBusqueda.trim()) {
      alert("Por favor, ingresa un término de búsqueda.");
      return;
    }
    console.log("Buscando usuarios con nombre:", terminoBusqueda);
    const usuariosFiltrados = await fetchUsuariosFiltrados(terminoBusqueda);
    console.log("Usuarios encontrados:", usuariosFiltrados);
    setUsuarios(usuariosFiltrados);
  };

  return (
    <>
      <h1 style={tituloEstilo}>Usuarios</h1>
      <table style={tablaEstilo}>
        <thead>
          <tr style={filaEncabezadoEstilo}>
            <th style={celdaEncabezadoEstilo}>Id</th>
            <th style={celdaEncabezadoEstilo}>Nombre</th>
            <th style={celdaEncabezadoEstilo}>Usuario</th>
            <th style={celdaEncabezadoEstilo}>Editar/Borrar</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario, index) => (
            <tr
              key={index}
              style={index % 2 === 0 ? { backgroundColor: "#fff8f0" } : { backgroundColor: "#ffffff" }}
            >
              <td style={celdaEstilo}>{index + 1}</td>
              <td style={celdaEstilo}>{usuario.nombre}</td>
              <td style={celdaEstilo}>{usuario.usuario}</td>
              <td style={celdaEstilo}>
                <BorrarUsuario id={usuario.id} />
                <> / </>
                <Link href={`/usuarios/modificar/${usuario.id}`} style={linkEstilo}>
                  Modificar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={contenedorBotonEstilo}>
        <Link href="/usuarios/nuevo" style={botonEstilo}>
          Nuevo
        </Link>
      </div>
    </>
  );
}

// Estilos
const tituloEstilo = {
  textAlign: 'center',
  color: '#333',
  marginTop: '30px',
  fontSize: '28px',
};

const tablaEstilo = {
  width: '80%',
  margin: '20px auto',
  borderCollapse: 'collapse',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const filaEncabezadoEstilo = {
  backgroundColor: '#ff6f00', // Fondo naranja
  color: '#fff',
};

const celdaEncabezadoEstilo = {
  padding: '12px',
  border: '1px solid #ccc',
  textAlign: 'left',
  fontWeight: 'bold',
  backgroundColor: '#ff6f00', // Fondo naranja
  color: '#fff',
};

const celdaEstilo = {
  padding: '12px',
  border: '1px solid #ccc',
};

const contenedorBotonEstilo = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px',
};

const botonEstilo = {
  padding: '12px 20px',
  backgroundColor: '#ff6f00', // Fondo naranja
  color: '#fff',
  textDecoration: 'none',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
  display: 'inline-block',
};

const linkEstilo = {
  color: '#ff6f00', // Color de texto naranja
  textDecoration: 'none',
  fontWeight: 'bold',
};

const contenedorBusquedaEstilo = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "20px",
};

const inputBusquedaEstilo = {
  padding: "8px 12px",
  border: "1px solid #ff6f00", // Borde naranja
  borderRadius: "4px",
  fontSize: "16px",
  marginRight: "10px",
};

const botonBusquedaEstilo = {
  padding: "8px 16px",
  backgroundColor: "#ff6f00", // Fondo naranja
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};
