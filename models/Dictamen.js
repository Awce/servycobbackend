const mongoose = require("mongoose");

const DictaminacionesSchema = mongoose.Schema({
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
  dictamen: {
    type: String,
    required: true,
    trim: true,
  },
  subdictamen: {
    type: String,
    required: true,
    trim: true,
  },
  razon: {
    type: String,
    required: true,
    trim: true,
  },
  folio: {
    type: String,
    trim: true,
  },
  total: {
    type: Number,
    default: 0,
    trim: true,
  },
  fechapago: {
    type: String,
    trim: true,
  },
  comentarios: {
    type: String,
    required: true,
    trim: true,
  },
  foto: {
    type: String,
    trim: true,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Usuario",
  },
  asignacion: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Asignacion",
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Dictaminacion", DictaminacionesSchema);
