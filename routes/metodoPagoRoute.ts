import { Router, Request, Response } from "express";
import { verificaToken } from "../auth/auth";
import { MetodoPagoClass } from "../class/metodoPagoClass";

const metodoPagoRoute = Router();

metodoPagoRoute.post(
  "/crearMetodo",
  [verificaToken],
  (req: Request, resp: Response) => {
    const crearMetodo = new MetodoPagoClass();
    crearMetodo.crearMetodoPago(req, resp);
  }
);

metodoPagoRoute.put(
  "/editarMetodo",
  [verificaToken],
  (req: Request, resp: Response) => {
    const editarMetodo = new MetodoPagoClass();
    editarMetodo.editarMetodoPago(req, resp);
  }
);

metodoPagoRoute.get(
  "/obtenerMetodoID",
  [verificaToken],
  (req: Request, resp: Response) => {
    const obtenerMetodoID = new MetodoPagoClass();
    obtenerMetodoID.obtenerMetodoID(req, resp);
  }
);

metodoPagoRoute.get(
  "/obtenerTododsMetodos",
  [verificaToken],
  (req: Request, resp: Response) => {
    const obtenerTododsMetodos = new MetodoPagoClass();
    obtenerTododsMetodos.obtenerTododsMetodos(req, resp);
  }
);

metodoPagoRoute.delete(
  "/eliminarMetodoID",
  [verificaToken],
  (req: Request, resp: Response) => {
    const eliminarMetodoID = new MetodoPagoClass();
    eliminarMetodoID.eliminarMetodoID(req, resp);
  }
);

export default metodoPagoRoute;
