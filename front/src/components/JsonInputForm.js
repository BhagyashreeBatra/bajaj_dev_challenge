import React, { useState } from 'react';

function JsonInputForm() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedJson = JSON.parse(jsonInput); // Validate JSON
      setError(null);

      // Send POST request to backend using native fetch API
      const res = await fetch('https://bajaj-dev-challenge.onrender.com/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedJson),
      });
      const result = await res.json();
      setResponse(result);
    } catch (err) {
      setError('Invalid JSON input');
      setResponse(null);
    }
  };

  const handleOptionChange = (e) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedOptions(options);
  };

  const renderFilteredResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_lowercase_alphabet } = response;

    const filteredResponse = {};
    if (selectedOptions.includes('numbers')) filteredResponse.numbers = numbers;
    if (selectedOptions.includes('alphabets')) filteredResponse.alphabets = alphabets;
    if (selectedOptions.includes('highest_lowercase_alphabet')) filteredResponse.highest_lowercase_alphabet = highest_lowercase_alphabet;

    return (
      <div className="filtered-response">
        <h3>Filtered Response</h3>
        <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <textarea
          className="input-area"
          placeholder='Enter JSON input'
          value={jsonInput}
          onChange={handleInputChange}
          rows='5'
          cols='40'
        />
        <br />
        <button type='submit' className="submit-btn">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      
      {response && (
        <div className="response-container">
          <h2>API Response</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
          
          <label>Multi Filter</label>
          <select multiple onChange={handleOptionChange} className="multi-filter">
            <option value="numbers">Numbers</option>
            <option value="alphabets">Alphabets</option>
            <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
          </select>

          {renderFilteredResponse()}
        </div>
      )}
    </div>
  );
}

export default JsonInputForm;
