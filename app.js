import 'dotenv/config';
import mongoose from 'mongoose';
import express from "express";
import morgan from 'morgan';

const app = express();

const DB_URL = process.env.NODE_ENV === 'test'
    ? 'mongodb://localhost:27017/proyectoapi-db-test'
    : process.env.DB_URL || 'mongodb://localhost:27017/proyectoapi-db';

mongoose.connect(DB_URL)
    .then(() => console.log(`Connected to DB: ${DB_URL}`))
    .catch(err => console.error("Failed to connectto MongoDB", err));


app.use(morgan("dev")); // biblioteca para ver mas info por la terminal
app.use(express.json());

app.get("/", (req,res) => {
    res.status(200).send("hello Rafa");
});

export default app; //asi mpermite importar esta pagina en otro sitio