import Image from "next/image";
import SecurityIcon from "@mui/icons-material/Security";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to TaskSync</h1>
          <p className="hero-description">
            TaskSync is a simple and efficient task management application. It allows you to create, edit, and delete tasks with due dates and reminders.
            With TaskSync, you can keep track of your tasks and stay organized.
          </p>
        </div>
        <Image
          src="/notes.jpg"
          alt="Task Management Illustration"
          width={500}
          height={500}
          className="hero-image"
        />
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature">
          <div className="feature-header">
            <SecurityIcon className="feature-icon" />
            <h2 className="feature-title">Secure and Private</h2>
          </div>
          <ul className="feature-list">
            <li>User Authentication</li>
            <li>Protected Info</li>
          </ul>
        </div>

        <div className="feature">
          <div className="feature-header">
            <AssignmentTurnedInIcon className="feature-icon" />
            <h2 className="feature-title">Task Management</h2>
          </div>
          <ul className="feature-list">
            <li>Create, edit, and delete tasks</li>
            <li>Due dates and reminders</li>
            <li>Task prioritization</li>
            <li>Task categorization</li>
          </ul>
        </div>

        <div className="feature">
          <div className="feature-header">
            <DashboardIcon className="feature-icon" />
            <h2 className="feature-title">Statistics and Analytics</h2>
          </div>
          <ul className="feature-list">
            <li>Task completion statistics</li>
            <li>Task due date reminders</li>
            <li>Task visualization</li>
          </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2 className="cta-title">Boost Your Productivity Today!</h2>
        <p className="cta-description">
          Get started with TaskSync and experience a seamless way to manage your tasks. Stay organized and take control of your day like never before.
        </p>
        <button className="cta-button">
          Get Started <ArrowForwardIcon />
        </button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">
          © {new Date().getFullYear()} TaskSync. All rights reserved.
        </p>
        <ul className="footer-links">
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </footer>
    </div>
  );
}
