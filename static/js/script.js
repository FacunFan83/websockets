const socket = io()

document.querySelector('button').addEventListener('click', (e) => {
    try {
        const prodTitulo = document.getElementById('prodTitulo').value
        const prodDesc = document.getElementById('prodDesc').value
        const prodCodigo = document.getElementById('prodCodigo').value
        const prodPrecio = document.getElementById('prodPrecio').value
        const prodStock = document.getElementById('prodStock').value
        const prodCategoria = document.getElementById('prodCategoria').value
        if (!prodTitulo || !prodDesc || !prodCodigo || !prodPrecio || !prodStock || !prodCategoria) throw new Error('Todos los campos son obligatorios')
        const nuevoProducto = {
            title: prodTitulo,
            description: prodDesc,
            code: prodCodigo,
            price: parseFloat(prodPrecio),
            stock: parseInt(prodStock),
            category: prodCategoria
        }
        socket.emit('agregarProducto', nuevoProducto, (response) => {
            console.log(response.status)
            if (response.status.status === 'Ok') {
                Toastify({
                    text: "El producto fue agregado",
                    className: "apply",
                    style: {
                      background: "linear-gradient(to right, #00b09b, #96c93d)",
                    }
                  }).showToast();
                  document.getElementById('prodTitulo').value = ''
                  document.getElementById('prodDesc').value = ''
                  document.getElementById('prodCodigo').value = ''
                  document.getElementById('prodPrecio').value = ''
                  document.getElementById('prodStock').value = ''
                  document.getElementById('prodCategoria').value = ''
            } else {
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