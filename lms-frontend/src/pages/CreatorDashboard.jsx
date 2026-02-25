import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CreatorDashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();   // 🔥 for navigation

  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    setCourses(savedCourses);
  }, []);

  const handleCreateCourse = (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Fill all fields");
      return;
    }

    const newCourse = {
      id: Date.now(),
      title,
      description,
      status: "pending",
    };

    const updatedCourses = [...courses, newCourse];

    localStorage.setItem("courses", JSON.stringify(updatedCourses));

    alert("Course created successfully! Redirecting to Admin...");

    // 🔥 Navigate to Admin Dashboard
    navigate("/admin");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Creator Dashboard</h2>

      <form onSubmit={handleCreateCourse}>
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br /><br />

        <textarea
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br /><br />

        <button type="submit">Create Course</button>
      </form>
    </div>
  );
}

export default CreatorDashboard;