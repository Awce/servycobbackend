const mongoose = require("mongoose");

const AsignacionesSchema = mongoose.Schema({
  tipocartera: {
    type: String,
    required: true,
    trim: true,
  },
  cv: {
    type: String,
    trim: true,
  },
  numdama: {
    type: String,
    required: true,
    trim: true,
  },
  digitodama: {
    type: String,
    required: true,
    trim: true,
  },
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  numerozonafacturacion: {
    type: Number,
    required: true,
    trim: true,
  },
  aniocampaniasaldo: {
    type: Number,
    required: true,
    trim: true,
  },
  nombregerente: {
    type: String,
    trim: true,
  },
  saldofactura: {
    type: Number,
    trim: true,
  },
  saldocobro: {
    type: Number,
    required: true,
    trim: true,
  },
  saldoactual: {
    type: Number,
    required: true,
    trim: true,
  },
  telefonocasa: {
    type: String,
    trim: true,
  },
  telefonocelular: {
    type: String,
    trim: true,
  },
  direccion: {
    type: String,
    required: true,
    trim: true,
  },
  colonia: {
    type: String,
    required: true,
    trim: true,
  },
  referencia: {
    type: String,
    required: true,
    trim: true,
  },
  poblacion: {
    type: String,
    required: true,
    trim: true,
  },
  estado: {
    type: String,
    required: true,
    trim: true,
  },
  codigopostal: {
    type: String,
    trim: true,
  },
  fechafacturacion: {
    type: String,
    required: true,
    trim: true,
  },
  fechafinalvigencia: {
    type: String,
    required: true,
    trim: true,
  },
  descsituacion: {
    type: String,
    trim: true,
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Cliente",
  },
  gestor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Usuario",
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Asignacion", AsignacionesSchema);
