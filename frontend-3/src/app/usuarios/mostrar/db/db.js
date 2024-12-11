// Importa las funciones necesarias del SDK de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase (usa tus propias credenciales)
const firebaseConfig = {
  apiKey: "AIzaSyD83MPCSnct4tslIhsMrz8mZpaYHJHdUlE",
  authDomain: "miproyecto-81e9c.firebaseapp.com",
  projectId: "miproyecto-81e9c",
  storageBucket: "miproyecto-81e9c.firebasestorage.app",
  messagingSenderId: "66215062474",
  appId: "1:66215062474:web:7fa9310e8161850d613d33",
  measurementId: "G-G0J3MGE8E7",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
export const db = getFirestore(app);

// Opcional: Inicializa Analytics solo si el entorno lo permite
if (typeof window !== "undefined") {
  import("firebase/analytics").then(({ getAnalytics }) => {
    getAnalytics(app);
  }).catch((error) => {
    console.warn("Firebase Analytics no está disponible en este entorno:", error);
  });
}
