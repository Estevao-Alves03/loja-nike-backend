import { Router } from "express";
import ProductController from "../controller/products.controller";
import PurchaseController from "../controller/purchase.controller";
import UserController from "../controller/user.controller";

const router = Router()
const userController = new UserController()
const productController = new ProductController()
const purchaseController = new PurchaseController()


// rotas de usuario
router.get('/users', userController.get.bind(userController))
router.get('/users/:id', userController.getById.bind(userController))
router.post('/users', userController.create.bind(userController))
router.put('/users/:id', userController.update.bind(userController))
router.delete('/users/:id', userController.delete.bind(userController))
// rotas de produtos
router.get('/products', productController.get.bind(productController))
router.get('/products/:id', productController.getById.bind(productController))
router.post('/products', productController.create.bind(productController))
router.put('/products/:id', productController.update.bind(productController))
router.delete('/products/:id', productController.delete.bind(productController))
// rotas de compras
router.get('/purchases', purchaseController.get.bind(purchaseController))
router.get('/purchases/:id', purchaseController.getById.bind(purchaseController))
router.put('/purchases/:id', purchaseController.update.bind(purchaseController))
router.delete('/purchases/:id', purchaseController.delete.bind(purchaseController))


export default router