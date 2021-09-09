const mongoose = require("mongoose");

const ClientesSchema = mongoose.Schema({
  empresa: {
    type: String,
    required: true,
    trim: true,
  },
  razonsocial: {
    type: String,
    required: true,
    trim: true,
  },
  rfc: {
    type: String,
    trim: true,
  },
  direccion: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  telefono: {
    type: String,
    trim: true,
  },
  logo: {
    type: String,
    trim: true,
  },
  web: {
    type: String,
    trim: true,
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Cliente", ClientesSchema);
