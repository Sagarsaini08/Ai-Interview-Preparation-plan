import {getAllInterviewReports,generateInterviewReport,getInterviewReportById} from "../services/interview.api"
import {useContext} from "react"
import {InterviewContext} from "../interview.context.jsx"
export const useInterview = () => {

    const context=useContext(InterviewContext)
    if(!context){
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const {loading,setLoading,report,setReport,reports,setReports}=context

    const generateReport=async({jobDescription,selfDescription,resumeFile})=>{
        setLoading(true)
        try{
            const response=await generateInterviewReport({jobDescription,selfDescription,resumeFile})
            const interviewReport=response.data.interviewReport
            setReport(interviewReport)
            return interviewReport
        } catch (error) {
            console.error("Error generating interview report:", error)
            throw error
        } finally {
            setLoading(false)
        }
}

const getReportById=async(interviewId)=>{
    setLoading(true)
    try{
        const response=await getInterviewReportById(interviewId)
        const interviewReport=response.data.interviewReport
        setReport(interviewReport)
        return interviewReport
    } catch (error) {
        console.error("Error fetching interview report by ID:", error)
        throw error
    } finally {
        setLoading(false)
    }

}
const getReports=async()=>{
    setLoading(true)
    try{
        const response=await getAllInterviewReports()
        const interviewReports=response.data.interviewReports
        setReports(interviewReports)
        return interviewReports
    } catch (error) {
        console.error("Error fetching all interview reports:", error)
        throw error
    }   finally {
        setLoading(false)
    }
}

return {
    loading,
    report,
    reports,
    generateReport,
    getReportById,
    getReports
}
}