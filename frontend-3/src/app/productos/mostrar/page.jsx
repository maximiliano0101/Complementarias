'use client';

import BorrarProducto from "@/components/borrarP";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// Función para obtener productos filtrados por nombre
async function getProductos(searchTerm = "") {
  const url = searchTerm ? `http://localhost:3000/productos/buscarPorNombre/${searchTerm}` : "http://localhost:3000/productos";
  const { data } = await axios.get(url);
  return data;
}

export default function Productos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [productos, setProductos] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Obtiene todos los productos o filtra según el parámetro `search`
  useEffect(() => {
    const fetchProductos = async () => {
      const querySearchTerm = searchParams.get("search");
      if (querySearchTerm) {
        console.log("Buscando productos con nombre:", querySearchTerm);
        const filteredProductos = await getProductos(querySearchTerm);
        setProductos(filteredProductos);
      } else {
        const allProductos = await getProductos();
        setProductos(allProductos);
      }
    };
    fetchProductos();
  }, [searchParams]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      alert("Por favor, ingresa un término de búsqueda.");
      return;
    }

    try {
      const filteredProductos = await getProductos(searchTerm);
      setProductos(filteredProductos);
      // Redirige a la página de productos con el término de búsqueda como query
      router.push(`/productos/mostrar?search=${searchTerm}`);
    } catch (error) {
      console.error("Error al buscar productos:", error);
    }
  };

  const tabEncabezado = {
    padding: '10px',
    border: '1px solid #ff6f00', // Bordes naranjas
    textAlign: 'left',
    fontWeight: 'bold',
    backgroundColor: '#ff6f00', // Fondo naranja para encabezados
    color: '#fff',
  };

  const tabstyle2 = {
    padding: '10px',
    border: '1px solid #ff6f00', // Bordes naranjas
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#ff6f00', // Botón en color naranja
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  };

  return (
    <>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Productos</h1>
      <table style={{ width: '80%', margin: '20px auto', borderCollapse: 'collapse', border: '1px solid #ff6f00' }}>
        <thead>
          <tr style={{ backgroundColor: '#fff8f0' }}>
            <th style={tabEncabezado}>Id</th>
            <th style={tabEncabezado}>Producto</th>
            <th style={tabEncabezado}>Precio</th>
            <th style={tabEncabezado}>Cantidad</th>
            <th style={tabEncabezado}>Editar/Borrar</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, i) => (
            <tr key={i} style={i % 2 === 0 ? { backgroundColor: '#f9f9f9' } : { backgroundColor: '#ffffff' }}>
              <td style={tabstyle2}>{i + 1}</td>
              <td style={tabstyle2}>{producto.producto}</td>
              <td style={tabstyle2}>${producto.precio}</td>
              <td style={tabstyle2}>{producto.cantidad}</td>
              <td style={tabstyle2}>
                <BorrarProducto id={producto.id} />
                <> / </>
                <Link href={`/productos/modificar/${encodeURIComponent(JSON.stringify({ id: producto.id, producto: producto.producto, cantidad: producto.cantidad, precio: producto.precio }))}`} style={{ color: '#ff6f00' }}>
                  Modificar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={buttonContainerStyle}>
        <Link href="/productos/nuevo" style={buttonStyle}>
          Nuevo
        </Link>
      </div>
    </>
  );
}
