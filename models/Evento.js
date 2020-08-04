const mongoose = require("mongoose");

const EventosSchema = mongoose.Schema({
  tipoevento: {
    type: String,
    default: "Cobranza",
    trim: true,
  },
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  fecha: {
    type: String,
    required: true,
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

module.exports = mongoose.model("Evento", EventosSchema);
