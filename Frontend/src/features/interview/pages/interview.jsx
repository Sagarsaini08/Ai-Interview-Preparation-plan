
import { useState, useEffect} from 'react';
import { useNavigate,useParams } from 'react-router';
import { useInterview } from '../hooks/useInterview.js';
import '../style/interview.scss';

const sections = [
  'Technical questions',
  'Behavioral questions',
  'Road Map',
];

const Interview = () => {
  const [activeSection, setActiveSection] = useState(sections[0]);
  const { report, loading ,getReportById} = useInterview();
  const {interviewId} = useParams();

useEffect(() => {
  if (interviewId) {
    getReportById(interviewId);
  }
}, [interviewId]);

  if (loading) {
    return (
      <main className="interview-loading">
        Loading report...
      </main>
    );
  }

  if (!report) {
    return (
      <main className="interview-loading">
        No interview report found.
      </main>
    );
  }

  const questions =
    activeSection === 'Technical questions'
      ? report.technicalQuestions
      : report.behavioralQuestions;

  const renderQuestions = (items) => (
    <div className="question-list">
      {items?.map((item, index) => (
        <div className="question-card" key={index}>
          <h3>
            <span className="question-number">{index + 1}.</span>
            {item.question}
          </h3>

          <div className="question-intention">
            <strong>Interviewer's intention</strong>
            <p>{item.intention}</p>
          </div>

          <div className="suggested-answer">
            <strong>Suggested answer</strong>
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    if (activeSection === 'Road Map') {
      return (
        <>
          <div className="content-heading">
            <span>YOUR LEARNING JOURNEY</span>
            <h2>Preparation Roadmap</h2>
            <p>A structured plan to improve your interview readiness.</p>
          </div>

          <div className="roadmap-list">
            {report.preparationPlan?.map((item) => (
              <div className="roadmap-card" key={item.day}>
                <div className="day-number">
                  Day {item.day}
                </div>

                <h3>{item.focus}</h3>

                <ul>
                  {item.tasks?.map((task, index) => (
                    <li key={index}>{task}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      );
    }

    return (
      <>
        <div className="content-heading">
          <span>
            {activeSection === 'Technical questions'
              ? 'TECHNICAL EVALUATION'
              : 'COMMUNICATION & COLLABORATION'}
          </span>

          <h2>{activeSection}</h2>

          <p>
            {activeSection === 'Technical questions'
              ? 'Evaluate your technical knowledge and problem-solving skills.'
              : 'Prepare for questions about teamwork, communication and experience.'}
          </p>
        </div>

        {renderQuestions(questions)}
      </>
    );
  };

  const totalQuestions =
    (report.technicalQuestions?.length || 0) +
    (report.behavioralQuestions?.length || 0);

  return (
    <main className="interview-page">
      <header className="interview-header">
        <div className="header-info">
          <span className="eyebrow">INTERVIEW REVIEW</span>
          <h1>{report.title}</h1>
          <p>
            Generated on{' '}
            {report.createdAt
              ? new Date(report.createdAt).toLocaleDateString()
              : 'N/A'}
          </p>
        </div>

        <div className="match-card">
          <span>PROFILE MATCH SCORE</span>
          <strong>
            {report.matchScore ?? 0}
            <small>/ 100</small>
          </strong>
        </div>
      </header>

      <section className="interview-dashboard">
        <nav className="interview-nav">
          <span className="nav-heading">ASSESSMENT</span>

          <div className="nav-links">
            {sections.map((section) => (
              <button
                key={section}
                type="button"
                className={
                  activeSection === section ? 'active' : ''
                }
                onClick={() => setActiveSection(section)}
              >
                {section}
              </button>
            ))}
          </div>
        </nav>

        <article className="interview-content">
          {renderContent()}
        </article>

        <aside className="interview-sidebar">
          <div className="sidebar-section">
            <h3>Skill Gaps</h3>

            <div className="skill-list">
              {report.skillGaps?.length ? (
                report.skillGaps.map((item, index) => (
                  <div
                    className={`skill-chip ${item.severity}`}
                    key={index}
                  >
                    <span>{item.skill}</span>
                    <small>{item.severity}</small>
                  </div>
                ))
              ) : (
                <p className="empty-text">
                  No skill gaps identified.
                </p>
              )}
            </div>
          </div>

          <div className="sidebar-divider" />

          <div className="sidebar-section">
            <span className="stat-label">TOTAL QUESTIONS</span>
            <strong className="stat-value">{totalQuestions}</strong>
          </div>

          <div className="sidebar-section">
            <span className="stat-label">PREPARATION DAYS</span>
            <strong className="stat-value">
              {report.preparationPlan?.length || 0}
            </strong>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default Interview;
