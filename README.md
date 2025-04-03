# RIM MCDM Web App

Este repositório contém uma aplicação web desenvolvida em React com backend em Python utilizando Pyodide para integrar o modelo RIM (Robust Interactive Multi-Criteria Decision Making). A aplicação permite a entrada de alternativas, critérios e pesos para calcular rankings baseados no método RIM.

## Tecnologias Utilizadas

- **Frontend:** React
- **Backend:** Python via Pyodide
- **Bibliotecas:**
  - React
  - Pyodide
  - RIM MCDM (implementado em Python)

## Instalação e Execução

1. Clone este repositório:
   ```sh
   git clone https://github.com/seu-usuario/rim-mcdm-web.git
   cd rim-mcdm-web
   ```
2. Instale as dependências do frontend:
   ```sh
   npm install
   ```
3. Inicie a aplicação:
   ```sh
   npm start
   ```

## Estrutura do Projeto

```
 rim-mcdm-web/
 |-- public/
 |-- src/
 |   |-- components/
 |   |-- pages/
 |   |-- utils/
 |   |-- App.js
 |-- package.json
 |-- README.md
```

## Entrada do Modelo

A aplicação recebe um JSON com as seguintes informações:

```json
{
  "method": "RIM",
  "parameters": {
    "alternatives": ["A1", "A2", "A3"],
    "criteria": ["C1", "C2", "C3"],
    "performance_matrix": {
      "A1": [7, 9, 8],
      "A2": [6, 8, 9],
      "A3": [8, 7, 6]
    },
    "weights": {
      "C1": 0.5,
      "C2": 0.3,
      "C3": 0.2
    },
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
}
```

## Saída do Modelo

A aplicação retorna um JSON contendo o ranking das alternativas, scores e pesos normalizados:

```json
{
  "method": "RIM",
  "results": {
    "ranking": ["A2", "A1", "A3"],
    "scores": { "A2": 0.9, "A1": 0.8, "A3": 0.7 },
    "weights": {
      "C1": 0.5,
      "C2": 0.3,
      "C3": 0.2
    },
    "weighted_normalized_matrix": {
      "A1": [0.45, 0.2, 0.15],
      "A2": [0.5, 0.25, 0.15],
      "A3": [0.4, 0.1, 0.2]
    }
  }
}
```

