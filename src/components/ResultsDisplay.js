function ResultsDisplay({ results }) {
  return (
    <div className="results">
      <h2>Resultados do Método {results.method}</h2>
      
      <div className="ranking">
        <h3>Ranking:</h3>
        <ol>
          {results.results.ranking.map((alt, idx) => (
            <li key={idx}>
              {alt} (Score: {results.results.scores[alt].toFixed(2)})
            </li>
          ))}
        </ol>
      </div>

      <div className="weights">
        <h3>Pesos Normalizados:</h3>
        <table>
          <thead>
            <tr>
              {Object.keys(results.results.weights).map((crit, idx) => (
                <th key={idx}>{crit}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {Object.values(results.results.weights).map((weight, idx) => (
                <td key={idx}>{weight.toFixed(2)}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="weighted-matrix">
        <h3>Matriz Ponderada Normalizada:</h3>
        <table>
          <thead>
            <tr>
              <th>Alternativa</th>
              {Object.keys(results.results.weights).map((crit, idx) => (
                <th key={idx}>{crit}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(results.results.weighted_normalized_matrix).map(
              ([alt, values], idx) => (
                <tr key={idx}>
                  <td>{alt}</td>
                  {values.map((value, valueIdx) => (
                    <td key={valueIdx}>{value.toFixed(5)}</td>
                  ))}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResultsDisplay;