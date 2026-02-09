/* =========================
   UTILIDADES
========================= */

// Obtener objetos guardados
function getObjetos() {
  return JSON.parse(localStorage.getItem('recuperaObjetos')) || [];
}

// Guardar objetos
function saveObjetos(data) {
  localStorage.setItem('recuperaObjetos', JSON.stringify(data));
}

// Generar código único
function generarCodigo(categoria) {
  const random = Math.floor(1000 + Math.random() * 9000);
  return categoria.substring(0, 3).toUpperCase() + "-" + random;
}

/* =========================
   RENDER DE CARDS
========================= */
function renderObjetos(categoria = null) {
  const contenedor = document.getElementById('cards-container');
  if (!contenedor) return;

  contenedor.innerHTML = "";
  const objetos = getObjetos();

  objetos
    .filter(obj => !categoria || obj.categoria === categoria)
    .forEach(obj => {
      contenedor.innerHTML += `
        <div class="card">
          <img src="${obj.imagen}" alt="Objeto perdido">
          <div class="card-body">
            <h4>${obj.categoria}</h4>
            <p>${obj.descripcion}</p>
            <div class="code">${obj.codigo}</div>
          </div>
        </div>
      `;
    });
}

/* =========================
   BUSCADOR
========================= */
function buscarCodigo() {
  const input = document.getElementById('buscarCodigo').value.trim();
  const objetos = getObjetos();
  const resultado = objetos.filter(o => o.codigo === input);
  localStorage.setItem('busquedaResultado', JSON.stringify(resultado));
  window.location.href = "index.html";
}

/* =========================
   ADMIN
========================= */
function guardarObjeto(e) {
  e.preventDefault();

  const categoria = document.getElementById('categoria').value;
  const descripcion = document.getElementById('descripcion').value;
  const imagenInput = document.getElementById('imagen');

  const reader = new FileReader();
  reader.onload = function () {
    const objetos = getObjetos();
    objetos.push({
      categoria,
      descripcion,
      imagen: reader.result,
      codigo: generarCodigo(categoria)
    });
    saveObjetos(objetos);
    alert("Objeto guardado correctamente");
    e.target.reset();
  };

  reader.readAsDataURL(imagenInput.files[0]);
}
