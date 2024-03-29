//Data
const Usuario = require("../models/Usuario");
const Cliente = require("../models/Cliente");
const Dictamen = require("../models/Dictamen");
const Asignacion = require("../models/Asignacion");
const Evento = require("../models/Evento");
const Soporte = require("../models/Soporte");

const bcrypjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

const crearToken = (usuario, secreta, expiresIn) => {
  console.log(usuario);
  const { id, email, nombre, apellido, avatar, tipousuario } = usuario;
  return jwt.sign(
    { id, email, nombre, apellido, avatar, tipousuario },
    secreta,
    {
      expiresIn,
    }
  );
};

//Resolver
const resolvers = {
  Query: {
    obtenerUsuario: async (_, {}, ctx) => {
      return ctx.usuario;
    },
    obtenerUsuarios: async () => {
      try {
        const usuarios = await Usuario.find({});
        return usuarios;
      } catch (error) {
        console.log(error);
      }
    },
    obtenerDetallesUsuario: async (_, { id }) => {
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        throw new Error("El usuario no existe");
      }
      return usuario;
    },
    obtenerClientes: async () => {
      try {
        const clientes = await Cliente.find({});
        return clientes;
      } catch (error) {
        console.log(error);
      }
    },
    obtenerCliente: async (_, { id }) => {
      // revisar si existe
      const cliente = await Cliente.findById(id);
      if (!cliente) {
        throw new Error("El cliente no se encontro");
      }
      // si pasa la se retorna el cliente
      return cliente;
    },
    obtenerSoportes: async () => {
      try {
        const soportes = await Soporte.find({});
        return soportes;
      } catch (error) {
        console.log(error);
      }
    },
    obtenerSoportesUsuario: async (_, {}, ctx) => {
      try {
        const soportes = await Soporte.find({
          usuario: ctx.usuario.id,
        }).populate("Soporte");
        return soportes;
      } catch (error) {
        console.log(error);
      }
    },
    obtenerSoporte: async (_, { id }) => {
      const soporte = await Soporte.findById(id);
      if (!soporte) {
        throw new Error("No existe ese folio de soporte");
      }
      return soporte;
    },
    obtenerDictamenes: async () => {
      try {
        const dictamenes = await Dictamen.find({});
        return dictamenes;
      } catch (error) {
        console.log(error);
      }
    },
    obtenerDictamenesUsuario: async (_, {}, ctx) => {
      try {
        const dictamenes = await Dictamen.find({
          usuario: ctx.usuario.id,
        }).populate("Dictamen");
        return dictamenes;
      } catch (error) {
        console.log(error);
      }
    },
    obtenerDictamenesAsignacion: async (_, { asignacion }) => {
      try {
        const dictamenes = await Dictamen.find({
          asignacion: asignacion,
        }).populate("Dictamen");
        return dictamenes;
      } catch (error) {
        console.log(error);
      }
    },
    obtenerAsignaciones: async () => {
      try {
        const asignaciones = await Asignacion.find({});
        return asignaciones;
      } catch (error) {
        console.log(error);
      }
    },
    obtenerAsignacionesUsuario: async (_, {}, ctx) => {
      try {
        const asignaciones = await Asignacion.find({
          usuario: ctx.usuario.id,
        }).populate("Asignacion");
        return asignaciones;
      } catch (error) {
        console.log(error);
      }
    },
    obtenerAsignacion: async (_, { id }) => {
      const asignacion = await Asignacion.findById(id);
      if (!asignacion) {
        throw new Error("La Dama no se encontro");
      }
      return asignacion;
    },
    mejoresUsuarios: async () => {
      const usuarios = await Dictamen.aggregate([
        { $match: { razon: "Pago Total" } },
        {
          $group: {
            _id: "$usuario",
            total: { $sum: "$total" },
          },
        },
        {
          $lookup: {
            from: "usuarios",
            localField: "_id",
            foreignField: "_id",
            as: "usuario",
          },
        },
        {
          $limit: 10,
        },
        {
          $sort: { total: -1 },
        },
      ]);
      return usuarios;
    },
    buscarAsignacion: async (_, { texto }) => {
      const asignaciones = await Asignacion.find({ $text: { $search: texto } });
      return asignaciones;
    },
  },

  Mutation: {
    nuevoUsuario: async (_, { input }) => {
      const { email, password } = input;

      // revisar que no este registrado
      const existeUsuario = await Usuario.findOne({ email });
      if (existeUsuario) {
        throw new Error("El usuario ya existe");
      }
      // hash del password
      const salt = await bcrypjs.genSalt(10);
      input.password = await bcrypjs.hash(password, salt);

      // guardar en la base de datos
      try {
        const usuario = new Usuario(input);
        usuario.save();
        return usuario; // retornar usuario
      } catch (error) {
        console.log(error);
      }
    },
    autenticarUsuario: async (_, { input }) => {
      const { email, password } = input;

      // si el usario existe
      const existeUsuario = await Usuario.findOne({ email });
      if (!existeUsuario) {
        throw new Error("El usuario no existe");
      }

      // revisar que el password sea correcto
      const passwordCorrecto = await bcrypjs.compare(
        password,
        existeUsuario.password
      );
      if (!passwordCorrecto) {
        throw new Error("El password es incorrecto");
      }
      // enviar el token
      return {
        token: crearToken(existeUsuario, process.env.SECRETA, "24h"),
      };
    },
    nuevoCliente: async (_, { input }) => {
      const { email } = input;
      // validar que no exista
      const existeCliente = await Cliente.findOne({ email });
      if (existeCliente) {
        throw new Error("Cliente ya registrado");
      }
      // guardar en la bd
      try {
        const nuevoCliente = new Cliente(input);
        const resultado = await nuevoCliente.save();
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },
    actualizarCliente: async (_, { id, input }) => {
      // verificar si existe
      let cliente = await Cliente.findById(id);
      if (!cliente) {
        throw new Error("El cliente no existe");
      }
      // guardar
      cliente = await Cliente.findOneAndUpdate({ _id: id }, input, {
        new: true,
      });
      return cliente;
    },
    eliminarCliente: async (_, { id }) => {
      // verificar si existe
      let cliente = await Cliente.findById(id);
      if (!cliente) {
        throw new Error("El cliente no existe");
      }
      // se elimina de la bd
      await Cliente.findOneAndDelete({ _id: id });
      return "Cliente eliminado";
    },
    nuevoSoporte: async (_, { input }, ctx) => {
      const crearSoporte = new Soporte(input);
      // asignar el usario
      crearSoporte.usuario = ctx.usuario.id;
      // guardar en la bd
      try {
        const resultado = await crearSoporte.save();
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },
    nuevaAsignacion: async (_, { input }, ctx) => {
      const nuevaAsignacion = new Asignacion(input);
      //asignar el usuario
      nuevaAsignacion.usuario = ctx.usuario.id;
      // guardar en la bd
      try {
        const resultado = await nuevaAsignacion.save();
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },
    nuevoDictamen: async (_, { input }, ctx) => {
      const nuevoDictamen = new Dictamen(input);
      // asignar el usuario
      nuevoDictamen.usuario = ctx.usuario.id;
      // guardar en la bd
      try {
        const resultado = await nuevoDictamen.save();
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = resolvers;
