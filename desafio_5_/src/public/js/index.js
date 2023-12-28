const socketClient = io();
//PENDIENTE 2: ENTENDER ESTOTRO

//escuchando al evento
//recivo un cb donde llamo al segundo evento/msj
socketClient.on('saludoDesdeBack', (msg)=>{
    console.log(msg);

    socketClient.emit('respuestaDesdeFront', 'Muchas gracias')

})

const form = document.getElementById('form');
const inputName = document.getElementById('name');
const inputPrice = document.getElementById('price');
const products = document.getElementById('products');

//cuando se ejecute el submit se va a fabricar el objeto y sera enviado al servidor
//el evento que emito lo escucho siempre con el mismo nombre
form.onsubmit = (e) => {
    e.preventDefault();
    const name = inputName.value;
    const price = inputPrice.value;
    const product = {name, price};
    socketClient.emit('newProduct', product);
    //esto es para reseatear esa parte de name y price una vez que el producto fue agregado
    inputName.value = ''
    inputPrice.value = ''
};

//el evento de products de server es recibido aca
//recibo el array, lo guardo en una variable y 
//voy obteniendo el nombre y precio de cada producto
//y luego voy mostrando el nombre y precio guardados en la variable infoProducts
socketClient.on('arrayProducts', (productsArray) => {
    let infoProducts = '';
    productsArray.forEach( p=> {
        infoProducts += `${p.name} - $${p.price}- </br>`
    })
    //esto es para que se muestre en html
    products.innerHTML = infoProducts
})
//conexion desde socket http parte 2
//aca es donde queda capturado el msg enviado de server
socketClient.on('message', (msg) => {
    console.log(msg);
})