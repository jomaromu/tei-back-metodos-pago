import { NextFunction, Request, Response } from 'express';
import { CallbackError } from 'mongoose';
import jwt from 'jsonwebtoken';
const SEED = require('../environment/environment');

// Globales
import { environmnet } from '../environment/environment';

// Modelos
import metodoPagoModel from '../models/metodoPagoModel';

// Interfaces
import { MetodoPagoInterface } from '../interfaces/metodoPago';

const verificaToken = (req: any, resp: Response, next: NextFunction) => {

    const token = req.get('token') || '';

    // Comprobación del token
    jwt.verify(token, environmnet.SEED, (err: any, decoded: any) => {

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
}

const crearUsuario = (req: any, resp: Response, next: NextFunction) => {

    const tokenRole = req.usuario.colaborador_role;

    if (tokenRole === 'SuperRole' || tokenRole === 'AdminRole') {
        next();
    } else {
        return resp.json({
            ok: false,
            mensaje: `No está autorizado para realizar esta operación`
        });
    }
}

const editarUsuario = (req: any, resp: Response, next: NextFunction) => {

    const tokenRole = req.usuario.colaborador_role;

    if (tokenRole === 'SuperRole' || tokenRole === 'AdminRole') {
        next();
    } else {
        return resp.json({
            ok: false,
            mensaje: `No está autorizado para realizar esta operación`
        });
    }
}

const eliminarUsuario = (req: any, resp: Response, next: NextFunction) => {

    const tokenRole = req.usuario.colaborador_role;

    if (tokenRole === 'SuperRole' || tokenRole === 'AdminRole') {
        next();
    } else {
        return resp.json({
            ok: false,
            mensaje: `No está autorizado para realizar esta operación`
        });
    }
}

const editarMetodoPago = (req: any, resp: Response, next: NextFunction) => {

    const id = req.get('id');

    metodoPagoModel.findById(id, (err: CallbackError, metodoPagoDB: MetodoPagoInterface) => {

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

        } else {
            next();
        }
    });

}

export {
    verificaToken,
    crearUsuario,
    editarUsuario,
    eliminarUsuario,
    editarMetodoPago
}