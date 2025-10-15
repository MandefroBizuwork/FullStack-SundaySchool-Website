const express=require("express")
const articleRouter=express.Router()
const {postCourse,fetchCategory,findCategory}=require("../Controler/CourseControler")

articleRouter.post("/postCourse",postCourse)
articleRouter.get("/categories",fetchCategory)
articleRouter.get("/coursedetail/:catid",findCategory)

module.exports =articleRouter

