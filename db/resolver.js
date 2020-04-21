//Data
const Usuario = require("../models/Usuario");
const Cliente = require("../models/Cliente");
const Dictamen = require("../models/Dictamen");
const bcrypjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

const crearToken = (usuario, secreta, expiresIn) => {
  console.log(usuario);
  const { id, email, nombre, apellido } = usuario;
  return jwt.sign({ id, email, nombre, apellido }, secreta, { expiresIn });
};

//Resolver
const resolvers = {
  Query: {
    obteneUsuario: async (_, { token }) => {
      const usuarioID = await jwt.verify(token, process.env.SECRETA);
      return usuarioID;
    },
    obtenerUsuarios: async () => {
      try {
        const usuarios = await Usuario.find({});
        return usuarios;
      } catch (error) {
        console.log(error);
      }
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
    nuevoDictamen: async (_, { input }, ctx) => {
      console.log("test");
    },
  },
};

module.exports = resolvers;
