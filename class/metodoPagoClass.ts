import { Request, Response } from "express";
import { CallbackError } from "mongoose";
const mongoose = require("mongoose");
import Server from "./server";

// Intefaces
import { MetodoPagoInterface } from "../interfaces/metodoPago";

// Modelos
import metodoPagoModel from "../models/metodoPagoModel";

export class MetodoPagoClass {
  constructor() {}

  crearMetodoPago(req: any, resp: Response): void {
    const idCreador = new mongoose.Types.ObjectId(req.usuario._id);
    const nombre: string = req.body.nombre;
    const estado: boolean = req.body.estado;

    const nuevoMetodoPago = new metodoPagoModel({
      idCreador,
      nombre,
      estado,
    });

    nuevoMetodoPago.save(
      (err: CallbackError, metodoDB: MetodoPagoInterface) => {
        if (err) {
          return resp.json({
            ok: false,
            mensaje: `Error interno`,
            err,
          });
        } else {
          const server = Server.instance;
          server.io.emit("cargar-metodos", {
            ok: true,
          });
          return resp.json({
            ok: true,
            mensaje: `Método de pago creado`,
            metodoDB,
          });
        }
      }
    );
  }

  editarMetodoPago(req: any, resp: Response): void {
    const id = new mongoose.Types.ObjectId(req.get("id"));
    const nombre: string = req.body.nombre;
    const estado: boolean = req.body.estado;

    const query = {
      nombre,
      estado,
    };

    metodoPagoModel.findById(
      id,
      (err: CallbackError, metodoDB: MetodoPagoInterface) => {
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

        if (!query.nombre) {
          query.nombre = metodoDB.nombre;
        }

        metodoPagoModel.findByIdAndUpdate(
          id,
          query,
          { new: true },
          (err: CallbackError, metodoDB: any) => {
            if (err) {
              return resp.json({
                ok: false,
                mensaje: `Error interno`,
                err,
              });
            } else {
              const server = Server.instance;
              server.io.emit("cargar-metodos", {
                ok: true,
              });
              return resp.json({
                ok: true,
                mensaje: "Método actuaizado",
                metodoDB,
              });
            }
          }
        );
      }
    );
  }

  obtenerMetodoID(req: any, resp: Response) {
    const id = req.get("id");

    metodoPagoModel.findById(
      id,
      (err: CallbackError, metodoDB: MetodoPagoInterface) => {
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
      }
    );
  }

  obtenerTododsMetodos(req: any, resp: Response) {
    metodoPagoModel
      .find({})
      .populate("idCreador")
      .exec((err: CallbackError, metodosDB: Array<MetodoPagoInterface>) => {
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

  eliminarMetodoID(req: any, resp: Response) {
    const id = req.get("id");

    metodoPagoModel.findByIdAndDelete(
      id,
      {},
      (err: CallbackError, metodoDB: any) => {
        if (err) {
          return resp.json({
            ok: false,
            mensaje: `Error interno`,
            err,
          });
        } else {
          const server = Server.instance;
          server.io.emit("cargar-metodos", {
            ok: true,
          });
          return resp.json({
            ok: true,
            mensaje: "Método eliminado",
            metodoDB,
          });
        }
      }
    );
  }
}
