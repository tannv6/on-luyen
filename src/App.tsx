import { Route, Routes } from "react-router";
import "./App.css";
import LoginPage from "./modules/auth";
import MainPage from "./modules/main/pages";
import Logs from "./modules/acti-logs/Logs";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="*" element={<h3>Not Found</h3>} />
      </Routes>
    </div>
  );
}

export default App;
