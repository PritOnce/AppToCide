require('dotenv').config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const PORT = process.env.PORT || 3001;

const app = express();

const allowedOrigins = [
  process.env.PORTATIL_CLASE,
  process.env.CASA,
  process.env.CLASE_ORDENADOR,
  process.env.LOCALHOST,
  process.env.CASA_LILIAN,
  process.env.CASA_PORTATIL
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
    const [rows] = await connection.execute("SELECT * FROM userApp WHERE usuario = ? AND contraseña = ?", [username, password]);
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
