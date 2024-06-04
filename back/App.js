require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const PORT = process.env.PORT || 3001;
const app = express();
var session = require('express-session');

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Establecer en true si estás en https
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
  methods: ["GET", "POST"],
  credentials: true,
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
    console.log(error);
    throw new Error("Error al conectar con la base de datos");
  }
};

app.get("/", async (req, res) => {
  res.json({ message: "CENTRE\nINTENACIONAL D'EDUCACIÓ" });
});

app.get("/logReg", (req, res) => {
  res.json({
    login: "Iniciar Sesión",
    register: "Registrarse"
  });
});

app.get("/login", async (req, res) => {
  res.json({ message: "Login page" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute("SELECT * FROM userApp WHERE usuario = ? AND contraseña = ?", [username, password]);
    if (rows.length > 0) {
      req.session.userId = rows[0].id;
      res.status(200).json({ message: "Inicio de sesión exitoso", loggedIn: true });
    } else {
      res.status(401).json({ message: "Credenciales incorrectas", loggedIn: false });
    }
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res.status(500).json({ message: "Error en el servidor", loggedIn: false });
  }
});

app.get("/loginCheck", (req, res) => {
  if (req.session.userId) {
    res.json({ loggedIn: true, user: req.session.userId });
  } else {
    res.json({ loggedIn: false });
  }
});

app.get("/register", (req, res) => {
  res.json({ message: "Register page" });
});

app.post("/register", async (req, res) => {
  const { username, password, names, surnames, address, birthDate, dni, grade, pastGrade, seguro, cuotaCide, familiaNumerosa, contactNames, contactSurnames, contactDni, contactEmail, IBAN } = req.body;

  const namesSplit = names.split(" ");
  const surnameSplit = surnames.split(" ");
  const contactNamesSplit = contactNames.split(" ");
  const contactSurnameSplit = contactSurnames.split(" ");

  try {
    const connection = await getConnection();

    const [rowsContactDni] = await connection.execute("SELECT COUNT(*) as count FROM estudiantes WHERE dni_contacto = ?", [contactDni]);
    const isFamiliaNumerosa = rowsContactDni[0].count >= 3;

    if (familiaNumerosa && !isFamiliaNumerosa) {
      return res.status(400).json({ message: "No es una familia numerosa" });
    }

    await connection.query(
      "INSERT INTO userApp (usuario, contraseña) VALUES (?, ?)", [username, password]
    );

    await connection.query(
      "INSERT INTO contacto (nombr1, nombre2, apellido1, apellido2, dni, email) VALUES (?, ?, ?, ?, ?, ?)",
      [contactNamesSplit[0], contactNamesSplit[1], contactSurnameSplit[0], contactSurnameSplit[1], contactDni, contactEmail]
    );

    const [rowsUserApp] = await connection.execute("SELECT id FROM userApp WHERE usuario = ? AND contraseña = ?", [username, password]);
    if (rowsUserApp.length > 0) {
      const userId = rowsUserApp[0].id;

      await connection.query(
        "INSERT INTO estudiantes (nombr1, nombre2, apellido1, apellido2, dirreccion, fecha_nacimiento, dni, curso, centro_anterior, iban, dni_contacto, id_user, familia_numerosa, seguro, cuota_cide) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [namesSplit[0], namesSplit[1], surnameSplit[0], surnameSplit[1], address, birthDate, dni, grade, pastGrade, IBAN, contactDni, userId, isFamiliaNumerosa, seguro, cuotaCide]
      );

      await connection.query(
        "INSERT INTO curso_escolar (nombre_curso, estudiante_nif) VALUES (?, ?)", [grade, dni]
      );

      res.status(200).json({ message: "Datos registrados correctamente" });
    } else {
      res.status(401).json({ message: "No encontrado" });
    }
  } catch (error) {
    console.error("Error en el registro de datos:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

app.get("/restartPassw", (req, res) => {
  res.json({
    newContaseña: "Nueva Contraseña:",
    repitNewContaseña: "Repite Contraseña:",
  });
});

app.get("/menuPage", async (req, res) => {
  const connection = await getConnection();

  if (req.session.userId) {
    const userId = req.session.userId;
    const [rowsContactName] = await connection.execute(
      `
      SELECT contacto.nombr1, contacto.apellido1
      FROM estudiantes
      INNER JOIN contacto ON estudiantes.dni_contacto = contacto.dni
      WHERE estudiantes.id_user = ?
    `,
      [userId]
    );
    if (rowsContactName.length > 0) {
      res.status(200).json({ loggedIn: true, user: req.session.userId, contactName: rowsContactName[0] });
    } else {
      res.status(200).json({ loggedIn: true, user: req.session.userId, message: "No se encontró el contacto" });
    }
  } else {
    res.json({ loggedIn: false });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.json({ logout: false });
    }

    res.clearCookie('sid');
    res.json({ logout: true });
  });
});

app.get("/materialPage", async (req, res) => {
  const connection = await getConnection();

  if (req.session.userId) {
    const userId = req.session.userId;
    const [rows] = await connection.execute("SELECT * FROM productos");

    // Obtiene la cantidad de productos en el carrito
    const [cartRows] = await connection.execute(`
          SELECT COUNT(*) as count 
          FROM carrito_productos 
          WHERE id_usuario = ?
      `, [userId]);
    const cartCount = cartRows[0].count;

    if (rows.length > 0) {
      res.status(200).json({ loggedIn: true, user: req.session.userId, products: rows, cartCount });
    } else {
      res.status(200).json({ loggedIn: true, user: req.session.userId, message: "No se encontró el producto", cartCount });
    }
  } else {
    res.json({ loggedIn: false });
  }
});

app.post("/materialPage", async (req, res) => {
  const connection = await getConnection();
  if (req.session.userId) {
    const userId = req.session.userId;
    const product = req.body;
    console.log(product.id);
    await connection.query(
      "INSERT INTO carrito_productos (id_usuario, id_producto, estado) VALUES (?, ?, ?)", [userId, product.id, "pendiente"]
    );
    console.log("Producto agregado al carrito", product.id);
    res.status(200).json({ message: "Producto agregado al carrito" });
  } else {
    res.json({ loggedIn: false });
  }
});

app.get("/serviciosPage", async (req, res) => {
  const connection = await getConnection();

  if (req.session.userId) {
    const userId = req.session.userId;
    const [rows] = await connection.execute("SELECT * FROM extraescolares");

    // Obtiene la cantidad de productos en el carrito
    const [cartRows] = await connection.execute(`
          SELECT COUNT(*) as count 
          FROM carrito_extraescolares 
          WHERE id_usuario = ? AND estado = 'pendiente'
      `, [userId]);
    const cartCount = cartRows[0].count;

    if (rows.length > 0) {
      res.status(200).json({ loggedIn: true, user: req.session.userId, servicios: rows, cartCount });
    } else {
      res.status(200).json({ loggedIn: true, user: req.session.userId, message: "No se encontró el producto", cartCount });
    }
  } else {
    res.json({ loggedIn: false });
  }
});

app.post("/serviciosPage", async (req, res) => {
  const connection = await getConnection();
  if (req.session.userId) {
    const userId = req.session.userId;
    const product = req.body;
    console.log(product.id);
    await connection.query(
      "INSERT INTO carrito_extraescolares (id_usuario, id_extraescolares, estado) VALUES (?, ?, ?)", [userId, product.id, "pendiente"]
    );
    console.log("Producto agregado al carrito", product.id);
    res.status(200).json({ message: "Producto agregado al carrito" });
  } else {
    res.json({ loggedIn: false });
  }
});

app.get("/carrito", async (req, res) => {
  const connection = await getConnection();

  if (req.session.userId) {
    const userId = req.session.userId;
    const [rows] = await connection.execute(`
          SELECT productos.* 
          FROM productos 
          INNER JOIN carrito_productos 
          ON productos.id = carrito_productos.id_producto 
          WHERE carrito_productos.id_usuario = ? AND carrito_productos.estado = 'pendiente'
      `, [userId]);

    // Obtiene el total de todos los productos en el carrito
    const [totalRows] = await connection.execute(`
          SELECT SUM(productos.precio) as total 
          FROM productos 
          INNER JOIN carrito_productos 
          ON productos.id = carrito_productos.id_producto 
          WHERE carrito_productos.id_usuario = ?
      `, [userId]);
    const total = totalRows[0].total;

    if (rows.length > 0) {
      res.status(200).json({ loggedIn: true, user: req.session.userId, products: rows, total });
    } else {
      res.status(200).json({ loggedIn: true, user: req.session.userId, message: "No se encontró el producto", total });
    }
  } else {
    res.json({ loggedIn: false });
  }
});

app.get("/carritoServ", async (req, res) => {
  const connection = await getConnection();

  if (req.session.userId) {
    const userId = req.session.userId;
    const [rows] = await connection.execute(`
          SELECT extraescolares.* 
          FROM extraescolares 
          INNER JOIN carrito_extraescolares 
          ON extraescolares.id = carrito_extraescolares.id_extraescolares 
          WHERE carrito_extraescolares.id_usuario = ? AND carrito_extraescolares.estado = 'pendiente'
      `, [userId]);

    // Obtiene el total de todos los productos en el carrito
    const [totalRows] = await connection.execute(`
          SELECT SUM(extraescolares.precio) as total 
          FROM extraescolares 
          INNER JOIN carrito_extraescolares
          ON extraescolares.id = carrito_extraescolares.id_extraescolares
          WHERE carrito_extraescolares.id_usuario = ? AND carrito_extraescolares.estado = 'pendiente'
      `, [userId]);
    const total = totalRows[0].total;

    if (rows.length > 0) {
      res.status(200).json({ loggedIn: true, user: req.session.userId, servicos: rows, total });
    } else {
      res.status(200).json({ loggedIn: true, user: req.session.userId, message: "No se encontró el producto", total });
    }
  } else {
    res.json({ loggedIn: false });
  }
});


app.get("/perfilPage", async (req, res) => {
  const connection = await getConnection();

  if (req.session.userId) {
    const userId = req.session.userId;

    const [rowsContactName] = await connection.execute(
      `
        SELECT contacto.*
        FROM estudiantes
        INNER JOIN contacto ON estudiantes.dni_contacto = contacto.dni
        WHERE estudiantes.id_user = ?
      `,
      [userId]
    );

    if (rowsContactName.length > 0) {
      res.status(200).json({ loggedIn: true, user: req.session.userId, contacto: rowsContactName[0] });
    } else {
      res.status(200).json({ loggedIn: true, user: req.session.userId, message: "No se encontró el contacto", cartCount });
    }
  } else {
    res.json({ loggedIn: false });
  }
});

app.post("/addStudent", async (req, res) => {
  const connection = await getConnection();
  const { names, surnames, address, birthDate, dni, grade, pastGrade, seguro, cuotaCide, familiaNumerosa } = req.body;

  const namesSplit = names.split(" ");
  const surnameSplit = surnames.split(" ");

  if (req.session.userId) {
    const userId = req.session.userId;

    const [rowStudent] = await connection.execute("SELECT * FROM estudiantes WHERE id_user = ?", [userId]);
    const IBAN = rowStudent[0].iban;
    const contactDni = rowStudent[0].dni_contacto;

    const [rowsContactDni] = await connection.execute("SELECT COUNT(*) as count FROM estudiantes WHERE dni_contacto = ?", [dni]);
    const isFamiliaNumerosa = rowsContactDni[0].count >= 3;
    if (familiaNumerosa && !isFamiliaNumerosa) {
      return res.status(400).json({ message: "No es una familia numerosa" });
    }
    await connection.query(
      "INSERT INTO estudiantes (nombr1, nombre2, apellido1, apellido2, dirreccion, fecha_nacimiento, dni, curso, centro_anterior, iban, dni_contacto, id_user, familia_numerosa, seguro, cuota_cide) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [namesSplit[0], namesSplit[1], surnameSplit[0], surnameSplit[1], address, birthDate, dni, grade, pastGrade, IBAN, contactDni, userId, familiaNumerosa, seguro, cuotaCide]
    );
    console.log("Datos registrados correctamente");
    res.status(200).json({ message: "Datos registrados correctamente" });
  }
});

app.post("/payServicios", async (req, res) => {
  if (req.session.userId) {
    const connection = await getConnection();
    const userId = req.session.userId;

    const [rowsServ] = await connection.execute("SELECT * FROM carrito_extraescolares WHERE id_usuario = ? AND estado = 'pendiente'", [userId]);

    for (let i = 0; i < rowsServ.length; i++) {
      const servicio = rowsServ[i];

      // Disminuir la cantidad de plazas disponibles en el servicio
      await connection.execute(
        "UPDATE extraescolares SET plazas = plazas - 1 WHERE id = ?",
        [servicio.id_extraescolares]
      );

      // Marcar el servicio como completado para el usuario
      await connection.execute(
        "UPDATE carrito_extraescolares SET estado = 'completado' WHERE id_carrito = ?",
        [servicio.id_carrito]
      );
    }
    res.status(200).json({ loggedIn: true, user: req.session.userId, message: "Pago realizado correctamente y carrito limpio" });
  } else {
    res.json({ loggedIn: false });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto: ${PORT}`);
});
