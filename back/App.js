require('dotenv').config();

const express = require("express");

const cors = require("cors");
const mysql = require("mysql2/promise");

const PORT = process.env.PORT || 3001;

const app = express();

var session = require('express-session'); //importamos el session para poder utilizar el login
app.use(session({
  secret: 'contraseña-de-cifrado', // se utiliza para encriptar los datos de los inicios de sesión
  resave: false,
  saveUninitialized: false
}));

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
      req.session.userId = rows[0].id;
    } else {
      res.status(401).json({ message: "Credenciales incorrectas" });
    }
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

app.get("/loginCheck", async (req, res) => {
  getConnection();
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

app.get("/register", async (req, res) => {
  getConnection();
})

app.post("/register", async (req, res) => {
  const { username, password, names, surnames, address, birthDate,
    dni, grade, pastGrade, seguro, cuotaCide, familiaNumerosa,
    contactNames, contactSurnames, contactDni, contactEmail,
    IBAN } = req.body;

  const namesSplit = names.split(" ");
  const surnameSplit = surnames.split(" ");

  const contactNamesSplit = contactNames.split(" ");
  const contactSurnameSplit = contactSurnames.split(" ");

  try {
    const connection = await getConnection();

    await connection.query(
      "INSERT INTO userApp (usuario, contraseña) VALUES (?, ?)", [username, password]
    )

    await connection.query(
      "INSERT INTO contacto (nombr1, nombre2, apellido1, apellido2, dni, email) VALUES (?, ?, ?, ?, ?, ?)",
      [contactNamesSplit[0], contactNamesSplit[1], contactSurnameSplit[0], contactSurnameSplit[1], contactDni, contactEmail]
    )

    const [rowsUserApp] = await connection.execute("SELECT id FROM userApp WHERE usuario = ? AND contraseña = ?", [username, password]);
    if (rowsUserApp.length > 0) {
      const userId = rowsUserApp[0].id;
      await connection.query(
        "INSERT INTO estudiantes (nombr1, nombre2, apellido1, " +
        "apellido2, dirreccion, fecha_nacimiento, dni, curso, " +
        "centro_anterior, iban, dni_contacto, id_user, familia_numerosa, seguro, cuota_cide) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [namesSplit[0], namesSplit[1], surnameSplit[0], surnameSplit[1], address,
          birthDate, dni, grade, pastGrade, IBAN, contactDni, userId, familiaNumerosa, seguro, cuotaCide]
      )
      await connection.query(
        "INSERT INTO curso_escolar (nombre_curso, estudiante_nif) VALUES (?, ?)", [grade, dni]
      )
      res.status(200).json({ message: "Datos registrados correctamente" });
    } else {
      res.status(401).json({ message: "No encontrado" });
    }
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

app.get("/menuPage", async (req, res) => {
  getConnection();
  
});

app.post("/menuPage", async (req, res) => {
  getConnection();
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto: ${PORT}`);
});
