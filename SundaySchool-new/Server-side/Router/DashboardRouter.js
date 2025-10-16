
const express=require("express")
const DashboardRoutes=express.Router()
const { Reports } = require("../Controler/DasboardControler");


// Routes
DashboardRoutes.get("/reports", Reports);


module.exports = DashboardRoutes;
