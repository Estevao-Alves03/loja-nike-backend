import { Router } from "express";
import ProductController from "../controller/products.controller";
import UserController from "../controller/user.controller";
import ContactController from "../controller/contacts.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();
const userController = new UserController();
const productController = new ProductController();
const contactController = new ContactController();

// Rotas de autenticação
router.post('/login', asyncHandler(userController.login.bind(userController)));

// Rotas de usuário
router.get('/users', asyncHandler(userController.get.bind(userController)));
router.get('/users/:id', asyncHandler(userController.getById.bind(userController)));
router.post('/users', asyncHandler(userController.register.bind(userController)))
router.put('/users/:id', asyncHandler(userController.update.bind(userController)));
router.delete('/users/:id', asyncHandler(userController.delete.bind(userController)));

// Rotas de produtos
router.get('/products', asyncHandler(productController.get.bind(productController)));
router.get('/products/:id', asyncHandler(productController.getById.bind(productController)));
router.post('/products', asyncHandler(productController.create.bind(productController)));
router.put('/products/:id', asyncHandler(productController.update.bind(productController)));
router.delete('/products/:id', asyncHandler(productController.delete.bind(productController)));

// Rotas de compras 

// Rotas de contatos
router.get('/contacts', asyncHandler(contactController.get.bind(contactController)));
router.get('/contacts/:id', asyncHandler(contactController.getById.bind(contactController)));
router.post('/contacts', asyncHandler(contactController.post.bind(contactController)));
router.put('/contacts/:id', asyncHandler(contactController.update.bind(contactController)));
router.delete('/contacts/:id', asyncHandler(contactController.delete.bind(contactController)));

export default router;
