import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

// Interface
import { MetodoPagoInterface } from '../interfaces/metodoPago';

// crear esquema
const Schema = mongoose.Schema;

const metodoPagoSchema = new Schema({

    idCreador: { type: Schema.Types.ObjectId, ref: "userWorker" },
    nombre: { type: String, required: [true, 'EL nombre es necesario'], unique: true },
    estado: { type: Boolean, default: true }
});

// validacion para único elemento
metodoPagoSchema.plugin(uniqueValidator, { message: '{PATH}, ya existe!!' });

export = mongoose.model<MetodoPagoInterface>('metodoPago', metodoPagoSchema);