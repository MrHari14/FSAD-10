import "./Dashboard.css"

function Instructor() {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Instructor Dashboard</h2>

      <div className="card-grid">
        <div className="card">
          <h3>My Courses</h3>
          <p>Manage your courses</p>
        </div>

        <div className="card">
          <h3>Assignments</h3>
          <p>Create and grade assignments</p>
        </div>

        <div className="card">
          <h3>Students</h3>
          <p>View enrolled students</p>
        </div>
      </div>
    </div>
  )
}

export default Instructor