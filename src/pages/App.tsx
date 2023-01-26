import React from 'react';
import Header from '../components/header';
import Home from './home';
import Landing from './landing';


function App() {
  return (
    <div className="App">
      <Header>
        <div><Home/></div>
      </Header>
    </div>
  );
}

export default App;
