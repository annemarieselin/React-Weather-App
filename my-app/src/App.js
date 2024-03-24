import React from "react";
import "./App.css";
import SearchInput from "./Weather";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3>Enter city...</h3>
        <SearchInput />
        <footer class="sources">
          This site was coded by Anne-Marie Selin at{" "}
          <a href="https://selinmarketing.com/" target="_blank">
            Selin Marketing
          </a>{" "}
          and is open-source on{" "}
          <a
            href="https://github.com/annemarieselin/react-weather-app"
            target="_blank"
          >
            {" "}
            Github
          </a>{" "}
          and hosted on{" "}
          <a
            href="https://react-weather-app-annemarieselin.netlify.app/"
            target="_blank"
          >
            {" "}
            Netlify
          </a>
          .
        </footer>
      </header>
    </div>
  );
}

export default App;
