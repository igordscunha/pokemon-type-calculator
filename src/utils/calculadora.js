import typeData from '../data/pokemonsTypes.json'

export function calculadoraDeTipos(selectedTypes) {
  if (!selectedTypes || !Array.isArray(selectedTypes)) {
    return { weakAgainst: [], strongAgainst: [], immuneTo: [] };
  }

  const types = typeData.filter(t => selectedTypes.includes(t.type));
  const immuneTo = new Set();
  const strongAgainst = new Set();
  const weakAgainst = new Set();

  // 1. Processa imunidades (máxima prioridade)
  types.forEach(type => {
    type.immuneTo.forEach(immuneType => immuneTo.add(immuneType));
  });

  // 2. Processa FRAQUEZAS (tipos que são fortes contra AMBOS)
  types.forEach(type => {
    type.weakAgainst.forEach(weakType => {

      const neutralizado = types.some(t => t.strongAgainst.includes(weakType));

      if(!neutralizado && !immuneTo.has(weakType)){
        weakAgainst.add(weakType);
      }
    })
  })

  // 3. Processa RESISTÊNCIAS (tipos resistidos por AMBOS ou por um enquanto o outro é neutro)
  const allPossibleResistances = new Set();
  types.forEach(type => {
    type.strongAgainst.forEach(resistantType => {

      if (!immuneTo.has(resistantType)) {
        allPossibleResistances.add(resistantType);
      }

    });
  });

  // Só considera resistência se pelo menos um tipo resistir e o outro não for fraco
  allPossibleResistances.forEach(resistantType => {

    if (!types.some(type => type.weakAgainst.includes(resistantType))) {
      strongAgainst.add(resistantType);
    }

  });

  return {
    weakAgainst: Array.from(weakAgainst),
    strongAgainst: Array.from(strongAgainst),
    immuneTo: Array.from(immuneTo)
  };
}