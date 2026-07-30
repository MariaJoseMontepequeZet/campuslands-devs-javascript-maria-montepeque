// 13. Curador de playlist - Resolucion Maria Montepeque

function validarCancion(cancion) {
  return (
    cancion &&
    typeof cancion.titulo === 'string' &&
    typeof cancion.genero === 'string' &&
    typeof cancion.bpm === 'number' &&
    cancion.bpm > 0 &&
    typeof cancion.duracionSegundos === 'number' &&
    cancion.duracionSegundos > 0
  );
}

function normalizarNombre(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[^\x00-\x7F]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function filtrarPorBpm(canciones, bpmMin, bpmMax) {
  return canciones.filter((cancion) => cancion.bpm >= bpmMin && cancion.bpm <= bpmMax);
}

function calcularDuracionTotal(canciones) {
  return canciones.reduce((total, cancion) => total + cancion.duracionSegundos, 0);
}

function formatearDuracion(segundos) {
  const minutos = Math.floor(segundos / 60);
  const resto = segundos % 60;
  return `${minutos}:${String(resto).padStart(2, '0')}`;
}

function construirIndiceBusqueda(canciones) {
  return canciones.map((cancion) => ({ titulo: cancion.titulo, slug: normalizarNombre(cancion.titulo) }));
}

function curarPlaylist(canciones, bpmMin, bpmMax) {
  const validas = canciones.filter(validarCancion);
  const seleccion = filtrarPorBpm(validas, bpmMin, bpmMax);

  return {
    canciones: seleccion.map((cancion) => cancion.titulo),
    duracionTotal: formatearDuracion(calcularDuracionTotal(seleccion)),
    indiceBusqueda: construirIndiceBusqueda(seleccion),
    cancionesInvalidas: canciones.length - validas.length
  };
}

const canciones = [
  { titulo: 'Noche Electrica', genero: 'techno', bpm: 128, duracionSegundos: 245 },
  { titulo: 'Bajo el Sol', genero: 'house', bpm: 122, duracionSegundos: 210 },
  { titulo: 'Ritmo Lento', genero: 'chill', bpm: 90, duracionSegundos: 180 },
  { titulo: 'Vuelo Nocturno', genero: 'trance', bpm: 132, duracionSegundos: 300 }
];

console.log('Caso 1: playlist filtrada entre 120 y 130 bpm');
console.log(curarPlaylist(canciones, 120, 130));

const cancionesConInvalida = [...canciones, { titulo: 'Sin BPM', genero: 'pop', duracionSegundos: 200 }];

console.log('\nCaso 2: incluye una cancion invalida (sin bpm)');
console.log(curarPlaylist(cancionesConInvalida, 100, 140));
