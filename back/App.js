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
  try {
    const connection = await mysql.createConnection(dbConfig);
    return connection;
  } catch (error) {
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

app.get("/register", async (req, res) => {
  getConnection();
})

app.post("/register", async (req, res) => {
  const { username, password, names, surnames,
    address, birthDate, dni, grade, anteriorCentro,
    contactNames, contactSurnames, contactDni, contactEmail,
    IBAN, entidad, oficina, DC, numberAccount } = req.body;

  const namesSplit = names.split(" ");
  const surnameSplit = surnames.split(" ");

  const contactNamesSplit = contactNames.split(" ");
  const contactSurnameSplit = contactSurnames.split(" ");

  const ibanComplete = IBAN + entidad + oficina + DC + numberAccount;

  try {
    const connection = await getConnection();

    await connection.query(
      "Insert into userApp (usuario, contraseña) values (?, ?)", [username, password]
    )

    const [rows] = await connection.execute("SELECT id FROM userApp WHERE usuario = ? AND contraseña = ?", [username, password]);
    if (rows.length > 0) {
      const userId = rows[0].id;
      res.status(200).json({ message: "Obtencion exitosa", userId });
    } else {
      res.status(401).json({ message: "No encontrado" });
    }
    await connection.query(
      "Insert into contacto (nombr1, nombre2, apellido1, apellido2, dni, email) values (?, ?, ?, ?, ?, ?)", 
      [contactNamesSplit[0], contactNamesSplit[1], contactSurnameSplit[0], contactSurnameSplit[1], contactDni, contactEmail]
    )

    await connection.query(
      "Insert into estudiantes (nombr1, nombre2, apellido1, apellido2, dirreccion, fecha_nacimiento, dni, curso_a_cursar, centro_anterior, iban, dni_contacto, id_user) values (?, ?, ?, ?, ?, ?)", 
      [namesSplit[0], namesSplit[1], surnameSplit[0], surnameSplit[1], address, birthDate, dni, grade, anteriorCentro, ibanComplete, contactDni, userId]
    )

    res.status(200).json({ message: "Datos registrados correctamente" });
  } catch (error) {
    console.error("Error en el registro de datos:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
})

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
