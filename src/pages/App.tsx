import React from "react";
import Header from "../components/header";
import Home from "./home";
import TaskManager from "./task-manager";

function App() {
  return (
    <div className="App">
      <Header>
        <div>
          <TaskManager />
        </div>
      </Header>
    </div>
  );
}

export default App;