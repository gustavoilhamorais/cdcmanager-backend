// Express, Router, Function modules //
const express = require("express");
const routes = express.Router();

const CategoryController = require("./controllers/CategoryController");
const CustomerController = require("./controllers/CustomerController");
const MerchandiseController = require("./controllers/MerchandiseController");
const ProviderController = require("./controllers/ProviderController");
const RentalController = require("./controllers/RentalController");
const SaleController = require("./controllers/SaleController");
const DashboardController = require("./controllers/DashboardController");

// Dashboard //
routes.get("/", DashboardController.dashboard);

// Categories //
routes.get("/categories", CategoryController.index);
routes.get("/categories/:id", CategoryController.show);
routes.post("/categories", CategoryController.store);
routes.put("/categories/:id", CategoryController.update);
routes.delete("/categories/:id", CategoryController.destroy);

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

// Rental //
routes.get("/rentals", RentalController.index);
routes.get("/rentals/:id", RentalController.show);
routes.post("/rentals", RentalController.store);
routes.put("/rentals/:id", RentalController.update);
routes.delete("/rentals/:id", RentalController.destroy);

// Sale //
routes.get("/sales", SaleController.index);
routes.get("/sales/:id", SaleController.show);
routes.post("/sales", SaleController.store);
routes.put("/sales/:id", SaleController.update);
routes.delete("/sales/:id", SaleController.destroy);

module.exports = routes;
