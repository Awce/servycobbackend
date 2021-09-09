const mongoose = require("mongoose");

const AsignacionesSchema = mongoose.Schema({
  campanaventa: {
    type: String,
    trim: true,
  },
  ruta: {
    type: String,
    trim: true,
  },
  numerozonafacturacion: {
    type: Number,
    required: true,
    trim: true,
  },
  liquidacion: {
    type: Number,
    required: true,
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
  referencia: {
    type: String,
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
  totalacobrar: {
    type: Number,
    required: true,
    trim: true,
  },
  aniocampaniasaldo: {
    type: String,
    required: true,
    trim: true,
  },
  campanasvencidas: {
    type: String,
    required: true,
    trim: true,
  },
  cau: {
    type: String,
    required: true,
    trim: true,
  },
  idsituacion: {
    type: String,
    required: true,
    trim: true,
  },
  descsituacion: {
    type: String,
    required: true,
    trim: true,
  },
  idsituacioncie: {
    type: String,
    required: true,
    trim: true,
  },
  descsituacioncie: {
    type: String,
    required: true,
    trim: true,
  },
  tipocartera: {
    type: String,
    required: true,
    trim: true,
  },
  cierre: {
    type: String,
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

AsignacionesSchema.index({ nombre: "text" });

module.exports = mongoose.model("Asignacion", AsignacionesSchema);
