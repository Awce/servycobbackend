const mongoose = require("mongoose");

const PagosSchema = mongoose.Schema({
  fechaentrega: {
    type: String,
    required: true,
    trim: true,
  },
  numdama: {
    type: String,
    required: true,
    trim: true,
  },
  cliente: {
    type: String,
    required: true,
    trim: true,
  },
  aniocampaniasaldo: {
    type: Number,
    required: true,
    trim: true,
  },
  fecha: {
    type: String,
    required: true,
    trim: true,
  },
  saldoanterior: {
    type: String,
    required: true,
    trim: true,
  },
  pago: {
    type: String,
    required: true,
    trim: true,
  },
  saldoactual: {
    type: String,
    required: true,
    trim: true,
  },
  tipopago: {
    type: String,
    required: true,
    trim: true,
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Pago", PagosSchema);
