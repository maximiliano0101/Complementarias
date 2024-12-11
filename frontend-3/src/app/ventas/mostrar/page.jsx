import BorrarVenta from "@/components/borrarVenta";
import axios from "axios";
import Link from "next/link";

async function getVentas() {
    const url = "http://localhost:3000/ventas";
    const ventas = await axios.get(url);
    return ventas.data;
}

export default async function Ventas() {
    const ventas = await getVentas();

    const tabEncabezado = {
        padding: "10px",
        border: "1px solid #ff6f00", // Borde naranja
        textAlign: "left",
        fontWeight: "bold",
        backgroundColor: "#ff6f00", // Naranja
        color: "#fff",
    };

    const tabstyle2 = {
        padding: "10px",
        border: "1px solid #ff6f00", // Borde naranja
    };

    const tableStyle = {
        width: "80%",
        margin: "20px auto",
        borderCollapse: "collapse",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    };

    const headerStyle = {
        textAlign: "center",
        color: "#333",
        marginTop: "20px",
        fontSize: "28px",
    };

    const buttonContainerStyle = {
        display: "flex",
        justifyContent: "center",
        margin: "20px 0",
    };

    const newButtonStyle = {
        padding: "10px 20px",
        backgroundColor: "#ff6f00", // Naranja
        color: "#fff",
        textDecoration: "none",
        borderRadius: "5px",
        fontSize: "16px",
        boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
    };

    return (
        <>
            <h1 style={headerStyle}>Ventas</h1>
            <table style={tableStyle}>
                <thead>
                    <tr style={{ backgroundColor: "#fff3e0" }}> {/* Fondo suave naranja */}
                        <th style={tabEncabezado}>Id Venta</th>
                        <th style={tabEncabezado}>Fecha/Hora</th>
                        <th style={tabEncabezado}>Usuario</th>
                        <th style={tabEncabezado}>Producto</th>
                        <th style={tabEncabezado}>Estado</th>
                        <th style={tabEncabezado}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((venta, i) => (
                        <tr
                            key={i}
                            style={
                                i % 2 === 0
                                    ? { backgroundColor: "#ffebee" } // Fila con fondo claro
                                    : { backgroundColor: "#fff" } // Fila sin cambio de fondo
                            }
                        >
                            <td style={tabstyle2}>{venta.id}</td>
                            <td style={tabstyle2}>{venta.fechayhora}</td>
                            <td style={tabstyle2}>{venta.nombreUsuario}</td>
                            <td style={tabstyle2}>{venta.nombreProducto}</td>
                            <td style={tabstyle2}>{venta.estado}</td>
                            <td style={tabstyle2}>
                                <BorrarVenta id={venta.id} />
                                <> / </>
                                <Link
                                    href={`/ventas/modificar/${encodeURIComponent(
                                        JSON.stringify({ id: venta.id, cantidad: venta.cantidad })
                                    )}`}
                                    style={{ color: "#ff6f00" }} // Color naranja para el enlace
                                >
                                    Modificar
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={buttonContainerStyle}>
                <Link href="/ventas/nuevo" style={newButtonStyle}>
                    Nueva Venta
                </Link>
            </div>
        </>
    );
}
