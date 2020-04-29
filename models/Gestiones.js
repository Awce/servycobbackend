const mongoose = require("mongoose");

const GestionesSchema = mongoose.Schema({
  gestion: {
    type: Array,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  cliente: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "Cliente",
  },
  gestor: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "Usuario",
  },
  dama: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "Asignacion",
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Gestiones", GestionesSchema);
