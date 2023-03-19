import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router";
import "./App.css";
import LoginPage from "./modules/auth";
import MainPage from "./modules/main/pages";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const userInfo = useSelector((state: any) => state.auth?.userInfo);
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<h3>Not Found</h3>} />
      </Routes>
    </div>
  );
}

export default App;
