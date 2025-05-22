const turn = document.getElementById('turn');
//---------futuro lo de selectiong---------
const squares = document.querySelectorAll(".square");
const container = Array.from(squares);
const clearBoard = document.getElementById('clearBoard');
const posicionesGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let juego = 'ON';
let cont = 0;

const controlarJugabilidad = (cell) => {
    //Verifica si nadi gano aun
    if (juego == 'OFF') return;

    //Si el boton no esta vacio no agregar texto.
    if (cell.innerText !== "") return;

    //Turno de X u O
    ponerSimbolo(cell);

    const ganador = verificarGanador();
    if (ganador) {
        console.log("Gano: " + ganador);
    }
}

const ponerSimbolo = (cell) => {
    let simbol = cont % 2 === 0 ? "X" : "O";
    cell.innerText = simbol;
    cont++;
    turn.innerText = cont % 2 === 0 ? "X" : "O";
}

const verificarGanador = () => {
    for (const posGan of posicionesGanadoras) {
        const [a, b, c] = posGan;
        if (container[a].innerText !== "" &&
            container[a].innerText == container[b].innerText &&
            container[a].innerText == container[c].innerText) {
            juego = 'OFF';
            return container[a].innerText;
        }
    }
    // Empate: si no hay espacios vacíos y nadie ganó
    if (container.every(cell => cell.innerText !== "")) {
        juego = 'OFF';
        return "Empate";
    }
    return null;
}

const resetearJuego = () => {
    container.forEach(cell => cell.innerText = '');
    cont = 0;
    juego = 'ON';
    turn.innerText = 'X';
}

clearBoard.addEventListener('click', resetearJuego);
container.forEach((cell) => cell.addEventListener('click', () => controlarJugabilidad(cell)))