import { obtenerComic } from "./api.js";

const contenedor = document.getElementById("detalle-comic");
const mensaje = document.getElementById("mensaje");

const formatoPeso = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0
});

function crearElemento(etiqueta, texto, clase) {
  const elemento = document.createElement(etiqueta);
  elemento.textContent = texto;
  if (clase) elemento.className = clase;
  return elemento;
}

function mostrarError(texto) {
  mensaje.textContent = texto;
  mensaje.className = "mensaje error";
  mensaje.hidden = false;
}

function renderDetalle(comic) {
  contenedor.replaceChildren(
    crearElemento("h2", comic.titulo),
    crearElemento("p", `Autor: ${comic.autor?.nombre ?? "Desconocido"}`),
    crearElemento("p", `Nacionalidad: ${comic.autor?.nacionalidad ?? "No registrada"}`),
    crearElemento("p", `Editorial: ${comic.editorial ?? "No registrada"}`),
    crearElemento("p", `Año de publicación: ${comic.anioPublicacion ?? "No registrado"}`),
    crearElemento("p", formatoPeso.format(comic.precio), "precio"),
    crearElemento("p", `Stock disponible: ${comic.stock}`)
  );
}

async function iniciar() {
  // Lee el id de la URL: detalle.html?id=XXXX
  const id = new URLSearchParams(window.location.search).get("id");

  if (!id) {
    mostrarError("No se indicó el cómic a consultar");
    return;
  }

  try {
    const comic = await obtenerComic(id);
    renderDetalle(comic);
  } catch (error) {
    mostrarError(error.message);
  }
}

iniciar();