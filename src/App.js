import './App.css';
import InputForm from './components/InputForm';
import ResultsDisplay from './components/ResultsDisplay';
import { useState, useEffect } from 'react';

function App() {
  const [results, setResults] = useState(null);
  const [pyodide, setPyodide] = useState(null);
  const [loadingPyodide, setLoadingPyodide] = useState(true);

  useEffect(() => {
    async function loadPyodideAndPackages() {
      try {
        const pyodideInstance = await window.loadPyodide({
          packages: ["numpy"]
        });
    
        await pyodideInstance.runPythonAsync(`
          import micropip
          await micropip.install("sad-cin")
          from sad_cin import decision_support
          import json
          
          def get_results(json_str):
              data = json.loads(json_str)
              result = decision_support(data)
              return json.dumps(result)
        `);
        setPyodide(pyodideInstance);
      } catch (error) {
        console.error("Erro ao carregar o Pyodide:", error);
      } finally {
        setLoadingPyodide(false);
      }
    }
    loadPyodideAndPackages();
  }, []);


  const handleFormSubmit = (jsonStr) => {
    if (!pyodide) {
      console.error("Pyodide ainda não está carregado");
      return;
    }
    try {
      console.log("Dados recebidos:", jsonStr);
      const getResults = pyodide.globals.get("get_results");
      const resultString = getResults(jsonStr);
      setResults(JSON.parse(resultString));
    } catch (error) {
      console.error("Error running Python function:", error);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Método RIM - MCDM Profissional</h1>
      </header>
      <main className="container">
      <InputForm onSubmit={handleFormSubmit} disabled={loadingPyodide} />
        {results && <ResultsDisplay results={results} />}
      </main>
    </div>
  );
}

export default App;
