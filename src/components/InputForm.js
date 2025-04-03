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
    C3: "min",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (alternatives.length === 0 || criteria.length === 0) {
      alert("Por favor, insira pelo menos uma alternativa e um critério.");
      return;
    }
    onSubmit({
      "method": "RIM",
      "parameters": {
        "alternatives": alternatives,
        "criteria": criteria,
        "performance_matrix": {
          "A1": [7, 9, 8],
          "A2": [6, 8, 9],
          "A3": [8, 7, 6]
        },
        "weights": weights,
        "intervals": {
          "C1": [5, 10],
          "C2": [6, 10],
          "C3": [5, 10]
        },
        "reference_ideals": {
          "C1": [7, 9],
          "C2": [8, 9],
          "C3": [6, 7]
        }
      }
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
          onChange={(e) => setAlternatives(e.target.value.split(", ").map(item => item.trim()))}
          required
        />
      </div>

      <div>
        <label>Critérios (separados por vírgula)</label>
        <input
          type="text"
          value={criteria.join(", ")}
          onChange={(e) => setCriteria(e.target.value.split(", ").map(item => item.trim()))}
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
            value={weights[crit]}
            onChange={(e) => setWeights({ ...weights, [crit]: parseFloat(e.target.value) })}
            required
          />
          <select
            value={criteriaTypes[crit]}
            onChange={(e) => setCriteriaTypes({ ...criteriaTypes, [crit]: e.target.value })}
          >
            <option value="max">Maximizar</option>
            <option value="min">Minimizar</option>
          </select>
        </div>
      ))}

      <button type="submit">Calcular</button>
    </form>
  );
}

export default InputForm;
