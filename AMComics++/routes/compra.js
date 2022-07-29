import express from 'express';
import mongoose from 'mongoose';
import orders from '../models/orders.js';
import { v4 as uuidv4 } from "uuid";
import pkg from "yappy-node-back-sdk";

const { createClient } = pkg;
const compraRouter = express.Router();
const url = 'mongodb://localhost:27017/amcomic';


// Conection database
mongoose.connect(url, { useNewUrlParser: true });
var conn = mongoose.connection;
conn.on('connected', (err) => {
  if (err) throw err;
  console.log('Database is connected on: ' + url);
});

compraRouter.get('/', (req, res) => {
  res.render('./pages/compra');
});

//Yappy
compraRouter.post("/pagosbg", async (req, res) => {

  // Insert database
  const datos = req.body;
  console.log(datos);
  orders.insertMany(datos);

  let yappyClient = createClient(process.env.MERCHANT_ID, process.env.SECRET_KEY);
  const payment = {
    total: null,
    subtotal: null,
    shipping: 0.0,
    discount: 0.0,
    taxes: null,
    orderId: null,
    successUrl: "",
    failUrl: "",
    tel: process.env.TEL || "63409258",
    domain: process.env.DOMAIN || "https://yappy.peqa.dev",
  };

  const { name, price: subtotal } = req.body;
  const uuid = uuidv4();
  const taxes = Number((subtotal * 0.07).toFixed(2));
  const total = subtotal + taxes;
  const newPayment = {
    ...payment,
    subtotal: 0.01, // Para evitar tener que pagar durante la prueba
    taxes: 0.01, // Para evitar tener que pagar durante la prueba
    total: 0.02, // Para evitar tener que pagar durante la prueba
    orderId: uuid.split("-").join("").slice(0, 10),
  };
  const response = await yappyClient.getPaymentUrl(newPayment);
  if (response.success == true) {
  res.json(response);
  console.log(response);
  }

});


export default compraRouter;