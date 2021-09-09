const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const userController = require('../controller/user');
const expenseController = require('../controller/expense');
const groupController = require('../controller/group');


router.get('/',async(req,res) => {
    res.send("<h2> Welcome to Setu App !<h2> <br> <a href=https://github.com/deepakj619/setu-assignment-node-app>Link to Code Repo</a>");
});
// user endpoints.
router.post("/api/v1/user",userController.createUser);
router.get("/api/v1/user/",userController.getUser);
router.put("/api/v1/user/group",userController.addUserToGroup);

//group endpoints.
router.post("/api/v1/group",groupController.createGroup);
router.get("/api/v1/group/",groupController.getGroup);

//expense endpoints.
router.post("/api/v1/expense",expenseController.createExpense);
router.put("/api/v1/expense",expenseController.payBill);
router.get("/api/v1/expense",expenseController.getBill);


module.exports = router;
