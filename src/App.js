import React from 'react';
import './styles.css';

function App() {
  return (
      <div className="flex flex-col mx-auto my-12 items-center bg-gray-500">
          <h1>Super cool page</h1>
          <button className="bg-red-100" onClick={() => console.log("I was clicked")}>
              I am a button
          </button>
      </div>
  );
}

export default App;
