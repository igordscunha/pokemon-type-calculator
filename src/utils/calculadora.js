import typeData from '../data/pokemonsTypes.json';

export function calculadoraDeTipos(selectedTypes) {
  if (!selectedTypes || !Array.isArray(selectedTypes)) {
    return { veryWeakAgainst: [], weakAgainst: [], strongAgainst: [], veryStrongAgainst: [], immuneTo: [] };
  }

  const immuneTo = new Set();
  const veryStrongAgainst = new Set();
  const strongAgainst = new Set();
  const weakAgainst = new Set();
  const veryWeakAgainst = new Set();

  const calcularMultiplicador = (targetType) => {
    let multiplicador = 1;

    selectedTypes.forEach(selectedType => {
      const typeInfo = typeData.find(td => td.type === selectedType);
      if (typeInfo.strongAgainst.includes(targetType)) {
        multiplicador *= 2; // Efetivo
      } else if (typeInfo.weakAgainst.includes(targetType)) {
        multiplicador *= 0.5; // Inefetivo
      } else if (typeInfo.immuneTo.includes(targetType)) {
        multiplicador *= 0; // Imune
      }
    });

    return multiplicador;
  };

  typeData.forEach(type => {
    const multiplicador = calcularMultiplicador(type.type);

    if (multiplicador === 0) {
      immuneTo.add(type.type); // Imune
    } else if (multiplicador >= 4) {
      veryStrongAgainst.add(type.type); // Muito Efetivo
    } else if (multiplicador === 2) {
      strongAgainst.add(type.type); // Efetivo
    } else if (multiplicador === 0.5) {
      weakAgainst.add(type.type); // Inefetivo
    } else if (multiplicador <= 0.25) {
      veryWeakAgainst.add(type.type); // Muito Inefetivo
    }
  });

  if (selectedTypes.length === 1) {
    return {
      veryStrongAgainst: Array.from(strongAgainst),
      strongAgainst: [],
      veryWeakAgainst: Array.from(weakAgainst),
      weakAgainst: [],
      immuneTo: Array.from(immuneTo),
    };
  }

  return {
    veryWeakAgainst: Array.from(veryWeakAgainst),
    weakAgainst: Array.from(weakAgainst),
    veryStrongAgainst: Array.from(veryStrongAgainst),
    strongAgainst: Array.from(strongAgainst),
    immuneTo: Array.from(immuneTo),
  };
}
