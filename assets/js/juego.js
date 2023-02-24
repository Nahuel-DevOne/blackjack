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
const puntosHTML = document.querySelectorAll('small')

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
    // Deck ordenado, sin barajear
    // console.log(deck);

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

/********** Eventos **********/
btnPedir.addEventListener('click', () => {
    
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;
})


