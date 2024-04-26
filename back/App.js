require('dotenv').config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const PORT = process.env.PORT || 3001;

const app = express();

const allowedOrigins = [
  "http://172.16.161.76:3001", //portatil clase
  "http://192.168.1.65:3001", //casa
  "http://172.16.26.27:3001", // clase ordenador
  "http://localhost:8081",    // localhost
  "http://192.168.0.48:3001", //casa lilian
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
app.use(express.json());  


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

app.get("/login", async (req, res) => {
  getConnection();
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute("SELECT * FROM users WHERE username = ? AND password = ?", [username, password]);
    if (rows.length > 0) {
      res.status(200).json({ message: "Inicio de sesión exitoso" });
    } else {
      res.status(401).json({ message: "Credenciales incorrectas" });
    }
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

app.get("/restartPassw", async (req, res) => {
  getConnection();
  res.json({ 
    newContaseña: "Nueva Contraseña:",
    repitNewContaseña: "Repite Contraseña:",
  });
});


app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto: ${PORT}`);
});
