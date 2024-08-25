import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' }
  ];

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const parsedJson = JSON.parse(jsonInput);
      const res = await axios.post('http://localhost:3000/bfhl', parsedJson);
      setResponse(res.data);
    } catch (err) {
      setError('Invalid JSON or API Error');
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!response) return null;
    return (
      <div>
        {selectedOptions.map(option => (
          <div key={option.value}>
            <h3>{option.label}</h3>
            <pre>{JSON.stringify(response[option.value], null, 2)}</pre>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>JSON Processor</h1>
      <form onSubmit={handleFormSubmit}>
        <textarea
          value={jsonInput}
          onChange={handleInputChange}
          placeholder='Enter JSON here...'
        />
        <button type="submit">Submit</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      {response && (
        <>
          <Select
            isMulti
            options={options}
            onChange={handleSelectChange}
          />
          {renderResponse()}
        </>
      )}
    </div>
  );
};

export default App;
