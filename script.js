let gameBoard;
let moves;

const cells = document.querySelectorAll('.grid-container button');
const result = document.querySelector('.result');
const restartButton = document.querySelector('.restart-button');

restartButton.onclick = init;
playGame();

function init() {
    moves= 0;
    gameBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

    cells.forEach(cell => {
        cell.textContent = "";
        cell.disabled = false;
    });

    result.style.display = "none";
    restartButton.style.display = "none";
}

function playGame() {
    init();
    let currentSelection = "X";

    cells.forEach(cell => {
        cell.onclick = () => {
            let row = cell.dataset.row;
            let col = cell.dataset.col;
            let isPlacementValid = placeSelection(currentSelection, row, col);

            if (isPlacementValid) {
                moves++;
                cell.textContent = currentSelection;
                let gameEndMessage = "";

                if (checkRow(row) || checkColumn(col) || checkMainDiagonal() || checkAntiDiagonal()) {
                    gameEndMessage = `${currentSelection} has won`;
                }

                if (!gameEndMessage && moves >= 9) {
                    gameEndMessage = `It's a draw!`;
                }

                if (gameEndMessage) {
                    cells.forEach(cell => cell.disabled = true);
                    restartButton.style.display = "block";
                    result.style.display = "block";
                    result.textContent = gameEndMessage;
                }

                currentSelection = currentSelection == "X" ? "O" : "X"; 
            }
        }
    });
}

function placeSelection(selection, row, col) {
    if (gameBoard[row][col] == null) {
        gameBoard[row][col] = selection;
        return true;
    }

    return false;
}

function checkRow(index) {
    return gameBoard[index][0] == gameBoard[index][1] && gameBoard[index][1] == gameBoard[index][2];
}

function checkColumn(index) {
    return gameBoard[0][index] == gameBoard[1][index] && gameBoard[1][index] == gameBoard[2][index];
}

function checkMainDiagonal() {
    if (!gameBoard[1][1]) {
        return false;
    }

    return gameBoard[0][0] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][2];
}

function checkAntiDiagonal() {
     if (!gameBoard[1][1]) {
        return false;
    }

    return gameBoard[0][2] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][0];
}