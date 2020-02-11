const express = require('express');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors')

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');
const router = require("./middleware/index");

const app = express();
app.use(cors());
app.use(express.json({ limit: "64mb" }));
app.use(express.urlencoded({ extended: false }));

app.use(isAuth);
app.use("/", router);

app.use('/graphql', graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
}));

mongoose.connect(
    `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD
    }@cluster0-shard-00-00-r0u1z.mongodb.net:27017,cluster0-shard-00-01-r0u1z.mongodb.net:27017,cluster0-shard-00-02-r0u1z.mongodb.net:27017/${
    process.env.MONGO_DB}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`)
    .then(() => {
        app.listen(8000, () => {
            console.log("Server on port 8000 ");
        });
    })
    .catch(err => {
        console.log(err);
    });