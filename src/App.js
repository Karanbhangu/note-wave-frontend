import Navbar from "./components/Navbar";
import Notes from "./components/Notes/Notes";
import AddNotes from "./components/Notes/AddNotes";
import About from "./components/About";
import Home from "./components/Home";
import Login from "./components/user/Login";
import Signup from "./components/user/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyAccount from "./components/user/MyAccount";
import NoteState from "./context/Notes/NoteState";

function App() {
  return (
    <>
      <BrowserRouter>
        <NoteState>
          <Navbar />
          <Routes>
            <Route
              path="/notes" // Use path instead of exact path
              element={
                // Use element instead of Component
                <div className="notes-section">
                  <AddNotes />
                  <Notes />
                </div>
              }
            />

            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/myaccount" element={<MyAccount />}/>
          </Routes>
          <ToastContainer position="top-center" pauseOnHover={false} autoClose={1500} />
        </NoteState>
      </BrowserRouter>
    </>
  );
}

export default App;
