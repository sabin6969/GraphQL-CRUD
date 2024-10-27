import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import User from ".//models/user.model.js";
import connectDb from ".//db/index.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });


const app = express();

const apolloServer = new ApolloServer(
    {
        typeDefs: `
            type User{
                _id:ID,
                name:String,
                age:Int,
                hasMacbook:Boolean
            }
            type Query{
                getAllUsers:[User],
                getUserById(id:ID):User,
            }
            type Mutation{
                createUser(
                    name:String,
                    age:Int,
                    hasMacbook:Boolean
                ):Boolean,
                updateUser(
                    id:ID!,
                    name:String,
                    age:Int,
                    hasMacbook:Boolean
                ):Boolean
                deleteUser(
                    id:ID!,
                ):Boolean

            }
        `,
        resolvers: {
            Query: {
                getAllUsers: async () => {
                    const users = await User.find();
                    return users;
                },
                getUserById: async (_, { id }) => {
                    const user = await User.findById(id);
                    return user;
                }
            },
            Mutation: {
                createUser: async (_, { name, age, hasMacbook }) => {
                    const user = await User.create({ name, age, hasMacbook });
                    return user ? true : false;
                },
                updateUser: async (_, { id, name, age, hasMacbook }) => {
                    const user = await User.findByIdAndUpdate(id, { $set: { name, age, hasMacbook } }, { new: true });
                    return user ? true : false;
                },
                deleteUser: async (_, { id }) => {
                    const user = await User.findByIdAndDelete(id, { returnDocument: true });
                    return user ? true : false;
                }
            }
        }
    }
);


async function startServer() {
    app.use(express.json());
    await apolloServer.start();
    app.use("/graphql", expressMiddleware(apolloServer));
    app.listen(4000, () => {
        console.log("App is up and running at Port Number 4000");
    })
}


connectDb().then((value) => {
    startServer();
}).catch(error => {
    process.exit(1);
})