import React, { useState } from 'react';
import InputForm from '../components/InputForm';
import ResultsDisplay from '../components/ResultsDisplay';

function HomePage() {
  const [results, setResults] = useState(null);

  const handleFormSubmit = (formData) => {
    // Simular envio de dados para o back-end e cálculo do RIM
    // O back-end ou Pyodide devolveria os resultados aqui
    const simulatedResults = {
      ranking: ["A2", "A1", "A3"],
      scores: { A1: 0.8, A2: 0.9, A3: 0.7 },
      normalized_weights: { C1: 0.5, C2: 0.3, C3: 0.2 }
    };
    
    setResults(simulatedResults);
  };

  return (
    <div>
      <h1>MCDM - Método RIM</h1>
      <InputForm onSubmit={handleFormSubmit} />
      <ResultsDisplay results={results} />
    </div>
  );
}

export default HomePage;
