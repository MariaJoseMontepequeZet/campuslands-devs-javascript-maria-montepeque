// 11. Simulador de carrera por vueltas - Resolucion Maria Montepeque

function validarPiloto(piloto) {
  return (
    piloto &&
    typeof piloto.nombre === 'string' &&
    Array.isArray(piloto.vueltas) &&
    piloto.vueltas.length > 0 &&
    piloto.vueltas.every((tiempo) => typeof tiempo === 'number' && tiempo > 0)
  );
}

function calcularTiempoTotal(piloto) {
  return piloto.vueltas.reduce((total, tiempo) => total + tiempo, 0);
}

function calcularVueltaRapida(piloto) {
  return Math.min(...piloto.vueltas);
}

function construirResumen(piloto) {
  return {
    nombre: piloto.nombre,
    tiempoTotal: Number(calcularTiempoTotal(piloto).toFixed(2)),
    vueltaRapida: calcularVueltaRapida(piloto)
  };
}

function ordenarPosiciones(resumenes) {
  return [...resumenes]
    .sort((a, b) => a.tiempoTotal - b.tiempoTotal)
    .map((piloto, index) => ({ posicion: index + 1, ...piloto }));
}

function encontrarVueltaMasRapida(posiciones) {
  if (posiciones.length === 0) return null;
  const mejor = posiciones.reduce((actual, piloto) =>
    piloto.vueltaRapida < actual.vueltaRapida ? piloto : actual
  );
  return { piloto: mejor.nombre, tiempo: mejor.vueltaRapida };
}

function simularCarrera(pilotos) {
  const validos = pilotos.filter(validarPiloto);
  const posiciones = ordenarPosiciones(validos.map(construirResumen));

  return {
    posiciones,
    vueltaMasRapidaDeLaCarrera: encontrarVueltaMasRapida(posiciones),
    pilotosInvalidos: pilotos.length - validos.length
  };
}

const pilotos = [
  { nombre: 'Alpha', vueltas: [78.2, 77.9, 79.1] },
  { nombre: 'Bravo', vueltas: [79.0, 78.5, 77.8] },
  { nombre: 'Charlie', vueltas: [80.1, 79.8, 78.9] }
];

console.log('Caso 1: carrera con 3 pilotos validos');
console.log(simularCarrera(pilotos));

const pilotosConInvalido = [...pilotos, { nombre: 'Delta', vueltas: [] }];

console.log('\nCaso 2: incluye un piloto con datos invalidos (vueltas vacias)');
console.log(simularCarrera(pilotosConInvalido));
