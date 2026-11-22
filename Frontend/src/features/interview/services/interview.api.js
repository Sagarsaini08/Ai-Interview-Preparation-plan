
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
});

export const generateInterviewReport = async ({
    jobDescription,
    selfDescription,
    resumeFile
}) => {
    const formData = new FormData();

    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    formData.append("resume", resumeFile);

    const response = await api.post(
        "/api/interview",
        formData
    );

    return response;
};

export const getInterviewReportById = async (interviewId) => {
    const response = await api.get(
        `/api/interview/report/${interviewId}`
    );

    return response;
};

export const getAllInterviewReports = async () => {
    const response = await api.get(
        "/api/interview/report"
    );

    return response;
};
