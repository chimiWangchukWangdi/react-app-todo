import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Header from "../components/header";
import Profile from "./profile";
import Dashboard from "./dashboard";
import TaskManager from "./task-manager";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header >
        <Routes>
            <Route path="/" element={<TaskManager/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/profile" element={<Profile/>} />
        </Routes>
      </Header>
      </BrowserRouter>
    </div>
  );
}

export default App;
