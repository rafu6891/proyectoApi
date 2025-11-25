import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {v4 as uuidv4} from 'uuid';

//creacion de base de datos en mongodb
const userSchema = new mongoose.Schema({
    id: {type: String, default: uuidv4, required: true, unique: true},
    name : {type: String, required: true},
    email : {type: String, required: true, unique: true, lowercase: true, trim: true},
    password: {type: String, required: true, minlength: 8},
    role: {type: String, enum: ["user", "admin"], default: "user"},
},
    {   // transformando en fichero json para que no salgan segun que datos
        toJSON: {
            transform: function(doc, ret) {
                delete ret.__v;
                delete ret.__id;
                delete ret.password;
            },
            virtuals: true
        },
    }
);
//funcion de callback
userSchema.pre ("save", async function (next) {
    if (!this.isModified("password")) return next();

    //algoritmo tipico de encriptaciion
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
}); 

userSchema.index({id :1, email: 1});

const user = mongoose.model("user", userSchema);

export default user;