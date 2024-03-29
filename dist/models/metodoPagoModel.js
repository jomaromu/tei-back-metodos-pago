"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
// crear esquema
const Schema = mongoose_1.default.Schema;
const metodoPagoSchema = new Schema({
    idCreador: { type: Schema.Types.ObjectId, ref: "userWorker" },
    nombre: { type: String, required: [true, 'EL nombre es necesario'] },
    estado: { type: Boolean, default: true },
    foranea: { type: Schema.Types.ObjectId, ref: "userWorker" },
});
// validacion para único elemento
metodoPagoSchema.plugin(mongoose_unique_validator_1.default, { message: '{PATH}, ya existe!!' });
module.exports = mongoose_1.default.model('metodoPago', metodoPagoSchema);
