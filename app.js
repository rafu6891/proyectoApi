import 'dotenv/config';
import express from "express";
import morgan from 'morgan';

const app = express();

app.use(morgan("dev")); // biblioteca para ver mas info por la terminal
app.use(express.json());

app.get("/", (req,res) => {
    res.status(200).send("hello Rafa");
});

export default app; //asi mpermite importar esta pagina en otro sitio