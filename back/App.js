require('dotenv').config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const PORT = process.env.PORT || 3001;

const app = express();

const allowedOrigins = [
  "http://172.16.161.76:3001",
  "http://192.168.1.65:3001", // IP de la red local
  "http://localhost:8081",    // localhost
];

const corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST"], // Permitir solicitudes GET y POST
  credentials: true, // Habilitar credenciales
};

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

app.use(cors(corsOptions));


const getConnection = async () => {
  try{
    const connection = await mysql.createConnection(dbConfig);
    return connection;
  }catch(error){
    console.log(error)
    throw new Error("Error al conectar con la base de datos")
  }
}

app.get("/", async (req, res) => {
  getConnection();
  res.json({ message: "CENTRE\nINTENACIONAL D'EDUCACIÓ" });
});

app.get("/logReg", async (req, res) => {
  getConnection();
  res.json({ 
    login: "Iniciar Sesión", 
    register: "Registrarse" 
  });
});


app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto: ${PORT}`);
});
