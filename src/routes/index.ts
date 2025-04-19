import { asyncHandler } from "../utils/asyncHandler";
import { Router } from "express";

import ProductController from "../controller/products.controller";
import ContactController from "../controller/contacts.controller";
import AddressController from "../controller/address.controller";
import UserController from "../controller/user.controller";
import OrderController from "../controller/order.controller";
import OrderItemsController from "../controller/order_items.controller";
import { authenticateToken } from "../middlewares/authenticateToken";

const router = Router();
const productController = new ProductController();
const contactController = new ContactController();
const AddressControler = new AddressController()
const userController = new UserController();
const orderController = new OrderController()
const orderItemsController = new OrderItemsController()

// Rotas de autenticação
router.post('/login', asyncHandler(userController.login.bind(userController)));

// Rotas de usuário
router.get('/users', asyncHandler(userController.get.bind(userController)));
router.get('/users/:id', authenticateToken, asyncHandler(userController.getById.bind(userController)));
router.post('/users', asyncHandler(userController.register.bind(userController)))
router.put('/users/:id', authenticateToken, asyncHandler(userController.update.bind(userController)));
router.delete('/users/:id',authenticateToken, asyncHandler(userController.delete.bind(userController)));
router.delete('/users', authenticateToken, asyncHandler(userController.deleteAll.bind(userController)))

// Rotas de produtos
router.get('/products', asyncHandler(productController.get.bind(productController)));
router.get('/products/:id', asyncHandler(productController.getById.bind(productController)));
router.post('/products',authenticateToken, asyncHandler(productController.create.bind(productController)));
router.put('/products/:id',authenticateToken, asyncHandler(productController.update.bind(productController)));
router.delete('/products/:id',authenticateToken, asyncHandler(productController.delete.bind(productController)));
router.delete('/products', authenticateToken, asyncHandler(productController.deleteAll.bind(productController)))

// Rotas de endereço
router.get('/addresses', asyncHandler(AddressControler.getAll.bind(AddressControler)))
router.get("/addresses/:userId",authenticateToken, asyncHandler(AddressControler.getByUserId.bind(AddressControler)));
router.post("/addresses",authenticateToken, asyncHandler(AddressControler.create.bind(AddressControler)));
router.put("/addresses/:userId",authenticateToken, asyncHandler(AddressControler.update.bind(AddressControler)));
router.delete("/addresses/:userId",authenticateToken, asyncHandler(AddressControler.delete.bind(AddressControler))); 
router.delete('/addresses', authenticateToken, asyncHandler(AddressControler.deleteAll.bind(AddressControler)))

// Rotas de pedidos
router.get('/orders',authenticateToken, asyncHandler(orderController.get.bind(orderController)))
router.get('/orders/:id',authenticateToken, asyncHandler(orderController.getOrderById.bind(orderController)))
router.post('/orders',authenticateToken, asyncHandler(orderController.create.bind(orderController)))
router.put('/orders/:id',authenticateToken, asyncHandler(orderController.update.bind(orderController)))
router.delete('/orders/:id',authenticateToken, asyncHandler(orderController.delete.bind(orderController)))
router.delete('/orders', authenticateToken, asyncHandler(orderController.deleteAll.bind(orderController)))

// Rotas de items dos pedidos
router.get('/order_items',authenticateToken, asyncHandler(orderItemsController.get.bind(orderItemsController)))
router.get('/order_items/:id',authenticateToken,asyncHandler(orderItemsController.getById.bind(orderItemsController)))
router.post('/order_items',authenticateToken, asyncHandler(orderItemsController.create.bind(orderItemsController)))
router.put('/order_items/:id',authenticateToken, asyncHandler(orderItemsController.update.bind(orderItemsController)))
router.delete('/order_items/:id', authenticateToken, asyncHandler(orderItemsController.destroy.bind(orderItemsController)))
router.delete('/order_items', authenticateToken, asyncHandler(orderItemsController.deleteAll.bind(orderItemsController)))

// Rotas de contatos
router.get('/contacts', asyncHandler(contactController.get.bind(contactController)));
router.get('/contacts/:id',authenticateToken, asyncHandler(contactController.getById.bind(contactController)));
router.post('/contacts',authenticateToken, asyncHandler(contactController.post.bind(contactController)));
router.put('/contacts/:id',authenticateToken, asyncHandler(contactController.update.bind(contactController)));
router.delete('/contacts/:id',authenticateToken, asyncHandler(contactController.delete.bind(contactController)));
router.delete('/constacts', authenticateToken, asyncHandler(contactController.deleteAll.bind(contactController)))

export default router;
