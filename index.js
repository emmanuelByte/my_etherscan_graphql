// Importing required modules and functions.
const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");
const EtherDataSource = require("./datasource/ethDatasource");

// Importing GraphQL schema from a file.
const typeDefs = importSchema("./schema.graphql");

// Loading environment variables from a .env file.
require("dotenv").config();

// Defining the resolvers for the GraphQL queries.
const resolvers = {
  Query: {
    // Resolver to get the Ether balance by address.
    etherBalanceByAddress: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.etherBalanceByAddress(),

    // Resolver to get the total supply of Ether.
    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    // Resolver to get the latest Ethereum price.
    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    // Resolver to get the block confirmation time.
    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Creating an instance of ApolloServer with type definitions, resolvers, and data sources.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(),
  }),
});

// Setting the server timeout to infinity.
server.timeout = 0;

// Starting the server and listening on port 9000.
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
