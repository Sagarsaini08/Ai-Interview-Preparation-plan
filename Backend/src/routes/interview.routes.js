const express = require("express")
const authMiddleware=require('../middleware/auth.middleware')
const interviewRouter = express.Router();
const interviewController=require("../controllers/interview.controller")
const upload=require("../middleware/file.middleware")




interviewRouter.post('/',authMiddleware.authUser,upload.single("resume"),interviewController.generateInterViewReportController)


interviewRouter.get('/report/:interviewId',authMiddleware.authUser,interviewController.getInterviewReportController)  

interviewRouter.get('/report',authMiddleware.authUser,interviewController.getAllInterviewReportController)
module.exports=interviewRouter