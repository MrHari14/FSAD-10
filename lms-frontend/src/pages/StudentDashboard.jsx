import { useState, useEffect } from "react";
import "./Dashboard.css";

function StudentDashboard() {
  const [approvedCourses, setApprovedCourses] = useState([]);

  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    const filtered = savedCourses.filter((course) => course.status === "approved");
    setApprovedCourses(filtered);
  }, []);

  // demo stats (derive from saved data when available)
  const enrolledCount = approvedCourses.length || 2;
  const completedLessons = "3/5";
  const certificates = 3;
  const streak = "7 days";

  const demoCourse = approvedCourses[0] || {
    id: "demo-1",
    title: "Introduction to Web Development",
    author: "Sarah Johnson",
    tags: ["Web Development", "Beginner"],
    progress: 65,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&s=8d3c1b6a0a3f2f6d6f7f6e6c6e6d6c6d"
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-title">
        <h1>Welcome Back, Student!</h1>
        <p className="muted">Continue your learning journey</p>
      </div>

      <div className="card-grid stats-grid">
        <div className="card stat-card">
          <div className="stat-label">Enrolled Courses</div>
          <div className="stat-value">{enrolledCount}</div>
          <a className="stat-foot" href="#">Active learning</a>
        </div>

        <div className="card stat-card">
          <div className="stat-label">Completed Lessons</div>
          <div className="stat-value">{completedLessons}</div>
          <div className="stat-foot green">Keep it up!</div>
        </div>

        <div className="card stat-card">
          <div className="stat-label">Certificates Earned</div>
          <div className="stat-value">{certificates}</div>
          <div className="stat-foot">🏆 Great job!</div>
        </div>

        <div className="card stat-card">
          <div className="stat-label">Learning Streak</div>
          <div className="stat-value">{streak}</div>
          <div className="stat-foot orange">🔥 On fire!</div>
        </div>
      </div>

      <div className="continue-card card">
        <h3>Continue Learning</h3>
        <p className="muted">Pick up where you left off</p>

        <div className="course-row">
          <img src={demoCourse.image} alt="course" className="course-thumb" />

          <div className="course-info">
            <h4 className="course-title">{demoCourse.title}</h4>
            <div className="course-author">by {demoCourse.author}</div>

            <div className="course-tags">
              {demoCourse.tags.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>

            <div className="progress-wrap">
              <div className="progress-label">Progress</div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${demoCourse.progress}%` }} />
              </div>
              <div className="progress-percent">{demoCourse.progress}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;