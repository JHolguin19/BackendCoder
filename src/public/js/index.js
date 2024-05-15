const socketClient = io();
let productIdCounter = 1;

socketClient.on('saludosdesdelback', (message)=>{
    console.log(message)

    socketClient.emit('respuestadesdefront', 'saludando desde el front')
})

const form = document.getElementById('form')
const inputName = document.getElementById('nombre')
const inputPrice = document.getElementById('price')
const inputCategoria= document.getElementById('categoria')
const inputUrl= document.getElementById('url')
const inputCantidad= document.getElementById('cantidad')
const inputDescripcion= document.getElementById('descripcion')
const inputProducts = document.getElementById('products')

form.onsubmit = (e) => {
    e.preventDefault();
    const name = inputName.value;
    const price = inputPrice.value;
    const categoria = inputCategoria.value;
    const descripcion = inputDescripcion.value;
    const url = inputUrl.value;
    const cantidad = inputCantidad.value;
    const id = productIdCounter++;
    const product = {
        id,
        name, 
        price,
        cantidad,
        categoria,
        descripcion,
        url
    }
    socketClient.emit('NewProduct', product)
}

socketClient.on('product', (arraypro)=>{
    let infoproducts = '';
    arraypro.map((prod)=>{
        infoproducts +=`<img src="${prod.url}" alt="Producto">  </br> 
        nombre:${prod.name} </br>
        Categoria: ${prod.categoria} </br>
        Descripción: ${prod.descripcion} </br>
        Precio: $${prod.price} </br> 
        Cantidad: ${prod.cantidad} </br>
        id:${prod.id}
        `
    })
    
    inputProducts.innerHTML = infoproducts
    console.log(arraypro)
})


const inputId = document.getElementById("idEliminar")


formEliminar.onsubmit = (e) =>{
    e.preventDefault(); 
    const idE = parseInt(inputId.value);
    socketClient.emit('deletePro', idE);
};