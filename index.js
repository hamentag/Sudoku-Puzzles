
const state = {
    board: null,
    puzzle: null,
}
function printPuzzle() {
    for (let i = 0; i < 9; i++) {
        console.log(state.puzzle[i].join(' '));
    }
}

function isValid(board, row, col, num) {
    // Check if the number is already in the row or column
    if (
        board[row].includes(num) ||
        board.some(r => r[col] === num)
    ) {
        return false;
    }

    // Check if the number is in the 3x3 subgrid
    const startRow = 3 * Math.floor(row / 3);
    const startCol = 3 * Math.floor(col / 3);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] === num) {
                return false;
            }
        }
    }

    return true;
}

function solve(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let i = 0; i < 9; i++) {
                    const randNum = Math.ceil(Math.random() * 9);
                    if (isValid(board, row, col, randNum)) {
                        board[row][col] = randNum;
                        if (solve(board)) {
                            return true;
                        }
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function generateSudoku() {
    // Start with an empty 9x9 board
    state.board = Array.from({ length: 9 }, () => Array(9).fill(0)); 

    // Fill the board with a valid solution
    solve(state.board);
    console.table(state.board);

    // Remove numbers to create the puzzle
    state.puzzle = [...state.board];

    for (let i = 0; i < 40; i++) {  
        let row, col;
        do {
            row = Math.floor(Math.random() * 9);
            col = Math.floor(Math.random() * 9);
        } while (state.puzzle[row][col] === 0);

        state.puzzle[row][col] = 0;
    }
    console.table(state.puzzle);
}

// 
function init(){
    generateSudoku();
    printPuzzle();
}
init();