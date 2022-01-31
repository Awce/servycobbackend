const mongoose = require("mongoose");

const SoportesSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  telefono: {
    type: String,
    required: true,
    trim: true,
  },
  modelo: {
    type: String,
    required: true,
    trim: true,
  },
  ubicacion: {
    type: String,
    required: true,
    trim: true,
  },
  motivollamada: {
    type: String,
    required: true,
    trim: true,
  },
  otro: {
    type: String,
    trim: true,
  },
  producto: {
    type: String,
    required: true,
    trim: true,
  },
  categoria: {
    type: String,
    required: true,
    trim: true,
  },
  motivo: {
    type: String,
    required: true,
    trim: true,
  },
  causa: {
    type: String,
    required: true,
    trim: true,
  },
  comentarios: {
    type: String,
    required: true,
    trim: true,
  },
  dictamen: {
    type: String,
    required: true,
    trim: true,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Usuario",
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Soporte", SoportesSchema);
