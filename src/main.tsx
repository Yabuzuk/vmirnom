
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./app/App.tsx";
import { AdminPanel } from "./app/admin/AdminPanel.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  </HashRouter>
);
  