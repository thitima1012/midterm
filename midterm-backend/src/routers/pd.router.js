const express = require("express");
const router = express.Router();
const productController = require("../controllers/pd.controller");
const { authJwt } = require("../middleware");

//create a product
//POST http://localhost:5000/api/v1/restaurants
router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdminOrMod],
  productController.create
);

//Get All restaurants
router.get("/", productController.getAll);

//Get restaurant by Id
router.get("/:id", [authJwt.verifyToken], productController.getById);

//update a retaurant
router.put(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdminOrMod],
  productController.update
);

//delete a restaurant
router.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  productController.delete
);

module.exports = router;