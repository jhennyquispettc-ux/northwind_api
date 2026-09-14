require('dotenv').config();
const express = require('express');
const app = express();
const puerto = process.env.PORT || 3000;
const routes = require('./routes')
app.use(express.json());
app.use('/api', routes);
app.listen(puerto, () => {
  console.log(`Servidor corriendo en el puerto ${puerto}`);
});

module.exports = app;