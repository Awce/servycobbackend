const mongoose = require("mongoose");

const DictaminacionesSchema = mongoose.Schema({
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
    type: Number,
    trim: true,
  },
  monto: {
    type: Number,
    trim: true,
  },
  fechapago: {
    type: String,
    trim: true,
  },
  comentarios: {
    type: String,
    trim: true,
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
  gestor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Usuario",
  },
  dama: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "Asignacion",
  },
});

module.exports = mongoose.model("Dictaminacion", DictaminacionesSchema);
