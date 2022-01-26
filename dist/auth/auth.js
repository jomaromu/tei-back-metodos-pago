"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editarMetodoPago = exports.eliminarUsuario = exports.editarUsuario = exports.crearUsuario = exports.verificaToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SEED = require('../environment/environment');
// Globales
const environment_1 = require("../environment/environment");
// Modelos
const metodoPagoModel_1 = __importDefault(require("../models/metodoPagoModel"));
const verificaToken = (req, resp, next) => {
    const token = req.get('token') || '';
    // Comprobación del token
    jsonwebtoken_1.default.verify(token, environment_1.environmnet.SEED, (err, decoded) => {
        if (err) {
            return resp.json({
                ok: false,
                mensaje: `Token incorrecto`,
                err
            });
        }
        // Insertar en el Request el usuario
        req.usuario = decoded.usuario;
        next();
    });
};
exports.verificaToken = verificaToken;
const crearUsuario = (req, resp, next) => {
    const tokenRole = req.usuario.colaborador_role;
    if (tokenRole === 'SuperRole' || tokenRole === 'AdminRole') {
        next();
    }
    else {
        return resp.json({
            ok: false,
            mensaje: `No está autorizado para realizar esta operación`
        });
    }
};
exports.crearUsuario = crearUsuario;
const editarUsuario = (req, resp, next) => {
    const tokenRole = req.usuario.colaborador_role;
    if (tokenRole === 'SuperRole' || tokenRole === 'AdminRole') {
        next();
    }
    else {
        return resp.json({
            ok: false,
            mensaje: `No está autorizado para realizar esta operación`
        });
    }
};
exports.editarUsuario = editarUsuario;
const eliminarUsuario = (req, resp, next) => {
    const tokenRole = req.usuario.colaborador_role;
    if (tokenRole === 'SuperRole' || tokenRole === 'AdminRole') {
        next();
    }
    else {
        return resp.json({
            ok: false,
            mensaje: `No está autorizado para realizar esta operación`
        });
    }
};
exports.eliminarUsuario = eliminarUsuario;
const editarMetodoPago = (req, resp, next) => {
    const id = req.get('id');
    metodoPagoModel_1.default.findById(id, (err, metodoPagoDB) => {
        if (err) {
            return resp.json({
                ok: false,
                mensaje: `Error interno`,
                err
            });
        }
        if (!metodoPagoDB) {
            return resp.json({
                ok: false,
                mensaje: `No existe el método con ese ID`,
            });
        }
        if (metodoPagoDB.nivel === 0) {
            return resp.json({
                ok: false,
                mensaje: `Este método no es editable`,
            });
        }
        else {
            next();
        }
    });
};
exports.editarMetodoPago = editarMetodoPago;
