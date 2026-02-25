import { useState, useEffect } from "react";

function AdminDashboard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    setCourses(savedCourses);
  }, []);

  const approveCourse = (id) => {
    const updatedCourses = courses.map((course) =>
      course.id === id
        ? { ...course, status: "approved" }
        : course
    );

    setCourses(updatedCourses);
    localStorage.setItem("courses", JSON.stringify(updatedCourses));
  };

  const deleteCourse = (id) => {
    const updatedCourses = courses.filter(
      (course) => course.id !== id
    );

    setCourses(updatedCourses);
    localStorage.setItem("courses", JSON.stringify(updatedCourses));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>

      {courses.length === 0 ? (
        <p>No courses available</p>
      ) : (
        courses.map((course) => (
          <div
            key={course.id}
            style={{
              border: "1px solid black",
              padding: "10px",
              margin: "10px 0",
            }}
          >
            <h4>{course.title}</h4>
            <p>{course.description}</p>
            <strong>Status: {course.status}</strong>

            {course.status === "pending" && (
              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() => approveCourse(course.id)}
                  style={{ marginRight: "10px" }}
                >
                  Approve
                </button>

                <button
                  onClick={() => deleteCourse(course.id)}
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default AdminDashboard;