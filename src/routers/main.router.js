const { Router } = require("express");
const getCustomersList = require("../components/demo.component");
const { getProductList, addProduct, updateProduct, deleteProduct, getSingleProduct } = require("../components/product.component");
const { getUserList, addUser, updateUser, deleteUser } = require("../components/user.component");
const { getAllCategory, getSingleCategory } = require("../components/categories.component");
const { addCart } = require("../components/cart.component");
const router = Router();

const { CreateAccount, LoginAccount } = require("./../components/customer.component");
const verifyToken = require("../middleware/token.middleware");

// signUp api
router.post("/api/CreateAccount", CreateAccount);
router.post("/api/LoginAccount", LoginAccount);

// customer list
router.get("/customers/list", getCustomersList);

// product list
router.get("/products", verifyToken, getProductList);
router.post("/addProduct", addProduct);
router.post("/updateProduct", updateProduct);
router.post("/deleteProduct/:id", deleteProduct);
router.get("/api/getSingleProduct/:id", getSingleProduct);

// category api
router.get("/api/getAllCategory", getAllCategory);
router.post("/api/getSingleCategory/:id", getSingleCategory);

// user api
router.get("/user", getUserList);
router.post("/addUser", addUser);
router.post("/updateUser", updateUser);
router.post("/deleteUser/:id", deleteUser);

// cart api
router.post("/api/addCart", addCart);

// end routing...
router.all("/*", (req, res) => {
  return res.status(404).send({
    error: true,
    message: `This api you try to access is unavalable.`,
    response: null,
  });
});

module.exports = router;
