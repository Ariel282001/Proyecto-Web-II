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
