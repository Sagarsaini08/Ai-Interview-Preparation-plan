import React, { useEffect,useRef, useState } from 'react'

import { useNavigate } from 'react-router'
import '../style/home.scss';

import {useInterview} from "../hooks/useInterview"
const Home = () => {

    const {loading,generateReport,reports,getReports}=useInterview();
    const [jobDescription,setJobDescription]=useState("");
    const [selfDescription,setSelfDescription]=useState("");
    const navigate=useNavigate();
    const resumeInputRef=useRef(null);
    useEffect(() => {
    getReports();
}, []);

    const handleGenerateReport = async (e) => {
    e.preventDefault();

    try {
        const resumeFile = resumeInputRef.current?.files?.[0];

        if (!resumeFile) {
            alert("Please upload your resume.");
            return;
        }

        const data = await generateReport({
            jobDescription,
            selfDescription,
            resumeFile
        });

        navigate(`/interviews/${data._id}`);

    } catch (error) {
        console.error(
            "Report generation failed:",
            error.response?.data || error.message
        );

        alert(error.response?.data?.message || "Failed to generate report.");
    }
};

    if(loading){
        return (<main className='loading-screen'><h1>Loading your interview plan........</h1></main>)
    }

return (
<main className='home' style={{ background: '#0c0f14', color: '#edf0f7', boxSizing: 'border-box', padding: '48px 24px', flexDirection: 'column', gap: '22px' }}>
            <header style={{ textAlign: 'center', maxWidth: '560px' }}>
                <h1 style={{ fontSize: '26px', lineHeight: 1.2, margin: '0 0 8px', fontWeight: 700 }}>
                    Create Your Custom <span style={{ color: '#e91e78' }}>Interview Plan</span>
                </h1>
                <p style={{ color: '#8e95a3', fontSize: '12px', lineHeight: 1.5, margin: 0 }}>
                    Let our AI analyze the job requirements and your unique profile to<br /> build a winning strategy.
                </p>
            </header>

            <form className="interview-input-group">
                <section className='left'>
                    <label htmlFor='jobDescription' style={{ fontSize: '12px', fontWeight: 600 }}><span style={{ color: '#e91e78', marginRight: '8px' }}>▣</span>Target Job Description <span style={{ float: 'right', color: '#e91e78', background: '#35172a', borderRadius: '4px', padding: '3px 7px', fontSize: '9px' }}>REQUIRED</span></label>
                    <textarea onChange={(e)=>{setJobDescription(e.target.value)}} name="jobDescription" id="jobDescription" maxLength={5000} placeholder={'Paste the full job description here...\ne.g. Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'} style={{ boxSizing: 'border-box', flex: 1, minHeight: '300px', height: 'auto', background: '#202536', border: '1px solid #292f42', color: '#e9ebf2', fontSize: '11px', lineHeight: 1.6 }} />
                </section>

                <section className='right'>
                    <div className='input-group' style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                        <p style={{ fontSize: '12px', fontWeight: 600, margin: '0 0 2px' }}><span style={{ color: '#e91e78', marginRight: '8px' }}>♙</span>Your Profile</p>
                        <label htmlFor="resume" style={{ fontSize: '11px', fontWeight: 600 }}>Upload Resume <small style={{ color: '#e91e78', background: '#35172a', borderRadius: '4px', padding: '3px 7px', marginLeft: '6px', fontSize: '9px' }}>BEST RESULTS</small></label>
                        <label className='file-label' htmlFor="resume" style={{ boxSizing: 'border-box', minHeight: '90px', justifyContent: 'center', flexDirection: 'column', gap: '7px', padding: '14px', border: '1px solid #30364a', background: '#202536', color: '#e9ebf2', textAlign: 'center', fontSize: '11px' }}>
                            <span style={{ color: '#e91e78', fontSize: '20px' }}>♧</span>
                            <span>Click to upload or drag &amp; drop</span>
                            <small style={{ color: '#9299a8', fontSize: '9px' }}>PDF or DOCX (Max 3MB)</small>
                        </label>
                        <input ref={resumeInputRef} hidden type='file' name="resume" id="resume" accept=".pdf" />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#7e8593', fontSize: '9px' }}><span style={{ height: '1px', flex: 1, background: '#292e39' }} />OR<span style={{ height: '1px', flex: 1, background: '#292e39' }} /></div>

                    <div className='input-group' style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label htmlFor='selfDescription' style={{ fontSize: '11px', fontWeight: 600 }}>Quick Self-Description</label>
                        <textarea onChange={(e)=>{setSelfDescription(e.target.value)}} name="selfDescription" id="selfDescription" placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..." style={{ boxSizing: 'border-box', height: '68px', minHeight: '68px', background: '#202536', border: '1px solid #a32b63', color: '#e9ebf2', fontSize: '10px', lineHeight: 1.5 }} />
                    </div>

                    <div style={{ display: 'flex', gap: '9px', alignItems: 'flex-start', padding: '10px 12px', border: '1px solid #2c426e', borderRadius: '7px', background: '#1d2b4a', color: '#aebfdf', fontSize: '10px', lineHeight: 1.5 }}>
                        <span style={{ color: '#58a5ff' }}>●</span><span>Either a Resume or a Self-Description is required to generate a personalized plan.</span>
                    </div>
                </section>
                    {/*Recent Reports list*/}
                    {reports.length>0 && (
                        <section className='recent-reports'>
                            <h2>Recent Reports</h2>
                            <ul>
                                {reports.map((report) => (
                                    <li key={report._id} className='report-item' onclick={() => navigate(`/interviews/${report._id}`)}>
                                        <h3>{report.title}</h3>
                                        <p className='report-date'>Created on {new Date(report.createdAt).toLocaleDateString()}</p>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                <footer>
                    <span style={{ color: '#858c99', fontSize: '10px' }}>AI-Powered Strategy Generation · Approx 30s</span>
                    <button onClick={handleGenerateReport} type="button" className='button primary-button' style={{ border: 0, borderRadius: '7px', padding: '10px 18px', background: '#e00063', color: '#fff', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>★ &nbsp; Generate My Interview Strategy</button>
                </footer>
            </form>
        </main>
  )
}

export default Home