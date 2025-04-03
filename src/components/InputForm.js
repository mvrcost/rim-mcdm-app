import { useState } from 'react';

function InputForm({ onSubmit }) {
  const [alternatives, setAlternatives] = useState(["A1", "A2", "A3"]);
  const [criteria, setCriteria] = useState(["C1", "C2", "C3"]);
  const [weights, setWeights] = useState({
    C1: 0.5,
    C2: 0.3,
    C3: 0.2,
  });
  const [criteriaTypes, setCriteriaTypes] = useState({
    C1: "max",
    C2: "max",
    C3: "max",
  });
  const [performanceMatrix, setPerformanceMatrix] = useState({
    A1: [7, 9, 8],
    A2: [6, 8, 9],
    A3: [8, 7, 6],
  });
  const [intervals, setIntervals] = useState({
    C1: [5, 10],
    C2: [6, 10],
    C3: [5, 10],
  });
  const [referenceIdeals, setReferenceIdeals] = useState({
    C1: [7, 9],
    C2: [8, 9],
    C3: [6, 7],
  });

  const handleMatrixChange = (alt, critIdx, value) => {
    setPerformanceMatrix({
      ...performanceMatrix,
      [alt]: performanceMatrix[alt].map((v, idx) =>
        idx === critIdx ? parseFloat(value) : v
      ),
    });
  };

  const handleIntervalChange = (crit, idx, value) => {
    setIntervals({
      ...intervals,
      [crit]: intervals[crit].map((v, i) => (i === idx ? parseFloat(value) : v)),
    });
  };

  const handleReferenceChange = (crit, idx, value) => {
    setReferenceIdeals({
      ...referenceIdeals,
      [crit]: referenceIdeals[crit].map((v, i) =>
        i === idx ? parseFloat(value) : v
      ),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (alternatives.length === 0 || criteria.length === 0) {
      alert("Por favor, insira pelo menos uma alternativa e um critério.");
      return;
    }
    onSubmit({
      method: "RIM",
      parameters: {
        alternatives,
        criteria,
        performance_matrix: performanceMatrix,
        weights,
        intervals,
        reference_ideals: referenceIdeals,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Configurações do Método RIM</h2>

      <div>
        <label>Alternativas (separadas por vírgula)</label>
        <input
          type="text"
          value={alternatives.join(", ")}
          onChange={(e) =>
            setAlternatives(e.target.value.split(",").map((item) => item.trim()))
          }
          required
        />
      </div>

      <div>
        <label>Critérios (separados por vírgula)</label>
        <input
          type="text"
          value={criteria.join(", ")}
          onChange={(e) =>
            setCriteria(e.target.value.split(",").map((item) => item.trim()))
          }
          required
        />
      </div>

      {criteria.map((crit, idx) => (
        <div key={idx}>
          <label>Peso de {crit}</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="1"
            value={weights[crit] || ""}
            onChange={(e) =>
              setWeights({ ...weights, [crit]: parseFloat(e.target.value) })
            }
            required
          />
          <select
            value={criteriaTypes[crit] || "max"}
            onChange={(e) =>
              setCriteriaTypes({ ...criteriaTypes, [crit]: e.target.value })
            }
          >
            <option value="max">Maximizar</option>
            <option value="min">Minimizar</option>
          </select>
        </div>
      ))}

      <h3>Matriz de Desempenho</h3>
      {Object.entries(performanceMatrix).map(([alt, values], altIdx) => (
        <div key={altIdx}>
          <h4>{alt}</h4>
          {values.map((value, critIdx) => (
            <div key={critIdx}>
              <label>{criteria[critIdx]}</label>
              <input
                type="number"
                value={value || ""}
                onChange={(e) =>
                  handleMatrixChange(alt, critIdx, e.target.value)
                }
                required
              />
            </div>
          ))}
        </div>
      ))}

      <h3>Intervalos</h3>
      {Object.entries(intervals).map(([crit, range], idx) => (
        <div key={idx}>
          <label>Intervalo de {crit}</label>
          <input
            type="number"
            value={range[0] || ""}
            onChange={(e) => handleIntervalChange(crit, 0, e.target.value)}
            required
          />
          <input
            type="number"
            value={range[1] || ""}
            onChange={(e) => handleIntervalChange(crit, 1, e.target.value)}
            required
          />
        </div>
      ))}

      <h3>Ideais de Referência</h3>
      {Object.entries(referenceIdeals).map(([crit, ideals], idx) => (
        <div key={idx}>
          <label>Ideal de {crit}</label>
          <input
            type="number"
            value={ideals[0] || ""}
            onChange={(e) => handleReferenceChange(crit, 0, e.target.value)}
            required
          />
          <input
            type="number"
            value={ideals[1] || ""}
            onChange={(e) => handleReferenceChange(crit, 1, e.target.value)}
            required
          />
        </div>
      ))}

      <button type="submit">Calcular</button>
    </form>
  );
}

export default InputForm;