import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import {
  Bell,
  User,
  LogOut,
  LayoutDashboard,
  Menu,
  BookOpen,
  Users
} from "lucide-react";
import "./App.css";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import InstructorDashboard from "./pages/InstructorDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import CreatorDashboard from "./pages/CreatorDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

/* Home */
function Home() {
  return <h2>Welcome to LMS Home</h2>;
}

/* Layout */
function Layout({ children }) {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  const username = localStorage.getItem("username");

  const [collapsed, setCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notificationRef = useRef();
  const profileRef = useRef();

  const notifications = [
    "📚 New course added",
    "📝 Assignment due tomorrow",
    "📊 Monthly report generated"
  ];

  /* Close dropdown when clicking outside */
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfile(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className="container">

      {/* SIDEBAR */}
      <div className={collapsed ? "sidebar collapsed" : "sidebar"}>
        <div className="sidebar-top">
          <h2>{!collapsed && "LMS"}</h2>
          <Menu
            size={20}
            onClick={() => setCollapsed(!collapsed)}
            style={{ cursor: "pointer" }}
          />
        </div>

        {/* Dashboard */}
        <Link to="/" className="menu-item">
          <LayoutDashboard size={18} />
          {!collapsed && <span>Dashboard</span>}
        </Link>

        {/* Courses */}
        <div className="menu-section">
          <div
            className="menu-item"
            onClick={() => toggleMenu("courses")}
          >
            <BookOpen size={18} />
            {!collapsed && (
              <>
                <span>Courses</span>
                <span
                  className={
                    openMenu === "courses"
                      ? "arrow rotate"
                      : "arrow"
                  }
                >
                  ▸
                </span>
              </>
            )}
          </div>

          {!collapsed && openMenu === "courses" && (
            <div className="submenu">
              <Link to="/courses">My Courses</Link>
              <Link to="/add-course">Add Course</Link>
            </div>
          )}
        </div>

        {/* Users */}
        <div className="menu-section">
          <div
            className="menu-item"
            onClick={() => toggleMenu("users")}
          >
            <Users size={18} />
            {!collapsed && (
              <>
                <span>Users</span>
                <span
                  className={
                    openMenu === "users"
                      ? "arrow rotate"
                      : "arrow"
                  }
                >
                  ▸
                </span>
              </>
            )}
          </div>

          {!collapsed && openMenu === "users" && (
            <div className="submenu">
              <Link to="/students">Students</Link>
              <Link to="/instructors">Instructors</Link>
            </div>
          )}
        </div>
      </div>

      {/* MAIN */}
      <div className="main">

        {/* NAVBAR */}
        <div className="navbar">
          <h3>LMS Dashboard</h3>

          <div className="nav-actions">

            {/* Notifications */}
            <div className="icon-wrapper" ref={notificationRef}>
              <div
                className="icon-bell"
                onClick={() =>
                  setShowNotifications(!showNotifications)
                }
              >
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className="badge">
                    {notifications.length}
                  </span>
                )}
              </div>

              {showNotifications && (
                <div className="dropdown slide">
                  {notifications.map((note, index) => (
                    <p key={index}>{note}</p>
                  ))}
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="icon-wrapper" ref={profileRef}>
              <User
                size={20}
                onClick={() =>
                  setShowProfile(!showProfile)
                }
                style={{ cursor: "pointer" }}
              />

              {showProfile && (
                <div className="dropdown slide">
                  <p><strong>{username || "User"}</strong></p>
                  <p>Role: {userRole}</p>
                  <p
                    className="logout-text"
                    onClick={() => {
                      localStorage.clear();
                      navigate("/login");
                    }}
                  >
                    <LogOut size={16} /> Logout
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>

        <div className="content">{children}</div>
      </div>
    </div>
  );
}

/* ROUTES */
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/instructor"
          element={
            <ProtectedRoute allowedRole="instructor">
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/creator"
          element={
            <ProtectedRoute allowedRole="creator">
              <CreatorDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;