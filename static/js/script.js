const socket = io() // Inicia la conexion

// Evento clic en el boton de guardar nuevo producto
document.querySelector('button')?.addEventListener('click', (e) => {
  try {
    // obtiene los valores de los input
    const prodTitulo = document.getElementById('prodTitulo').value
    const prodDesc = document.getElementById('prodDesc').value
    const prodCodigo = document.getElementById('prodCodigo').value
    const prodPrecio = document.getElementById('prodPrecio').value
    const prodStock = document.getElementById('prodStock').value
    const prodCategoria = document.getElementById('prodCategoria').value
    // Verifica que todos los campos contengan datos
    if (!prodTitulo || !prodDesc || !prodCodigo || !prodPrecio || !prodStock || !prodCategoria) throw new Error('Todos los campos son obligatorios')
    // Crea un objeto de salida con los valores de los campos
    const nuevoProducto = {
      title: prodTitulo,
      description: prodDesc,
      code: prodCodigo,
      price: parseFloat(prodPrecio),
      stock: parseInt(prodStock),
      category: prodCategoria
    }
    // Envia al servidor el producto agregado y recibe un callback con la respuesta
    socket.emit('agregarProducto', nuevoProducto, (response) => {
      // Si el callback se recibe con status OK, el producto fue agregado
      if (response.status.status === 'Ok') {
        // Notifica al cliente que el producto se agregó de forma correcta
        Toastify({
          text: "El producto fue agregado",
          className: "apply",
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          }
        }).showToast();
        // Limpia los input del DOM
        document.getElementById('prodTitulo').value = ''
        document.getElementById('prodDesc').value = ''
        document.getElementById('prodCodigo').value = ''
        document.getElementById('prodPrecio').value = ''
        document.getElementById('prodStock').value = ''
        document.getElementById('prodCategoria').value = ''
      } else {
        // El callback se recibe con status ERROR. Se notifica al cliente
        Toastify({
          text: response.status.message,
          className: "error",
          close: true,
          style: {
            background: "linear-gradient(to right, #F5B2A4, #ED0606)",
          }
        }).showToast();
      }
    })


  } catch (err) {
    // Evento de error que se dispara si alguno de los campos no esta completo
    Toastify({
      text: err.message,
      className: "info",
      close: true,
      style: {
        background: "linear-gradient(to right, #F5B2A4, #ED0606)",
      }
    }).showToast();
  }
})

// Maneja el evento ACTUALIZACIÓN que se dispara cuando algún cliente crea un nuevo producto, o cuando se conecta
socket.on('actualizacion', ({ productos }) => {
  const tabla = document.querySelector('#productsTable')
  tabla.innerHTML = ''
  for (const producto of productos) {
    const fila = document.createElement('tr')
    fila.innerHTML = `
        <th scope="row">${producto.id}</th>
        <td>${producto.title}</td>
        <td>${producto.description}</td>
        <td>${producto.code}</td>
        <td>${producto.price}</td>
        <td>${producto.stock}</td>
        <td>${producto.category}</td>
        `
    tabla.appendChild(fila)
  }
})