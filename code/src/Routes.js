import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ConfigurationPage from "./ConfigurationPage";
import Dashboard from "./Dashboard";
import HistoryPanel from "./HistoryPanel";

const Routed = () => {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ConfigurationPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<HistoryPanel />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routed;
