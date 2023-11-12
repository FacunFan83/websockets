import { Router } from "express";
import { pm } from "../main.js";
export const webRouter = Router()

webRouter.get('/', (req, res) => {
    res.render('main', { titulo: 'Lista de Productos'})
})

webRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { titulo: 'Productos en Tiempo Real'})
})

webRouter.get('/api/productos', (req, res) => {
    res.json(pm.getAll())
})