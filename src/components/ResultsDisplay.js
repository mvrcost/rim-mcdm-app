function ResultsDisplay({ results }) {
  return (
    <div className="results">
      <h2>Resultados do Método RIM</h2>
      
      <div className="ranking">
        <h3>Ranking:</h3>
        <ol>
          {results.ranking.map((alt, idx) => (
            <li key={idx}>{alt} (Score: {results.scores[alt].toFixed(2)})</li>
          ))}
        </ol>
      </div>

      <div className="weights">
        <h3>Pesos Normalizados:</h3>
        <table>
          <thead>
            <tr>
              {Object.keys(results.normalized_weights).map((crit, idx) => (
                <th key={idx}>{crit}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {Object.values(results.normalized_weights).map((weight, idx) => (
                <td key={idx}>{weight}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResultsDisplay;
