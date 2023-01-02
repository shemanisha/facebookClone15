import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Home from "./pages/home";
import RegisterForm from "./components/register/RegisterForm";
import CreatePostPopUp from "./components/createPostPopUp";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <div>
      <CreatePostPopUp user={user} />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/register" element={<RegisterForm />} exact />
        <Route path="/profile" element={<Profile />} exact />
      </Routes>
    </div>
  );
}

export default App;
