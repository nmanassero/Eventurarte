# EVenturArte — web de Esther M. Ventura

Web estática (HTML/CSS/JS, sin backend) para mostrar y vender las pinturas de Esther M. Ventura.
Los pedidos se hacen por WhatsApp.

## Estructura

```
index.html        Página única: portada, obras, sobre mí, contacto
css/styles.css    Estilos (modo claro/oscuro)
js/obras.js       Catálogo de obras  ← lo que más se edita
js/app.js         Galería, vista ampliada, carrito y WhatsApp
img/              Imágenes grandes (originales del blog)
img/thumbs/       Miniaturas de 900 px para la grilla
```

## Editar obras

Todo está en `js/obras.js`. Cada obra tiene:

| campo     | valores                                                     |
|-----------|-------------------------------------------------------------|
| `tecnica` | texto o `null` (si es `null` no se muestra)                 |
| `medidas` | texto o `null` (si es `null` no se muestra)                 |
| `precio`  | número en pesos (ej. `150000`) o `null` → "Consultar precio" |
| `estado`  | `"disponible"`, `"vendida"` o `"proximamente"`              |

- `"proximamente"`: muestra la etiqueta "Próximamente..." y el botón dice "Reservar".
- `"vendida"`: muestra "Vendida" y no se puede pedir.
- La obra de la portada se elige con `OBRA_DESTACADA`.

El texto de "Sobre mí" es **provisorio**: buscá el comentario `TEXTO PROVISORIO` en `index.html`.

## Ver localmente

Doble clic en `index.html`, o con un servidor local:

```
python3 -m http.server 8000
```

y abrir http://localhost:8000
