/** C: clubs (tréboles), D: diamonds (diamantes, H: hearts (corazones), S: spades (espadas) */

/** Patrón módulo, o función anónima autoinvocada IIFE:
 * está ubicado en algún lugar de memoria, sin identificador por nombre
 * Sirve para proteger el código
 * Optimized code, done
 * */
const miModulo = (() => {
  "use strict";
  /********** Variables y constantes **********/
  // Inicializando el deck como un arreglo vacío, como variable let, porque después se va a manipular
  let deck = [];
  // Creando el array de tipos de cartas
  const tipos = ["C", "D", "H", "S"],
        // Creando el array con las cartas especiales
        especiales = ["A", "J", "Q", "K"];
  // Puntos de los jugadores
  let puntosJugadores = [];

  /********** Selectores o referencias al HTML **********/
  const btnPedir = document.querySelector("#btnPedir"),
        btnDetener = document.querySelector("#btnDetener"),
        btnNuevo = document.querySelector("#btnNuevo");
  
  const puntosHTML = document.querySelectorAll("small");
  const divCartasJugadores = document.querySelectorAll('.divCartas')
        

  // Esta función inicialize  el juego
  const inicializarJuego = ( numJugadores = 2 ) => {    
    deck = crearDeck();
    puntosJugadores = [];
    
    for(let i = 0; i < numJugadores; i++){
      puntosJugadores.push(0);
    }

    puntosHTML.forEach( elem => elem.innerText = 0 );
    divCartasJugadores.forEach( elem => elem.innerHTML = '' );

    btnPedir.disabled   = false;
    btnDetener.disabled = false;
  }      

  // Crea un nuevo deck
  const crearDeck = () => {

    deck = [];

    for (let i = 2; i <= 10; i++) {
      for (let tipo of tipos) {
        deck.push(i + tipo);
      }
    }

    for (let tipo of tipos) {
      for (let especial of especiales) {
        deck.push(especial + tipo);
      }
    }

    // Retornando el Deck mezclado o barajeado
    return _.shuffle(deck);
  };

  // Permite tomar una carta
  const pedirCarta = () => {
    if (deck.length === 0) {
      throw "No hay más cartas en el deck";
    }
    return deck.pop();
  };

  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    // Optimizando el código con ternarios
    return isNaN(valor) ? 
            (valor === "A") ? 11 : 10 
            : valor * 1;
  };

  // Turno: 0 = primer jugador y el último va a ser la computadora
  const acumularPuntos = ( carta, turno ) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    puntosHTML[turno].innerText = puntosJugadores[turno];

    return puntosJugadores[turno];
  }

  const crearCarta = (carta, turno) => {
    // Creando el elemento img para representar la imagen de la carta
    const imgCarta = document.createElement("img");
    // agregando el atributo src y la clase a la carta
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    // Insertando la carta al contenedor correspondiente
    divCartasJugadores[turno].append(imgCarta);
  }

  // Determina el ganador
  const determinarGanador = () => {

    const [puntosMinimos, puntosComputadora] = puntosJugadores;

    setTimeout(() => {
      if (puntosComputadora === puntosMinimos) {
        alert("¡Empate!");
      } else if (puntosMinimos > 21) {
        alert("¡La computadora gana!");
      } else if (puntosComputadora > 21) {
        alert("¡Ganaste!");
      } else {
        alert("¡La computadora gana!");
      }
    }, 500);


  }

  // turno de la computadora
  const turnoComputadora = (puntosMinimos) => {

    let puntosComputadora = 0;

    do {
      const carta = pedirCarta();
      puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
      crearCarta(carta, puntosJugadores.length - 1);
      
    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    determinarGanador();
  };

  /********** Eventos **********/
  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();
    const puntosJugador = acumularPuntos(carta, 0);
    // Creando el elemento img para representar la imagen de la carta
    crearCarta(carta, 0)

    if (puntosJugador > 21) {
      console.warn("Lo siento mucho, perdiste");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
      console.warn("21, genial!");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    }
  });

  btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugadores[0]);
  });

  // btnNuevo.addEventListener("click", () => {
  //   console.clear();
  //   inicializarJuego();
  // });

  return {
    nuevoJuego: inicializarJuego
  };

})();
