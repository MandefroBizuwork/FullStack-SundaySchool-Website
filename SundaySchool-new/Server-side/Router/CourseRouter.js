const express=require("express")
const courseRouter=express.Router()
const {postCourse,fetchCategory,findCategory}=require("../Controler/CourseControler")

courseRouter.post("/postCourse",postCourse)
courseRouter.get("/categories",fetchCategory)
courseRouter.get("/coursedetail/:catid",findCategory)

module.exports =courseRouter

