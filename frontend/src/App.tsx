import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
} from "react-router-dom";
import "./App.css";
import UploadImages from "./components/UploadImages";
import Images from "./components/Images";
import NotFound from "./components/404page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadImages />} />
        <Route path="/images" element={<Images />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
