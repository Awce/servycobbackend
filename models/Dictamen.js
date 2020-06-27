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
  monto: {
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
  creado: {
    type: Date,
    default: Date.now(),
  },
  gestor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Usuario",
  },
  // dama: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: "Asignacion",
  // },
});

module.exports = mongoose.model("Dictaminacion", DictaminacionesSchema);
