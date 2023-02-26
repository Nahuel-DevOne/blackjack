/** C: clubs (tréboles), D: diamonds (diamantes, H: hearts (corazones), S: spades (espadas) */

/********** Variables y constantes **********/

// Inicializando el deck como un arreglo vacío, como variable let, porque después se va a manipular
let deck = [];
// Creando el array de tipos de cartas
const tipos = ['C', 'D', 'H', 'S'];
// Creando el array con las cartas especiales
const especiales = ['A', 'J', 'Q', 'K'];
// Puntos del jugador
let puntosJugador = 0,
    puntosComputadora = 0; // Puntos de la computadora

/********** Selectores o referencias al HTML **********/
// Selector de btnPedir
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
const puntosHTML = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

// Crea un nuevo deck
const crearDeck = () => {

    for(let i = 2; i <= 10; i++){
        
        for(let tipo of tipos){
            deck.push(i + tipo);
        }
    }

    for(let tipo of tipos) {

        for(let especial of especiales){
            deck.push(especial + tipo)
        }
    }

    // Deck mezclado o barajeado
    deck = _.shuffle(deck)
    console.log(deck);

    return deck;
}

crearDeck()

// Permite tomar una carta
const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'No hay más cartas en el deck';
    }

    const carta = deck.pop();
    
    console.log(deck)
    console.log(carta); // Una carta aleatoria de la baraja
    return carta;
}

// pedirCarta();

const valorCarta = carta => {

    const valor = carta.substring(0, carta.length - 1);
    // Optimizando el código con ternarios
    return (isNaN(valor)) ? 
        (valor === 'A') ? 11 : 10 
        : valor * 1;    
    // let puntos = 0;
    // if ( isNaN(valor) ) {        
    //     puntos = (valor === 'A') ? 11 : 10;
    // } else {
    //     // puntos = Number(valor);
    //     puntos = valor * 1;
    // }
}

// const valor = valorCarta(pedirCarta());
// console.log({valor});

const turnoComputadora = puntosMinimos => {
    
    do {
        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;
        /** <img class="carta" src="assets/cartas/2C.png" alt=""> así es como se debe crear la carta */
        // Creando el elemento img para representar la imagen de la carta
        const imgCarta = document.createElement('img');
        // agregando el atributo src y la clase a la carta
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta')
        // Insertando la carta al contenedor de la computadora
        divCartasComputadora.appendChild(imgCarta);
        // Si el jugador pasó de 21, con una sola carta que la computadora saque, gana.
        if (puntosMinimos > 21) {
            break;
        }
        
    } while ((puntosComputadora < puntosMinimos) && puntosMinimos <= 21)

    setTimeout(() => {
        
        if (puntosComputadora === puntosMinimos){
            alert('¡Empate!');
        } else if (puntosMinimos > 21){
            alert('¡La computadora gana!');
        } else if (puntosComputadora > 21){
            alert('¡Ganaste!');
        } else {
            alert('¡La computadora gana!');
        }
    }, 1000)

}

/********** Eventos **********/
btnPedir.addEventListener('click', () => {
    
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;
    /** <img class="carta" src="assets/cartas/2C.png" alt=""> así es como se debe crear la carta */
    // Creando el elemento img para representar la imagen de la carta
    const imgCarta = document.createElement('img');
    // agregando el atributo src y la clase a la carta
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta')
    // Insertando la carta al contenedor del jugador
    divCartasJugador.appendChild(imgCarta);

    if (puntosJugador > 21) {
        console.warn('Lo siento mucho, perdiste')
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
        console.warn('21, genial!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }

})

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
})

btnNuevo.addEventListener('click', () => {

    console.clear();
    deck = [];
    deck = crearDeck();
    
    puntosJugador = 0;
    puntosComputadora = 0;
    
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;
    
    divCartasJugador.innerText = '';
    divCartasComputadora.innerText = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;
})



