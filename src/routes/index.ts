import { asyncHandler } from "../utils/asyncHandler";
import { Router } from "express";

import ProductController from "../controller/products.controller";
import ContactController from "../controller/contacts.controller";
import AddressController from "../controller/address.controller";
import UserController from "../controller/user.controller";

const router = Router();
const productController = new ProductController();
const contactController = new ContactController();
const AddressControler = new AddressController()
const userController = new UserController();

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

// Rotas de endereço
router.get('/addresses', asyncHandler(AddressControler.getAll.bind(AddressControler)))
router.post("/addresses", asyncHandler(AddressControler.create.bind(AddressControler)));
router.get("/addresses/:userId", asyncHandler(AddressControler.getByUserId.bind(AddressControler)));
router.put("/addresses/:userId", asyncHandler(AddressControler.update.bind(AddressControler)));
router.delete("/addresses/:userId", asyncHandler(AddressControler.delete.bind(AddressControler))); 

// Rotas de contatos
router.get('/contacts', asyncHandler(contactController.get.bind(contactController)));
router.get('/contacts/:id', asyncHandler(contactController.getById.bind(contactController)));
router.post('/contacts', asyncHandler(contactController.post.bind(contactController)));
router.put('/contacts/:id', asyncHandler(contactController.update.bind(contactController)));
router.delete('/contacts/:id', asyncHandler(contactController.delete.bind(contactController)));

export default router;
