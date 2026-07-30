// 14. Catalogo de peliculas de miedo - Resolucion Maria Montepeque

function validarPelicula(pelicula) {
  return (
    pelicula &&
    typeof pelicula.titulo === 'string' &&
    typeof pelicula.subgenero === 'string' &&
    typeof pelicula.nivelSusto === 'number' &&
    pelicula.nivelSusto >= 1 &&
    pelicula.nivelSusto <= 10 &&
    typeof pelicula.duracionMinutos === 'number' &&
    pelicula.duracionMinutos > 0
  );
}

function filtrarPorDuracionMaxima(peliculas, duracionMaxima) {
  return peliculas.filter((pelicula) => pelicula.duracionMinutos <= duracionMaxima);
}

function ordenarPorSusto(peliculas) {
  return [...peliculas].sort((a, b) => b.nivelSusto - a.nivelSusto);
}

function coincideSubgenero(pelicula, subgenerosPreferidos) {
  return subgenerosPreferidos.includes(pelicula.subgenero);
}

function resumenPelicula(pelicula) {
  return {
    titulo: pelicula.titulo,
    subgenero: pelicula.subgenero,
    nivelSusto: pelicula.nivelSusto,
    duracionMinutos: pelicula.duracionMinutos
  };
}

function recomendarPeliculas(peliculas, { duracionMaxima, subgenerosPreferidos, cantidad = 3 }) {
  const validas = peliculas.filter(validarPelicula);
  const dentroDeDuracion = filtrarPorDuracionMaxima(validas, duracionMaxima);
  const preferidas = dentroDeDuracion.filter((pelicula) => coincideSubgenero(pelicula, subgenerosPreferidos));
  const candidatas = preferidas.length > 0 ? preferidas : dentroDeDuracion;

  return {
    recomendaciones: ordenarPorSusto(candidatas).slice(0, cantidad).map(resumenPelicula),
    coincidenciasPreferencia: preferidas.length,
    peliculasInvalidas: peliculas.length - validas.length
  };
}

const catalogo = [
  { titulo: 'Sombras del Atico', subgenero: 'sobrenatural', nivelSusto: 8, duracionMinutos: 95 },
  { titulo: 'Cabina 13', subgenero: 'slasher', nivelSusto: 6, duracionMinutos: 88 },
  { titulo: 'El Bosque Callado', subgenero: 'sobrenatural', nivelSusto: 9, duracionMinutos: 110 },
  { titulo: 'Ultimo Turno', subgenero: 'psicologico', nivelSusto: 7, duracionMinutos: 100 }
];

console.log('Caso 1: recomendacion con preferencia disponible en el catalogo');
console.log(
  recomendarPeliculas(catalogo, { duracionMaxima: 100, subgenerosPreferidos: ['sobrenatural'], cantidad: 2 })
);

console.log('\nCaso 2: preferencia sin coincidencias, usa el resto del catalogo como respaldo');
console.log(
  recomendarPeliculas(catalogo, { duracionMaxima: 100, subgenerosPreferidos: ['found-footage'], cantidad: 2 })
);
