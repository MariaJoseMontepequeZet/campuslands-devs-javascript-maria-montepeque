// 12. Liga de pingpong - Resolucion Maria Montepeque

function validarPartido(partido) {
  return (
    partido &&
    typeof partido.jugadorA === 'string' &&
    typeof partido.jugadorB === 'string' &&
    partido.jugadorA !== partido.jugadorB &&
    typeof partido.puntosA === 'number' &&
    typeof partido.puntosB === 'number' &&
    partido.puntosA >= 0 &&
    partido.puntosB >= 0
  );
}

function crearJugador(nombre) {
  return { nombre, victorias: 0, derrotas: 0, puntosFavor: 0, puntosContra: 0 };
}

function actualizarJugador(tabla, nombre, puntosFavor, puntosContra) {
  const jugador = tabla.get(nombre) ?? crearJugador(nombre);
  jugador.puntosFavor += puntosFavor;
  jugador.puntosContra += puntosContra;
  if (puntosFavor > puntosContra) {
    jugador.victorias += 1;
  } else {
    jugador.derrotas += 1;
  }
  tabla.set(nombre, jugador);
}

function construirTabla(partidos) {
  const tabla = new Map();
  partidos.forEach((partido) => {
    actualizarJugador(tabla, partido.jugadorA, partido.puntosA, partido.puntosB);
    actualizarJugador(tabla, partido.jugadorB, partido.puntosB, partido.puntosA);
  });
  return tabla;
}

function calcularDiferencia(jugador) {
  return jugador.puntosFavor - jugador.puntosContra;
}

function ordenarPosiciones(tabla) {
  return [...tabla.values()]
    .map((jugador) => ({ ...jugador, diferencia: calcularDiferencia(jugador) }))
    .sort((a, b) => b.victorias - a.victorias || b.diferencia - a.diferencia)
    .map((jugador, index) => ({ posicion: index + 1, ...jugador }));
}

function ligaPingpong(partidos) {
  const validos = partidos.filter(validarPartido);
  const posiciones = ordenarPosiciones(construirTabla(validos));

  return {
    posiciones,
    campeonProvisional: posiciones.length > 0 ? posiciones[0].nombre : null,
    partidosInvalidos: partidos.length - validos.length
  };
}

const partidos = [
  { jugadorA: 'Alpha', jugadorB: 'Bravo', puntosA: 11, puntosB: 7 },
  { jugadorA: 'Bravo', jugadorB: 'Charlie', puntosA: 11, puntosB: 9 },
  { jugadorA: 'Alpha', jugadorB: 'Charlie', puntosA: 9, puntosB: 11 },
  { jugadorA: 'Charlie', jugadorB: 'Alpha', puntosA: 8, puntosB: 11 }
];

console.log('Caso 1: liga con partidos validos');
console.log(ligaPingpong(partidos));

const partidosConInvalido = [...partidos, { jugadorA: 'Delta', jugadorB: 'Delta', puntosA: 11, puntosB: 5 }];

console.log('\nCaso 2: incluye un partido invalido (mismo jugador en ambos lados)');
console.log(ligaPingpong(partidosConInvalido));
