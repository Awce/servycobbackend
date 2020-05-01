const { gql } = require("apollo-server");
//Schema
const typeDefs = gql`
  type Usuario {
    id: ID
    nombre: String
    apellido: String
    email: String
    avatar: String
    tipousuario: TipoDeUsuario
    creado: String
  }

  type Token {
    token: String
  }

  type Cliente {
    id: ID
    empresa: String
    razonsocial: String
    rfc: String
    direccion: String
    email: String
    telefono: String
    logo: String
    web: String
    creado: String
  }

  type Dictamen {
    id: ID
    dictamen: String
    subdicatem: String
    razon: String
    folio: Int
    monto: Float
    fechapago: String
    comentarios: String
    gestor: ID
    dama: ID
    creado: String
  }

  input UsuarioInput {
    nombre: String!
    apellido: String!
    email: String!
    password: String!
    avatar: String
    tipousuario: TipoDeUsuario
  }

  enum TipoDeUsuario {
    Admin
    Gestor
    Desarrollador
  }

  input AutenticarInput {
    email: String!
    password: String!
  }

  input ClienteInput {
    empresa: String!
    razonsocial: String!
    rfc: String
    direccion: String!
    email: String!
    telefono: String
    logo: String
    web: String
  }

  input DictamenInput {
    dictamen: String!
    subdicatem: String!
    razon: String!
    folio: Int
    monto: Float
    fechapago: String
    comentarios: String
  }

  type Query {
    # Usuario
    obtenerUsuario: Usuario
    obtenerUsuarios: [Usuario]
    # Cliente
    obtenerClientes: [Cliente]
    obtenerCliente(id: ID!): Cliente
    # Dictamen
    obtenerDictamenes: [Dictamen]
    obtenerDictamenDama: [Dictamen]
  }

  type Mutation {
    # Usuario
    nuevoUsuario(input: UsuarioInput): Usuario
    autenticarUsuario(input: AutenticarInput): Token
    # Cliente
    nuevoCliente(input: ClienteInput): Cliente
    actualizarCliente(id: ID!, input: ClienteInput): Cliente
    eliminarCliente(id: ID!): String
    # Dictamen
    nuevoDictamen(input: DictamenInput): Dictamen
  }
`;

module.exports = typeDefs;
