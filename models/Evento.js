const mongoose = require("mongoose");

const EventosSchema = mongose.Schema({
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
    type: Date,
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
