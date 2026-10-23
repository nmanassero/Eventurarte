/*
 * Catálogo de obras de Esther M. Ventura.
 *
 * Para editar una obra, cambiá sus campos:
 *   tecnica  -> texto, ej. "Óleo sobre tela"        (null = no se muestra)
 *   medidas  -> texto, ej. "50 x 70 cm"             (null = no se muestra)
 *   precio   -> número en pesos, ej. 150000         (null = "Consultar precio")
 *   estado   -> "disponible" | "vendida" | "proximamente"
 *
 * Para agregar una obra: copiá un bloque, poné un id nuevo (sin espacios ni
 * tildes), guardá la imagen grande en img/ y una miniatura en img/thumbs/.
 *
 * La obra destacada de la portada se elige con OBRA_DESTACADA (su id).
 */
const OBRA_DESTACADA = "la-campina";

const OBRAS = [
  { id: "la-campina",                   titulo: "La Campiña",                   imagen: "img/la-campina.jpg",                   tecnica: null, medidas: null, precio: null, estado: "disponible" },
  { id: "inmensidad-de-la-naturaleza",  titulo: "Inmensidad de la Naturaleza",  imagen: "img/inmensidad-de-la-naturaleza.jpg",  tecnica: null, medidas: null, precio: null, estado: "disponible" },
  { id: "paseo-en-bote",                titulo: "Paseo en Bote",                imagen: "img/paseo-en-bote.jpg",                tecnica: null, medidas: null, precio: null, estado: "disponible" },
  { id: "a-traves-de-la-ola",           titulo: "A Través de la Ola",           imagen: "img/a-traves-de-la-ola.jpg",           tecnica: null, medidas: null, precio: null, estado: "disponible" },
  { id: "la-vieja-estacion",            titulo: "La Vieja Estación",            imagen: "img/la-vieja-estacion.jpg",            tecnica: null, medidas: null, precio: null, estado: "disponible" },
  { id: "dolor",                        titulo: "Dolor",                        imagen: "img/dolor.jpg",                        tecnica: null, medidas: null, precio: null, estado: "disponible" },
  { id: "reivindicacion-de-la-belleza", titulo: "Reivindicación de la Belleza", imagen: "img/reivindicacion-de-la-belleza.jpg", tecnica: null, medidas: null, precio: null, estado: "disponible" },
  { id: "morgan",                       titulo: "Morgan",                       imagen: "img/morgan.jpg",                       tecnica: null, medidas: null, precio: null, estado: "disponible" },
  { id: "mahatma",                      titulo: "Mahatma",                      imagen: "img/mahatma.jpg",                      tecnica: null, medidas: null, precio: null, estado: "disponible" },
  { id: "la-inocencia",                 titulo: "La Inocencia",                 imagen: "img/la-inocencia.jpg",                 tecnica: null, medidas: null, precio: null, estado: "disponible" },
  { id: "seduccion",                    titulo: "Seducción",                    imagen: "img/seduccion.jpg",                    tecnica: null, medidas: null, precio: null, estado: "disponible" },
  { id: "nobleza",                      titulo: "Nobleza",                      imagen: "img/nobleza.jpg",                      tecnica: null, medidas: null, precio: null, estado: "disponible" },
  { id: "penelope",                     titulo: "Penélope",                     imagen: "img/penelope.jpg",                     tecnica: null, medidas: null, precio: null, estado: "disponible" },
];
