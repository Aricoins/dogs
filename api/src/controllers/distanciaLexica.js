function distanciaLexica(a, b) {
    const matrix = [];
  
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
  
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
  
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        const cost = a[j - 1] === b[i - 1] ? 0 : 1;
  
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }
  
    return matrix[b.length][a.length];
  }
  
module.exports = distanciaLexica;
  // Ejemplo de uso
  const palabra1 = 'amonestacion';
  const palabra2 = 'amostacion';
  const distancia = distanciaLexica(palabra1, palabra2);
  
  console.log(`La distancia de léxica entre ${palabra1} y ${palabra2} es: ${distancia}`);
  