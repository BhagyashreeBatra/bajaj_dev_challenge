import React, { useState } from 'react';
import JsonInputForm from './components/JsonInputForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>JSON Input Processor</h1>
      <JsonInputForm />
    </div>
  );
}

export default App;
