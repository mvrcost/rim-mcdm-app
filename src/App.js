import './App.css';
import InputForm from './components/InputForm';
import ResultsDisplay from './components/ResultsDisplay';
import { useState } from 'react';
import { calculateRIM } from './utils/rimMethod';

function App() {
  const [results, setResults] = useState(null);

  const handleFormSubmit = (data) => {
    const calculationResults = calculateRIM(data);
    setResults(calculationResults);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Método RIM - MCDM Profissional</h1>
      </header>
      <main className="container">
        <InputForm onSubmit={handleFormSubmit} />
        {results && <ResultsDisplay results={results} />}
      </main>
    </div>
  );
}

export default App;
