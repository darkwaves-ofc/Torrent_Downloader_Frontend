import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import Auth from "./pages/Auth/Auth";
import "./App.css";
import "./utils/fontAwesomeSetup.js";
import "./utils/FontLoader";
import Header from "./common/Header/Header";
import Footer from "./common/Footer/Footer";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <>
      <Router>
        <DataProvider>
          <Routes>
            <Route path="/auth/*" element={<Auth />} />
            <Route path="/main" element={<Main />} />
            {/* Define other routes as needed */}
          </Routes>
        </DataProvider>
      </Router>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
