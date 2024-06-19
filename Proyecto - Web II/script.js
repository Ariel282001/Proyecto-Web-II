console.log("Página cargada correctamente");

document.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById('about-page');
    var ctx = canvas.getContext('2d');

    // Definir las imágenes y nombres de los jugadores
    var players = [
        { name: 'Chris Paul', image: 'IMGs/ChrisPaul.jpg' },
        { name: 'Jonathan Kuminga', image: 'IMGs/JonathanKuminga.jpg' },
        { name: 'Moses Moody', image: 'IMGs/MosesMoody.jpg' },
        { name: 'Trayce Jackson', image: 'IMGs/TrayceJackson.jpg' },
        { name: 'Usman Garuba', image: 'IMGs/UsmanGaruba.jpg' }
    ];

    // Cargar imágenes y esperar a que todas estén cargadas antes de comenzar la animación
    Promise.all(players.map(loadImage))
        .then(startAnimation)
        .catch(function(err) {
            console.error('Error al cargar imágenes:', err);
        });

    var currentIndex = 0;
    var scrollSpeed = 3;
    var isScrollingUp = false;
    var isScrollingDown = false;

    // Manejar clics en el canvas para cambiar las imágenes
    canvas.addEventListener('click', function(event) {
        var clickY = event.clientY - canvas.getBoundingClientRect().top;
        isScrollingUp = (clickY < canvas.height / 2) && currentIndex > 0;
        isScrollingDown = (clickY >= canvas.height / 2) && currentIndex < players.length - 1;

        if (isScrollingUp) currentIndex--;
        if (isScrollingDown) currentIndex++;
    });

    // Función para cargar una imagen y devolver una promesa
    function loadImage(player) {
        return new Promise(function(resolve, reject) {
            var img = new Image();
            img.onload = function() {
                player.img = img; // Almacenar la imagen cargada en el objeto del jugador
                resolve();
            };
            img.onerror = reject;
            img.src = player.image;
        });
    }

    // Iniciar la animación
    function startAnimation() {
        requestAnimationFrame(animate);
    }

    // Función de animación principal
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dibujar la imagen centrada en el canvas
        var currentImage = players[currentIndex];
        var img = currentImage.img;
        var x = canvas.width / 3 - img.width / 3;
        var y = canvas.height / 3 - img.height / 3;

        ctx.drawImage(img, x, y);

        // Configurar el estilo del texto
        ctx.fillStyle = 'black';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';

        // Dibujar el nombre del jugador sobre la imagen
        ctx.fillText(currentImage.name, canvas.width / 2, y + img.height + 10);

        // Solicitar el siguiente frame de animación
        requestAnimationFrame(animate);
    }
});









/*MODAL*/
// Variables globales para el carrito
let cartItems = [];
let cartTotal = 0;

// Función para agregar un producto al carrito
function addToCart(productName, productPrice) {
    cartItems.push({ name: productName, price: productPrice });
    cartTotal += productPrice;
    renderCart();

    // Mostrar mensaje de alerta
    alert(`Se agregó "${productName}" al carrito.`);
}

// Función para vaciar el carrito
function clearCart() {
    cartItems = [];
    cartTotal = 0;
    renderCart();
}

// Función para renderizar el carrito
function renderCart() {
    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = '';
    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartList.appendChild(li);
    });
    document.getElementById('cart-total').textContent = `$${cartTotal}`;

    // Mostrar el modal del carrito al agregar un producto
    /*document.getElementById('cart-modal').style.right = '0';*/
}

// Función para cerrar el modal
document.getElementsByClassName('close')[0].addEventListener('click', function() {
    document.getElementById('cart-modal').style.right = '-400px';
});

// Función para abrir el modal al hacer clic en "Abrir Carrito"
document.getElementById('open-cart').addEventListener('click', function() {
    document.getElementById('cart-modal').style.right = '0';
});






/*MODAL DE MOSTRAR INFO DE PRODCUTOS*/
// Función para abrir el modal y mostrar la descripción del producto
function openModal(title, description) {
    const modal = document.getElementById('producto-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    
    modal.style.display = 'flex'; // Mostrar el modal
}

// Función para cerrar el modal
function closeModal() {
    const modal = document.getElementById('producto-modal');
    modal.style.display = 'none'; // Ocultar el modal
}

// Cerrar modal haciendo clic fuera del contenido
window.onclick = function(event) {
    const modal = document.getElementById('producto-modal');
    if (event.target == modal) {
        modal.style.display = 'none'; // Ocultar el modal si se hace clic fuera de él
    }
}