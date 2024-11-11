const mongoose = require("mongoose");

mongoose
  .connect(process.env.URI, {})
  .then(() => console.log("Base de dato conectada! "))
  .catch((e) => console.log("error de conexión: " + e));
