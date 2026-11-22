const  {GoogleGenAI} = require( '@google/genai');
const  {z} = require( "zod")
const {zodToJsonSchema}= require("zod-to-json-schema")


const ai= new GoogleGenAI({
    apiKey:process.env.GOOGLE_GENAI_API_KEY
})

// async function invokeGeminiAi(){
//     const response= await ai.models.generateContent({
//         model:"gemini-3.5-flash-lite",
//         contents:"Hello gemini! Explain what is Interview ?"
//     })
//     console.log(response.text)
// }

const interviewReportSchema=z.object({
    matchScore:z.number().describe("A score between 0 to 100 indicating how well the candidate's profile matches the job description"),


    technicalQuestions:z.array(z.object({
        question:z.string().describe("The technical question can be asked in the interview"),
        intention:z.string().describe("The intention of interviewer behind asking this question"),
        answer:z.string().describe("How to answer this question,what points to cover, what approach to take etc")
    })).describe("technical questons that can be asked in the interview along with their intention and how to answer them "),
    
    
    behavioralQuestions:z.array(z.object({
      question:z.string().describe("The technical question can be asked in the interview"),
        intention:z.string().describe("The intention of interviewer behind asking this question"),
        answer:z.string().describe("How to answer this question,what points to cover, what approach to take etc")
     
    })).describe("Behavioral questons that can be asked in the interview along with their intention and how to answer them "),
    
    
    skillGaps:z.array(z.object({
        skill:z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low","medium","high"]).describe("The severity of this skill gap, i.e.")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    
    preparationPlan:z.array(z.object({
    day:z.number().describe("The day number in the preparation plan, starting from 1"),
    focus:z.string().describe("The main focus of this day in the preparation plan ,e.g. data structures, system design,mock interviews"),
    tasks:z.array(z.string()).describe("List of task to be done on this day to follow the preparation plan,e.g. read a specific book on")
    })).describe("A day- wise preparation plan for the candidate to follow in order to prepare for the the interview effectively"),
    
    title:z.string().describe("A title for the interview report, summarizing the overall assessment of the candidate's profile and preparation plan")

})


const reportJsonSchema = {
    type: "object",
    properties: {
        title: {
            type: "string",
            description: "Interview preparation report title"
        },
        matchScore: {
            type: "number",
            minimum: 0,
            maximum: 100
        },
        technicalQuestions: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    question: { type: "string" },
                    intention: { type: "string" },
                    answer: { type: "string" }
                },
                required: ["question", "intention", "answer"],
                additionalProperties: false
            }
        },
        behavioralQuestions: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    question: { type: "string" },
                    intention: { type: "string" },
                    answer: { type: "string" }
                },
                required: ["question", "intention", "answer"],
                additionalProperties: false
            }
        },
        skillGaps: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    skill: { type: "string" },
                    severity: {
                        type: "string",
                        enum: ["low", "medium", "high"]
                    }
                },
                required: ["skill", "severity"],
                additionalProperties: false
            }
        },
        preparationPlan: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    day: { type: "number" },
                    focus: { type: "string" },
                    tasks: {
                        type: "array",
                        items: { type: "string" }
                    }
                },
                required: ["day", "focus", "tasks"],
                additionalProperties: false
            }
        }
    },
    required: [
        "title",
        "matchScore",
        "technicalQuestions",
        "behavioralQuestions",
        "skillGaps",
        "preparationPlan"
    ],
    additionalProperties: false
};


async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription
}) {

    const prompt = `
    You are an expert technical interview preparation assistant.

    Analyze the candidate's resume and job description.

    Generate:
    1. A meaningful report title.
    2. Match score between 0 and 100.
    3. Technical interview questions with intentions and answers.
    4. Behavioral questions with intentions and answers.
    5. Skill gaps with severity.
    6. A 7-day preparation plan.

    Resume: ${resume}

    Self Description: ${selfDescription}

    Job Description: ${jobDescription}

    Follow the supplied JSON schema exactly.
    Do not use snake_case.
    Do not return strings where objects are required.
    `;

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: reportJsonSchema
        }
    });

    const parsedResponse = JSON.parse(response.text);
   
    // Validate before returning
    const validatedResponse =
        interviewReportSchema.parse(parsedResponse);

    return validatedResponse;
}

module.exports=generateInterviewReport