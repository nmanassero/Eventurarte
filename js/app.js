(function () {
  "use strict";

  const WHATSAPP = "5493424457142";
  const CART_KEY = "carrito";

  const $ = (sel) => document.querySelector(sel);
  const byId = new Map(OBRAS.map((o) => [o.id, o]));

  // ---------- Utilidades ----------

  const thumb = (obra) => obra.imagen.replace(/^img\//, "img/thumbs/");

  const formatPrecio = (precio) =>
    precio == null
      ? "Consultar precio"
      : new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(precio);

  const etiqueta = (obra) =>
    obra.estado === "vendida" ? "Vendida" : obra.estado === "proximamente" ? "Próximamente..." : null;

  const sePuedePedir = (obra) => obra.estado !== "vendida";

  const accionPedido = (obra) => (obra.estado === "proximamente" ? "Reservar" : "Pedir");

  function waLink(obras) {
    let texto;
    if (obras.length === 1 && obras[0].estado === "proximamente") {
      texto = `Hola Esther! Vi tu web y me gustaría reservar esta obra:\n- ${obras[0].titulo}\n¿Me pasás precio y disponibilidad?`;
    } else {
      const lista = obras
        .map((o) => `- ${o.titulo}${o.estado === "proximamente" ? " (para reservar)" : ""}`)
        .join("\n");
      const intro = obras.length === 1 ? "me interesa esta obra" : "me interesan estas obras";
      texto = `Hola Esther! Vi tu web y ${intro}:\n${lista}\n¿Me pasás precio y disponibilidad?`;
    }
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
  }

  let toastTimer;
  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
  }

  // ---------- Carrito ----------

  let carrito = [];
  try {
    const guardado = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    if (Array.isArray(guardado)) carrito = guardado;
  } catch (e) {}
  // Descarta obras que ya no existen o que se vendieron
  carrito = carrito.filter((id) => byId.has(id) && sePuedePedir(byId.get(id)));

  function guardarCarrito() {
    try { localStorage.setItem(CART_KEY, JSON.stringify(carrito)); } catch (e) {}
  }

  const enCarrito = (id) => carrito.includes(id);

  function toggleCarrito(id) {
    const obra = byId.get(id);
    if (enCarrito(id)) {
      carrito = carrito.filter((x) => x !== id);
      toast(`Quitaste «${obra.titulo}»`);
    } else {
      carrito.push(id);
      toast(`Agregaste «${obra.titulo}»`);
    }
    guardarCarrito();
    renderCarrito();
    renderGrid();
    if (viewer.open && actual === id) renderViewer();
  }

  function renderCarrito() {
    const count = $("#cart-count");
    count.textContent = carrito.length;
    count.hidden = carrito.length === 0;

    const list = $("#cart-list");
    list.innerHTML = "";
    carrito.forEach((id) => {
      const o = byId.get(id);
      const li = document.createElement("li");
      li.className = "cart-item";
      li.innerHTML = `
        <img src="${thumb(o)}" alt="" loading="lazy">
        <div class="cart-item-text">
          <span class="cart-item-title"></span>
          <span class="cart-item-price">${formatPrecio(o.precio)}</span>
        </div>
        <button class="link-btn" type="button">Quitar</button>`;
      li.querySelector(".cart-item-title").textContent = o.titulo;
      li.querySelector("button").addEventListener("click", () => toggleCarrito(id));
      list.appendChild(li);
    });

    const vacio = carrito.length === 0;
    $("#cart-empty").hidden = !vacio;
    $("#cart-foot").hidden = vacio;
    $("#cart-wa").href = vacio ? "#" : waLink(carrito.map((id) => byId.get(id)));
  }

  // ---------- Portada ----------

  function renderHero() {
    const obra = byId.get(typeof OBRA_DESTACADA !== "undefined" && OBRA_DESTACADA) || OBRAS[0];
    const fig = $("#hero-art");
    fig.innerHTML = `
      <button class="hero-frame" type="button" aria-label="Ver ${obra.titulo} en grande">
        <img src="${thumb(obra)}" alt="${obra.titulo}, pintura de Esther M. Ventura" fetchpriority="high">
      </button>
      <figcaption><em></em> · Obra destacada</figcaption>`;
    fig.querySelector("em").textContent = obra.titulo;
    fig.querySelector("button").addEventListener("click", () => abrirViewer(obra.id));
  }

  // ---------- Galería ----------

  function renderGrid() {
    const grid = $("#grid");
    grid.innerHTML = "";
    OBRAS.forEach((o) => {
      const li = document.createElement("li");
      li.className = "card" + (o.estado === "vendida" ? " is-sold" : "");
      const tag = etiqueta(o);
      li.innerHTML = `
        <button class="card-media" type="button">
          <img src="${thumb(o)}" alt="" loading="lazy" decoding="async">
          ${tag ? `<span class="tag tag-${o.estado}">${tag}</span>` : ""}
          ${enCarrito(o.id) ? `<span class="in-cart" aria-label="En tu selección">✓</span>` : ""}
        </button>
        <div class="card-body">
          <h3 class="card-title"></h3>
          <p class="card-price">${o.estado === "vendida" ? "Vendida" : formatPrecio(o.precio)}</p>
        </div>`;
      li.querySelector(".card-title").textContent = o.titulo;
      li.querySelector("img").alt = o.titulo;
      li.querySelector(".card-media").setAttribute("aria-label", `Ver ${o.titulo} en grande`);
      li.querySelector(".card-media").addEventListener("click", () => abrirViewer(o.id));
      grid.appendChild(li);
    });
  }

  // ---------- Vista ampliada ----------

  const viewer = $("#viewer");
  let actual = null;

  function abrirViewer(id) {
    actual = id;
    renderViewer();
    if (!viewer.open) viewer.showModal();
  }

  function renderViewer() {
    const o = byId.get(actual);
    const img = $("#viewer-img");
    // Muestra primero la miniatura (ya cargada) y después la imagen grande
    img.src = thumb(o);
    img.alt = `${o.titulo}, pintura de Esther M. Ventura`;
    const grande = new Image();
    grande.onload = () => { if (actual === o.id) img.src = o.imagen; };
    grande.src = o.imagen;

    const tag = etiqueta(o);
    const tagEl = $("#viewer-tag");
    tagEl.hidden = !tag;
    tagEl.textContent = tag || "";
    tagEl.className = `tag tag-${o.estado}`;

    $("#viewer-title").textContent = o.titulo;

    const specs = $("#viewer-specs");
    specs.innerHTML = "";
    [["Técnica", o.tecnica], ["Medidas", o.medidas]].forEach(([k, v]) => {
      if (!v) return;
      const dt = document.createElement("dt");
      const dd = document.createElement("dd");
      dt.textContent = k;
      dd.textContent = v;
      specs.append(dt, dd);
    });
    specs.hidden = !specs.children.length;

    $("#viewer-price").textContent = o.estado === "vendida" ? "Esta obra ya fue vendida." : formatPrecio(o.precio);

    const actions = $("#viewer-actions");
    actions.innerHTML = "";
    if (sePuedePedir(o)) {
      const pedir = document.createElement("a");
      pedir.className = "btn btn-primary";
      pedir.href = waLink([o]);
      pedir.target = "_blank";
      pedir.rel = "noopener";
      pedir.textContent = accionPedido(o);
      const agregar = document.createElement("button");
      agregar.type = "button";
      agregar.className = "btn btn-ghost";
      agregar.textContent = enCarrito(o.id) ? "Quitar de mi selección" : "Agregar a mi selección";
      agregar.addEventListener("click", () => toggleCarrito(o.id));
      actions.append(pedir, agregar);
    }
  }

  function mover(delta) {
    const i = OBRAS.findIndex((o) => o.id === actual);
    abrirViewer(OBRAS[(i + delta + OBRAS.length) % OBRAS.length].id);
  }

  $("#viewer-close").addEventListener("click", () => viewer.close());
  $("#viewer-prev").addEventListener("click", () => mover(-1));
  $("#viewer-next").addEventListener("click", () => mover(1));
  viewer.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") mover(-1);
    if (e.key === "ArrowRight") mover(1);
  });

  // Deslizar con el dedo para pasar de obra
  let touchX = null;
  const media = $(".viewer-media");
  media.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  media.addEventListener("touchend", (e) => {
    if (touchX == null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 50) mover(dx < 0 ? 1 : -1);
  });

  // ---------- Diálogos: cerrar tocando afuera ----------

  const cart = $("#cart");
  [viewer, cart].forEach((d) =>
    d.addEventListener("click", (e) => { if (e.target === d) d.close(); })
  );
  $("#cart-open").addEventListener("click", () => { renderCarrito(); cart.showModal(); });
  $("#cart-close").addEventListener("click", () => cart.close());
  $("#cart-clear").addEventListener("click", () => {
    carrito = [];
    guardarCarrito();
    renderCarrito();
    renderGrid();
  });

  // ---------- Tema claro / oscuro ----------

  const root = document.documentElement;
  const sistemaOscuro = window.matchMedia("(prefers-color-scheme: dark)");
  const temaActual = () => root.dataset.theme || (sistemaOscuro.matches ? "dark" : "light");
  $("#theme-toggle").addEventListener("click", () => {
    const nuevo = temaActual() === "dark" ? "light" : "dark";
    root.dataset.theme = nuevo;
    try { localStorage.setItem("tema", nuevo); } catch (e) {}
  });

  // ---------- Inicio ----------

  $("#year").textContent = new Date().getFullYear();
  renderHero();
  renderGrid();
  renderCarrito();
})();
