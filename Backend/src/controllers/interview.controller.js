
const pdfParse=require("pdf-parse")
const generateInterviewReport=require("../services/ai.service")
const interviewReportModel=require("../models/interviewReport.model")


async function generateInterViewReportController(req,res){
     if (!req.file) {
        return res.status(400).json({
            message: "Please upload a PDF file."
        });
    }
const resumeContent=await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
const {selfDescription,jobDescription}=req.body

const interViewReportByAi=await generateInterviewReport({
    resume:resumeContent.text,
    selfDescription,
    jobDescription
})

const interviewReport=await interviewReportModel.create({
    user:req.user.id,
    resume:resumeContent.text,
    selfDescription,
    jobDescription,
    ...interViewReportByAi

})
res.status(201).json({
    message:"interview report generated successfully ",
    interviewReport
})
}

async function getInterviewReportController(req,res){
    const {interviewId}=req.params
    const interviewReport=await interviewReportModel.findOne({_id:interviewId,user:req.user.id})
    if(!interviewReport){
        return res.status(404).json({
            message:"interview report not found"
        })
    }
    res.status(200).json({
        message:"interview report fetched successfully",
        interviewReport
    })
}

async function getAllInterviewReportController(req,res){
    const interviewReports=await interviewReportModel.find({user:req.user.id}).sort({createdAt:-1}).select("-resume -selfDescription -jobDescription -__v -technicalQuestions.answer -behavioralQuestions.answer -skillGaps.severity -preparationPlan.tasks")
    res.status(200).json({
        message:"interview reports fetched successfully",
        interviewReports
    })
}

module.exports={generateInterViewReportController,getInterviewReportController,getAllInterviewReportController}