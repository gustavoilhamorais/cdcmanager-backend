// Express, Router, Function modules //
const express = require("express");
const routes = express.Router();

// const DashboardController = require("./controllers/DashboardController");
const CustomerController = require("./controllers/CustomerController");
const MerchandiseController = require("./controllers/MerchandiseController");
const ProviderController = require("./controllers/ProviderController");
const SaleController = require("./controllers/SaleController");
const SalesmanController = require("./controllers/SalesmanController");
const ShoppingController = require("./controllers/ShoppingController");

// Dashboard //
// routes.get("/", DashboardController.dashboard);

// Customer //
routes.get("/customers", CustomerController.index);
routes.get("/customers/:id", CustomerController.show);
routes.post("/customers", CustomerController.store);
routes.put("/customers/:id", CustomerController.update);
routes.delete("/customers/:id", CustomerController.destroy);

// Merchandise //
routes.get("/merchandise", MerchandiseController.index);
routes.get("/merchandise/:id", MerchandiseController.show);
routes.post("/merchandise", MerchandiseController.store);
routes.put("/merchandise/:id", MerchandiseController.update);
routes.delete("/merchandise/:id", MerchandiseController.destroy);

// Provider //
routes.get("/providers", ProviderController.index);
routes.get("/providers/:id", ProviderController.show);
routes.post("/providers", ProviderController.store);
routes.put("/providers/:id", ProviderController.update);
routes.delete("/providers/:id", ProviderController.destroy);
routes.post("/providers/delete", ProviderController.destroyMultiple);

// Sale //
routes.get("/sales", SaleController.index);
routes.get("/sales/:id", SaleController.show);
routes.post("/sales", SaleController.store);
routes.put("/sales/:id", SaleController.update);
routes.delete("/sales/:id", SaleController.destroy);

// Salesman //
routes.get("/salesman", SalesmanController.index);
routes.get("/salesman/:id", SalesmanController.show);
routes.post("/salesman", SalesmanController.store);
routes.put("/salesman/:id", SalesmanController.update);
routes.delete("/salesman/:id", SalesmanController.destroy);

// Shopping //
routes.get("/shopping", ShoppingController.index);
routes.get("/shopping/:id", ShoppingController.show);
routes.post("/shopping", ShoppingController.store);
routes.put("/shopping/:id", ShoppingController.update);
routes.delete("/shopping/:id", ShoppingController.destroy);

module.exports = routes;
