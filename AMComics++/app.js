import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from "cors";

import apiRouter from './routes/api.js';
import compraRouter from './routes/compra.js';

dotenv.config();
const app = express();

app.set('port', process.env.PORT || 3000);

//Motor de plantilla EJS
app.set('view engine', 'ejs');

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//archivos públicos
app.use(express.static('public'));
//routes
app.use('/api', apiRouter);
app.use('/buy', compraRouter);


//index page
app.get('/', function (req, res) {
  res.render('index');
});


//Error 500
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.send('500 - Server Error');
});


//Error 404
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(404);
  res.send('404 - Not Found');
});


app.listen(app.get('port'), function () {
  console.log('Servidor iniciado en http://localhost:' +
    app.get('port') + '; presiona Ctrl-C para terminar.');
});