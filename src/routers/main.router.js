const { Router } = require("express");
const getCustomersList = require("../components/demo.component");
const { getProductList, addProduct, updateProduct, deleteProduct, getSingleProduct } = require("../components/product.component");
const { getUserList, addUser, updateUser, deleteUser } = require("../components/user.component");
const { getAllCategory, getSingleCategory } = require("../components/categories.component");
const { addCart, getCartList } = require("../components/cart.component");
const router = Router();

const { CreateAccount, LoginAccount } = require("./../components/customer.component");
const verifyToken = require("../middleware/token.middleware");
const { uploadFile, streamFile, deleteFile } = require("../components/upload.component");
const sendMailF = require("../components/sendMail.component");

// signUp api
router.post("/api/CreateAccount", CreateAccount);
router.post("/api/LoginAccount", LoginAccount);

// customer list
router.get("/customers/list", getCustomersList);

// product list
router.get("/api/products", verifyToken, getProductList);
router.post("/api/addProduct", verifyToken, addProduct);
router.post("/api/updateProduct", verifyToken, updateProduct);
router.post("/api/deleteProduct/:id", verifyToken, deleteProduct);
router.get("/api/api/getSingleProduct/:id", verifyToken, getSingleProduct);

// category api
router.get("/api/getAllCategory", verifyToken, getAllCategory);
router.post("/api/getSingleCategory/:id", verifyToken, getSingleCategory);

// user api
router.get("/api/user", verifyToken, getUserList);
router.post("/api/addUser", verifyToken, addUser);
router.post("/api/updateUser", verifyToken, updateUser);
router.post("/api/deleteUser/:id", verifyToken, deleteUser);

// cart api
router.get("/api/getCartsList", verifyToken, getCartList)
router.post("/api/addCart", verifyToken, addCart);

// upload file api's
router.post('/api/uploads', uploadFile);
router.get('/api/stream/:id', streamFile);
router.post('/api/deleteFile/:id', deleteFile);

// send mail api's
router.post('/api/sendEmail', sendMailF);

// end routing...
router.all("/*", (req, res) => {
  return res.status(404).send({
    error: true,
    message: `This api you try to access is unavalable.`,
    response: null,
  });
});

module.exports = router;
