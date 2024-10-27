import mongoose from "mongoose";
async function connectDb() {
    try {
        await mongoose.connect(`${process.env.MONGODB_CONNECTION_URL}/practice`);
        console.log("Connected to mongodb application");
    } catch (error) {
        console.log("Couldnot connect to mongodb");
        process.exit(0);
    }
}


export default connectDb;