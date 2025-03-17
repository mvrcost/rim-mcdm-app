// Função que implementa o método RIM (uma simulação simplificada)
export const calculateRIM = ({ alternatives, criteria, performanceMatrix, criteriaTypes, weights }) => {
    // Simulação de cálculo baseado no método RIM
    const scores = {};
    alternatives.forEach(alt => {
      let score = 0;
      criteria.forEach((crit, idx) => {
        const value = performanceMatrix[alt][idx];
        const weight = weights[crit];
        const type = criteriaTypes[crit];
        
        // Se o critério é de maximização ou minimização
        if (type === "max") {
          score += value * weight;
        } else {
          score -= value * weight;
        }
      });
      scores[alt] = score;
    });
  
    // Ordenar alternativas pelo score
    const ranking = alternatives.sort((a, b) => scores[b] - scores[a]);
  
    return {
      ranking,
      scores,
      normalized_weights: weights, // Apenas uma simulação para exibição
    };
  };
  