import logo from "./logo.svg";
import "./App.css";
import CourseList from "./CourseList";

function App() {
  const courses = ["DSA", "C", "C++", "React", "JavaScript", "HTML", "CSS"];

  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>My Courses</h1>
      <CourseList courses={courses} />
    </div>
  );
}

export default App;
