let pagina = 1;

const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

btnSiguiente.addEventListener("click", () => {
  if (pagina < 1000) {
    pagina += 1;
    cargarPelicula();
  }
});

btnAnterior.addEventListener("click", () => {
  if (pagina > 1) {
    pagina -= 1;
    cargarPelicula();
  }
});

const cargarPelicula = async () => {
  try {
    const respuesta = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=d03fd469dc44313a499e5a78d0af2d6c&language=en-US&page=${pagina}`
    );
    console.log(respuesta);

    if (respuesta.status === 200) {
      const datos = await respuesta.json();

      let peliculas = "";
      datos.results.forEach((element) => {
        peliculas += `
		<div class="pelicula">
		<img class="poster" src="https://image.tmdb.org/t/p/w400/${element.poster_path}">
		<h3>${element.title}</h3>
		</div>
		
		
		
		
		`;
      });
      document.getElementById("contenedor").innerHTML = peliculas;
    } else if (respuesta.status === 401) {
      console.log("Puesistes mal la llave");
    } else if (respuesta.status === 404) {
      console.log("La pelicula no existe");
    } else {
      console.log("No funciona");
    }
  } catch (err) {
    console.log(err);
  }
};

cargarPelicula();
