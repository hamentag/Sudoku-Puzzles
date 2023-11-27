// References
const sudokuContainer = document.getElementById('sudoku-container');

// State
const state = {
    grid: null,
    puzzle: null,
}

/**
 *  Checks if the number is already in the row, column, or 3x3 subgrid
 * @param {number[][]} grid - a sudoku grid (uncomplete)
 * @param {number} row - a row index
 * @param {number} col - a column index
 * @param {number} num - a number to check
 * @returns {boolean} a boolean value
 */
function isValid(grid, row, col, num) {
    // Check if the number is already in the row or column
    if (grid[row].includes(num) || grid.some(r => r[col] === num)){
        return false;
    }

    // Check if the number is in the 3x3 subgrid
    const startRow = 3 * Math.floor(row / 3);
    const startCol = 3 * Math.floor(col / 3);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[startRow + i][startCol + j] === num) {
                return false;
            }
        }
    }
    return true;
}

/**
 *  solves the sudoku grid
 * @param {number[][]} grid - a sudoku grid to solve
 * @returns {boolean} a boolean value: true when the grid is solved
 */
function solve(grid) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === 0) {
                for (let i = 0; i < 9; i++) {
                    const randNum = Math.ceil(Math.random() * 9);
                    if (isValid(grid, row, col, randNum)) {
                        grid[row][col] = randNum;
                        if (solve(grid)) {
                            return true;
                        }
                        grid[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}
/**
 *  generates a sudoku puzzle
 */
function generateSudoku() {
    // Start with an empty 9x9 grid
    state.grid = Array.from({ length: 9 }, () => Array(9).fill(0)); 

    // Fill the grid with a valid solution
    solve(state.grid);
    console.table(state.grid);

    // Remove numbers to create the puzzle
    state.puzzle = [...state.grid];
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

/**
 *  prints a sudoku puzzle
 */
function printPuzzle() {
    const table = document.createElement('table');
    for (let i = 0; i < 9; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('td');
            if(state.puzzle[i][j] === 0){
                const inp = document.createElement('input');
                inp.type = 'number'
                inp.id =`input${i}${j}`
                inp.min = 1
                inp.max = 9
                cell.appendChild(inp)
            }
            else
            cell.textContent = state.puzzle[i][j];
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    sudokuContainer.appendChild(table);
}

/**
 *  initial state
 */
function init(){
    generateSudoku();
    printPuzzle();
}
init();