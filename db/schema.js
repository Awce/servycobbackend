const { gql } = require("apollo-server");
//Schema
const typeDefs = gql`
  # Types

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
    numdama: String
    digitodama: String
    dictamen: String
    subdictamen: String
    razon: String
    folio: String
    total: Int
    fechapago: String
    comentarios: String
    usuario: ID
    asignacion: ID
    creado: String
  }

  type Asignacion {
    id: ID
    campanaventa: String
    ruta: String
    numerozonafacturacion: Int
    liquidacion: Int
    numdama: String
    digitodama: String
    nombre: String
    direccion: String
    colonia: String
    poblacion: String
    estado: String
    codigopostal: String
    referencia: String
    telefonocasa: String
    telefonocelular: String
    totalacobrar: Float
    aniocampaniasaldo: Int
    campanasvencidas: Int
    cau: String
    idsituacion: String
    descsituacion: String
    idsituacioncie: String
    descsituacioncie: String
    tipocartera: String
    cierre: String
    latitud: String
    longitud: String
    usuario: ID
    creado: String
  }

  type TotalAsignaciones {
    total: Int
    usuario: [Usuario]
  }

  type TotalGestiones {
    total: Int
    usuario: [Usuario]
  }

  type TopUsuarios {
    total: Float
    usuario: [Usuario]
  }

  # Inputs

  input UsuarioInput {
    nombre: String!
    apellido: String!
    email: String!
    password: String!
    avatar: String
    tipousuario: TipoDeUsuario
  }

  enum TipoDeUsuario {
    Administrador
    Gestor
    Supervisor
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
    direccion: String
    email: String!
    telefono: String
    logo: String
    web: String
  }

  input DictamenInput {
    numdama: String!
    digitodama: String!
    dictamen: String!
    subdictamen: String!
    razon: String!
    folio: String
    total: Float
    fechapago: String
    comentarios: String!
  }

  input AsignacionInput {
    numdama: String!
    digitodama: String!
    nombre: String!
  }

  type Query {
    # Usuario
    obtenerUsuario: Usuario
    obtenerUsuarios: [Usuario]
    obtenerUsario(id: ID!): Usuario
    obtenerDetallesUsuario(id: ID!): Usuario
    # Cliente
    obtenerClientes: [Cliente]
    obtenerCliente(id: ID!): Cliente
    # Dictamen
    obtenerDictamenes: [Dictamen]
    obtenerDictamenesUsuario: [Dictamen]
    obtenerDictamen(id: ID!): Dictamen
    # Asignacion
    obtenerAsignaciones: [Asignacion]
    obtenerAsignacionesUsuario: [Asignacion]
    obtenerAsignacion(id: ID!): Asignacion
    # Busqueda
    buscarAsignacion(texto: String!): [Asignacion]
    # Reportes
    mejoresUsuarios: [TopUsuarios]
    totalAsignaciones: [TotalAsignaciones]
  }

  type Mutation {
    # Usuario
    nuevoUsuario(input: UsuarioInput): Usuario
    autenticarUsuario(input: AutenticarInput): Token
    # Cliente
    nuevoCliente(input: ClienteInput): Cliente
    actualizarCliente(id: ID!, input: ClienteInput): Cliente
    eliminarCliente(id: ID!): String
    # Asignacion
    nuevaAsignacion(input: AsignacionInput): Asignacion
    # Dictamen
    nuevoDictamen(input: DictamenInput): Dictamen
  }
`;

module.exports = typeDefs;
