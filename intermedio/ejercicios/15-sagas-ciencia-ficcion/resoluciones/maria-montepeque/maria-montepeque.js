// 15. Analizador de sagas sci-fi - Resolucion Maria Montepeque

function validarPelicula(pelicula) {
  return (
    pelicula &&
    typeof pelicula.titulo === 'string' &&
    typeof pelicula.faccion === 'string' &&
    Array.isArray(pelicula.planetas) &&
    pelicula.planetas.length > 0
  );
}

function buscarPorFaccion(peliculas, faccion) {
  return peliculas.filter((pelicula) => pelicula.faccion === faccion).map((pelicula) => pelicula.titulo);
}

function contarAparicionesPorPlaneta(peliculas) {
  return peliculas.reduce((conteo, pelicula) => {
    pelicula.planetas.forEach((planeta) => {
      conteo[planeta] = (conteo[planeta] ?? 0) + 1;
    });
    return conteo;
  }, {});
}

function planetaMasVisitado(conteoPlanetas) {
  const entradas = Object.entries(conteoPlanetas);
  if (entradas.length === 0) return null;
  const [planeta, apariciones] = entradas.reduce((mejor, actual) => (actual[1] > mejor[1] ? actual : mejor));
  return { planeta, apariciones };
}

function listarFacciones(peliculas) {
  return [...new Set(peliculas.map((pelicula) => pelicula.faccion))];
}

function analizarSaga(peliculas, faccionBuscada) {
  const validas = peliculas.filter(validarPelicula);
  const conteoPlanetas = contarAparicionesPorPlaneta(validas);

  return {
    peliculasDeFaccion: buscarPorFaccion(validas, faccionBuscada),
    resumenUniverso: {
      totalPeliculas: validas.length,
      facciones: listarFacciones(validas),
      apariciones: conteoPlanetas,
      planetaMasVisitado: planetaMasVisitado(conteoPlanetas)
    },
    peliculasInvalidas: peliculas.length - validas.length
  };
}

const saga = [
  { titulo: 'El Despertar de Kryos', faccion: 'alianza', planetas: ['Kryos', 'Nebula IX'] },
  { titulo: 'Sombra de Nebula IX', faccion: 'imperio', planetas: ['Nebula IX'] },
  { titulo: 'El Ultimo Bastion', faccion: 'alianza', planetas: ['Kryos', 'Terranova'] },
  { titulo: 'Caida del Imperio', faccion: 'imperio', planetas: ['Terranova', 'Nebula IX'] }
];

console.log('Caso 1: peliculas de la faccion "alianza"');
console.log(analizarSaga(saga, 'alianza'));

const sagaConInvalida = [...saga, { titulo: 'Pelicula sin planetas', faccion: 'rebeldes', planetas: [] }];

console.log('\nCaso 2: incluye una pelicula invalida (sin planetas)');
console.log(analizarSaga(sagaConInvalida, 'imperio'));
