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
    monto: Int
    fechapago: String
    comentarios: String
    gestor: ID
    asignacion: ID
    creado: String
  }

  type Asignacion {
    id: ID
    tipocartera: String
    numdama: String
    digitodama: String
    nombre: String
    numerozonafacturacion: Int
    aniocampaniasaldo: Int
    diasmora: String
    campanasvencidas: Int
    saldofactura: Float
    saldocobro: Float
    cargosmoratorios: Float
    totalacobrar: Float
    telefonocasa: String
    telefonocelular: String
    direccion: String
    colonia: String
    referencia: String
    poblacion: String
    estado: String
    codigopostal: String
    fechafacturacion: String
    fechafinalvigencia: String
    tipocuenta: String
    gestor: ID
    creado: String
  }

  type TotalAsignaciones {
    total: Int
    gestor: [Usuario]
  }

  type TotalGestiones {
    total: Int
    gestor: [Usuario]
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

  input AsignacionInput {
    tipocartera: String
    numdama: String
    digitodama: String
    nombre: String
    numerozonafacturacion: Int
    aniocampaniasaldo: Int
    diasmora: String
    campanasvencidas: Int
    saldofactura: Float
    saldocobro: Float
    cargosmoratorios: Float
    totalacobrar: Float
    telefonocasa: String
    telefonocelular: String
    direccion: String
    colonia: String
    referencia: String
    poblacion: String
    estado: String
    codigopostal: String
    fechafacturacion: String
    fechafinalvigencia: String
    tipocuenta: String
  }

  input DictamenInput {
    numdama: String!
    digitodama: String!
    dictamen: String!
    subdictamen: String!
    razon: String!
    folio: String
    monto: Float
    fechapago: String
    comentarios: String!
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
    #obtenerDictamenDama(id: ID): [Dictamen]
    obtenerDictamen(id: ID!): Dictamen
    # Asignacion
    obtenerAsignaciones: [Asignacion]
    obtenerAsignacionesUsuario: [Asignacion]
    obtenerAsignacion(id: ID!): Asignacion
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
