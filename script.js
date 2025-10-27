let gameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

playGame();

function playGame() {
    let count = 0;
    let currentSelection = "O";

    while (true) {
        let input = prompt().split(' ');
        let row = input[0];
        let col = input[1];
        let isPlacementValid = placeSelection(currentSelection, row, col);

        if (isPlacementValid) {
            if (checkRow(row) || checkColumn(col) || checkMainDiagonal() || checkAntiDiagonal()) {
                alert(`${gameBoardToString()}\n\n${currentSelection} has won!`);
                break;
            }

            if (count == 9) {
                alert(`${gameBoardToString()}It's a draw!`);
                break;
            }

            currentSelection = currentSelection == "X" ? "O" : "X"; 
            count++;
        }

        alert(gameBoardToString());
    }
}

function gameBoardToString() {
    let board = "";

    gameBoard.forEach(row => {
        row.forEach(placement => {
            if (placement)
                board += `[${placement}]`;
            else
                board += "[_]";
        });

        board += "\n";
    });

    return board;
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
    return gameBoard[0][0] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][2];
}

function checkAntiDiagonal() {
    return gameBoard[0][2] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][0];
}