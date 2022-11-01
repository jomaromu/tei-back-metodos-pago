"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetodoPagoClass = void 0;
const mongoose = require("mongoose");
const server_1 = __importDefault(require("./server"));
// Modelos
const metodoPagoModel_1 = __importDefault(require("../models/metodoPagoModel"));
class MetodoPagoClass {
    constructor() { }
    crearMetodoPago(req, resp) {
        const idCreador = new mongoose.Types.ObjectId(req.usuario._id);
        const foranea = new mongoose.Types.ObjectId(req.body.foranea);
        const nombre = req.body.nombre;
        const estado = req.body.estado;
        const nuevoMetodoPago = new metodoPagoModel_1.default({
            idCreador,
            foranea,
            nombre,
            estado,
        });
        nuevoMetodoPago.save((err, metodoDB) => {
            if (err) {
                return resp.json({
                    ok: false,
                    mensaje: `Error interno`,
                    err,
                });
            }
            else {
                const server = server_1.default.instance;
                server.io.emit("cargar-metodos", {
                    ok: true,
                });
                return resp.json({
                    ok: true,
                    mensaje: `Método de pago creado`,
                    metodoDB,
                });
            }
        });
    }
    editarMetodoPago(req, resp) {
        const _id = new mongoose.Types.ObjectId(req.body.id);
        const foranea = new mongoose.Types.ObjectId(req.body.foranea);
        const nombre = req.body.nombre;
        const estado = req.body.estado;
        const query = {
            nombre,
            estado,
        };
        metodoPagoModel_1.default.findOne({ _id, foranea }, (err, metodoDB) => {
            if (err) {
                return resp.json({
                    ok: false,
                    mensaje: `Error interno`,
                    err,
                });
            }
            // if (!metodoDB) {
            //   return resp.json({
            //     ok: false,
            //     mensaje: `No se encontró un método de pago con ese ID`,
            //   });
            // }
            if (!query.nombre) {
                query.nombre = metodoDB.nombre;
            }
            metodoPagoModel_1.default.findOneAndUpdate({ _id, foranea }, query, { new: true }, (err, metodoDB) => {
                if (err) {
                    return resp.json({
                        ok: false,
                        mensaje: `Error interno`,
                        err,
                    });
                }
                else {
                    const server = server_1.default.instance;
                    server.io.emit("cargar-metodos", {
                        ok: true,
                    });
                    return resp.json({
                        ok: true,
                        mensaje: "Método actuaizado",
                        metodoDB,
                    });
                }
            });
        });
    }
    obtenerMetodoID(req, resp) {
        const _id = new mongoose.Types.ObjectId(req.get("id"));
        const foranea = new mongoose.Types.ObjectId(req.get("foranea"));
        metodoPagoModel_1.default.findOne({ _id, foranea }, (err, metodoDB) => {
            if (err) {
                return resp.json({
                    ok: false,
                    mensaje: `Error interno`,
                    err,
                });
            }
            if (!metodoDB) {
                return resp.json({
                    ok: false,
                    mensaje: `No se encontró un método de pago con ese ID`,
                });
            }
            return resp.json({
                ok: true,
                metodoDB,
            });
        });
    }
    obtenerTododsMetodos(req, resp) {
        const foranea = mongoose.Types.ObjectId(req.get("foranea"));
        metodoPagoModel_1.default
            .find({ foranea })
            .populate("idCreador")
            .exec((err, metodosDB) => {
            if (err) {
                return resp.json({
                    ok: false,
                    mensaje: `Error interno`,
                    err,
                });
            }
            return resp.json({
                ok: true,
                metodosDB,
            });
        });
    }
    eliminarMetodoID(req, resp) {
        const _id = new mongoose.Types.ObjectId(req.get("id"));
        const foranea = new mongoose.Types.ObjectId(req.get("foranea"));
        metodoPagoModel_1.default.findOneAndDelete({ _id, foranea }, {}, (err, metodoDB) => {
            if (err) {
                return resp.json({
                    ok: false,
                    mensaje: `Error interno`,
                    err,
                });
            }
            else {
                const server = server_1.default.instance;
                server.io.emit("cargar-metodos", {
                    ok: true,
                });
                return resp.json({
                    ok: true,
                    mensaje: "Método eliminado",
                    metodoDB,
                });
            }
        });
    }
}
exports.MetodoPagoClass = MetodoPagoClass;
