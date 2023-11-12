function get() {
    fetch('/api/productos')
        .then(resp => resp.json())
        .then(resp => {
            console.log(resp)
            const tabla = document.querySelector('#productsTable')
            tabla.innerHTML = ''
            for (const producto of resp) {
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
}

get()
