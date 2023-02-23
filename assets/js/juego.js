/** C: clubs (tréboles), D: diamonds (diamantes, H: hearts (corazones), S: spades (espadas) */

// Inicializando el deck como un arreglo vacío, como variable let, porque después se va a manipular
let deck = [];
// Creando el array de tipos de cartas
const tipos = ['C', 'D', 'H', 'S'];
// Creando el array con las cartas especiales
const especiales = ['A', 'J', 'Q', 'K'];
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

pedirCarta();



