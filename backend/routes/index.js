const express = require("express");
const controller = require("../controllers/index.js")
const middleware = require("../middleware/index.js")
const router = express.Router();

router.post('/signup',controller.signup);
router.post('/login',controller.login);
router.post('/post',middleware.verifyToken,controller.postArticle);
router.get('/post',controller.getAllPost);
router.get('/post/:authorId',controller.getById);

module.exports=router;