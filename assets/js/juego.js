/** Esta forma no es eficiente */
// 'red_back.png'
// '2C.png'
// '2D.png'
// '2H.png'
// '2S.png'
// '3C.png'
// '3D.png'
// '3H.png'
// '3S.png'
// '4C.png'
// '4D.png'
// '4H.png'
// '4S.png'
// '5C.png'
// '5D.png'
// '5H.png'
// '5S.png'
// '6C.png'
// '6D.png'
// '6H.png'
// '6S.png'
// '7C.png'
// '7D.png'
// '7H.png'
// '7S.png'
// '8C.png'
// '8D.png'
// '8H.png'
// '8S.png'
// '9C.png'
// '9D.png'
// '9H.png'
// '9S.png'
// '10C.png'
// '10D.png'
// '10H.png'
// '10S.png'
// 'AC.png'
// 'AD.png'
// 'AH.png'
// 'AS.png'
// 'grey_back.png'
// 'JC.png'
// 'JD.png'
// 'JH.png'
// 'JS.png'
// 'KC.png'
// 'KD.png'
// 'KH.png'
// 'KS.png'
// 'QC.png'
// 'QD.png'
// 'QH.png'
// 'QS.png'

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

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

    console.log(deck);

    deck = _.shuffle(deck)
    console.log(deck);

    return deck;
}

crearDeck()

