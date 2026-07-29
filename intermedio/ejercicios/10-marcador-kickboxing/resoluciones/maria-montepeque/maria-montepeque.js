// 10. Marcador de kickboxing - Resolucion Maria Montepeque

const PUNTOS_GOLPE = 1;
const PUNTOS_DERRIBO = 5;
const PUNTOS_PENALIZACION = -3;

function validarPeleador(peleador) {
  return (
    peleador &&
    typeof peleador.nombre === 'string' &&
    Array.isArray(peleador.rounds) &&
    peleador.rounds.length > 0
  );
}

function calcularPuntosRound(round) {
  const golpes = round.golpes ?? 0;
  const derribos = round.derribos ?? 0;
  const penalizaciones = round.penalizaciones ?? 0;
  return golpes * PUNTOS_GOLPE + derribos * PUNTOS_DERRIBO + penalizaciones * PUNTOS_PENALIZACION;
}

function calcularPuntosPorRound(peleador) {
  return peleador.rounds.map(calcularPuntosRound);
}

function calcularTotal(peleador) {
  return calcularPuntosPorRound(peleador).reduce((total, puntos) => total + puntos, 0);
}

function compararPeleadores(peleadorA, peleadorB) {
  const totalA = calcularTotal(peleadorA);
  const totalB = calcularTotal(peleadorB);

  if (totalA === totalB) {
    return { resultado: 'empate', totalA, totalB };
  }

  const ganador = totalA > totalB ? peleadorA.nombre : peleadorB.nombre;
  return { resultado: 'ganador', ganador, totalA, totalB };
}

function resumenRounds(peleador) {
  return calcularPuntosPorRound(peleador).map((puntos, index) => `Round ${index + 1}: ${puntos} pts`);
}

function marcadorPelea(peleadorA, peleadorB) {
  if (!validarPeleador(peleadorA) || !validarPeleador(peleadorB)) {
    return { error: 'Datos de pelea incompletos o invalidos' };
  }

  return {
    [peleadorA.nombre]: resumenRounds(peleadorA),
    [peleadorB.nombre]: resumenRounds(peleadorB),
    marcadorFinal: compararPeleadores(peleadorA, peleadorB)
  };
}

const alpha = {
  nombre: 'Alpha',
  rounds: [
    { golpes: 18, derribos: 1, penalizaciones: 0 },
    { golpes: 15, derribos: 0, penalizaciones: 1 },
    { golpes: 20, derribos: 0, penalizaciones: 0 }
  ]
};

const bravo = {
  nombre: 'Bravo',
  rounds: [
    { golpes: 14, derribos: 0, penalizaciones: 0 },
    { golpes: 19, derribos: 1, penalizaciones: 0 },
    { golpes: 16, derribos: 0, penalizaciones: 2 }
  ]
};

console.log('Caso 1: pelea con ganador claro');
console.log(marcadorPelea(alpha, bravo));

const charlie = { nombre: 'Charlie', rounds: [{ golpes: 10, derribos: 0, penalizaciones: 0 }] };
const delta = { nombre: 'Delta', rounds: [{ golpes: 10, derribos: 0, penalizaciones: 0 }] };

console.log('\nCaso 2: pelea empatada');
console.log(marcadorPelea(charlie, delta));

// Reto extra: validacion de datos incompletos
console.log('\nCaso 3: datos incompletos (validacion)');
console.log(marcadorPelea({ nombre: 'Echo' }, delta));
