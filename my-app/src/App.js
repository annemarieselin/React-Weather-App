import React from "react";
import "./App.css";
import SearchInput from "./Weather";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3>Enter city...</h3>
        <SearchInput />
      </header>
    </div>
  );
}

export default App;
