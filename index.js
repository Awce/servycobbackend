const { ApolloServer } = require("apollo-server");
const typeDefs = require("./db/schema");
const resolvers = require("./db/resolver");
const conectarDB = require("./config/db");

// conectar a la base de datos
conectarDB();

//servidor
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    const miContext = "Hola";
    return { miContext };
  },
});

//arrancar el servidor
server.listen().then(({ url }) => {
  console.log(`Servidor listo en la URL ${url}`);
});
