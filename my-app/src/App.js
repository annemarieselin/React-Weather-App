import React from "react";
import "./App.css";
import SearchInput from "./Weather";
import "./Weather.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SearchInput defaultCity="London" />
      </header>
    </div>
  );
}

export default App;
