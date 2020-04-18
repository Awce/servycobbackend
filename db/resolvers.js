//Data
const Usuario = require("../models/Usuario");
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
  },
};

module.exports = resolvers;
