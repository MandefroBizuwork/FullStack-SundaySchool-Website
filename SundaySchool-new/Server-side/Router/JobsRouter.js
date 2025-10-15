const express=require("express")
const jobsRouter=express.Router()
const {GetAllJobs,PostJob,UpdateJob,DeleteJob}=require("../Controler/JobsControler")
jobsRouter.get("/",GetAllJobs)
jobsRouter.post("/PostJob",PostJob)
jobsRouter.put("/UpdateJob/:jobID",UpdateJob)
jobsRouter.delete("/DeleteJob/:jobID",DeleteJob)
module.exports =jobsRouter

