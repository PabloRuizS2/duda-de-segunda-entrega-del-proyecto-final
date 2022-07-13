
class Producto {
  constructor(id,nombre,precio,foto){
      this.id = id
      this.nombre = nombre
      this.precio = precio
      this.foto = foto
  }
}

const productos = []

const obtenerProductos = async () => {
  let response = await fetch("/json/productos.json")
  let data = await response.json()

  data.forEach(ele =>{  
    productos.push(new Producto(ele.id,ele.nombre,ele.precio,ele.foto))
  })
for (const producto of productos) {
   let container = document.createElement("div");
  container.setAttribute("class", "card-product");
  container.innerHTML = ` <div class="img-container">
                            <img src="${producto.foto}" alt="${producto.nombre}" class="img-product"/>
                            </div>
                            <div class="info-producto">
                            <p class="font">${producto.nombre}</p>
                            <strong class="font">$${producto.precio}</strong>
                            <button class="boton" id="btn${producto.id}"> Agregar al carrito </button>
                            </div>`;
  sectionProductos.appendChild(container);
 
  document.getElementById(`btn${producto.id}`).onclick = () => agregarAlCarrito(`${producto.id}`);
}}
obtenerProductos()
let carrito = cargarCarrito();

let sectionProductos = document.getElementById("section-productos");
let sectionCarrito = document.getElementById("section-carrito");


let totalCompra = document.createElement("div");
totalCompra.innerHTML = "<h2>Total: $</h2>";
sectionCarrito.appendChild(totalCompra);

let montoTotalCompra = document.createElement("h2");
montoTotalCompra.innerText = "0";
totalCompra.appendChild(montoTotalCompra);

let cantidadProductos = document.createElement("div");
cantidadProductos.innerHTML = "<h3>Cantidad de productos: </h3>";
sectionCarrito.appendChild(cantidadProductos);

let cantProductos = document.createElement("h3");
cantProductos.innerText = "0";
cantidadProductos.appendChild(cantProductos);

let botonFinalizar = document.createElement("button");
botonFinalizar.innerText = "Finalizar compra";
sectionCarrito.appendChild(botonFinalizar);
botonFinalizar.setAttribute("class", "boton");


botonFinalizar.onclick = () => {
  const precioFinal = montoTotalCompra.innerText;
  
  Swal.fire ({
    title: '¿Seguro que queres finalizar tu compra?',
    text: `Total a abonar: $${precioFinal}`,
    showCancelButton: true,
    confirmButtonColor: '#008f39',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Compra confirmada',
        '¡Que lo disfrutes!',
        'success'
      )
      vaciarCarrito();
    }
  })
}




function agregarAlCarrito(id) {
  carrito.push(productos.find(p => p.id == id));
  localStorage.setItem("carrito", JSON.stringify(carrito));
  calcularTotalCarrito();
}

function calcularTotalCarrito() {
  let total = 0;
  for (const producto of carrito) {
    total += producto.precio;
  }
  montoTotalCompra.innerText = total;
  cantProductos.innerText = carrito.length;
}

function vaciarCarrito() {
  montoTotalCompra.innerText = "0";
  cantProductos.innerText = "0";
  localStorage.clear();
  carrito = [];
}

function cargarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  if (carrito == null) {
    return [];
  } else {
    return carrito;
  }
}