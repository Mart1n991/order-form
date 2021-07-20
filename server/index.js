require("dotenv").config();
const express = require("express");
const mySql = require("mysql");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Email
app.post("/send_email", async (req, res) => {
  let customer = req.body;
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
    secure: true,
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    await transport.sendMail({
      from: `${customer.email}`,
      to: "test@test.sk",
      subject: "Testovací email",
      html: `<h1>Objednávka</h1>
              <p>Od: ${customer.firstName} ${customer.lastName}</p>
              <p>Email: ${customer.email}</p>
      `,
    });
    console.log("Email bol úspešne odoslaný");
    return res;
  } catch (error) {
    return error;
  }
});

//database config
const db = mySql.createConnection({
  user: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
});

db.connect();

app.post("/addCustomer", async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  try {
    await db.query(
      "INSERT INTO customers (first_name, last_name, email) VALUES (?,?,?)",
      [firstName, lastName, email],
      (err, result) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
});

const port = process.env.PORT || 3001;

app.listen(port);
