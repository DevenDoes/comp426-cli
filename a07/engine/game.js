export default class Game {

    constructor(dimension) {
        this.dimension = dimension;
        this.setupNewGame();
        this.callbacks = {
            'onMove': [],
            'onWin': [],
            'onLose': [],
        };
    }

    /**
     * Resets the game to a random starting state.
     */
    setupNewGame() {
        this.gameState = {
            board: new Array(this.dimension ** 2).fill(0),
            score: 0,
            won: false,
            over: false,
        };
        this.addRandomTile();
        this.addRandomTile();
    }

    /**
     * Generates a random tile to add to the board.
     */
    addRandomTile() {
        // Define tile weights (2 -> 90%, 4 -> 10%)
        let tileWeights = [2, 2, 2, 2, 2, 2, 2, 2, 2, 4];
        // Randomly select the new tile value
        let newTileValue = tileWeights[Math.floor(Math.random() * Math.floor(10))];
        // Generate array of game board indexes
        let gameBoardIndexes = Array.from(Array(this.gameState.board.length).keys());
        // Filter array to indexes without a tile value
        let emptyTileLocations = gameBoardIndexes.filter((index) => this.gameState.board[index] === 0);
        // Randomly select an index for the new tile
        let newTileLocation = emptyTileLocations[Math.floor(Math.random() * emptyTileLocations.length)];
        // Add the new tile to the board
        this.gameState.board[newTileLocation] = newTileValue;
    }

    /**
     * Loads a game with the provided game state.
     */
    loadGame(gameState) {
        this.gameState = gameState;
        this.dimension = Math.sqrt(this.gameState.board.length);
    }

    /**
     * Moves the tiles on the board in the provided direction.
     */
    move(direction) {
        // Define array to store path index arrays
        let paths = [];
        if (direction === 'up' || direction === 'down') {
            paths = this.moveVertical(direction);
        }
        else if (direction === 'left' || direction === 'right') {
            paths = this.moveHorizontal(direction);
        }
        // Track if a move occurred
        let moveOccurred = false;
        // For each index path
        for (let path of paths) {
            // For each tile in the path
            for (let current = 0; current < path.length; current++) {
                let currentIndex = path[current];
                // For all following tiles in the path
                for (let next = current + 1; next < path.length; next++) {
                    let nextIndex = path[next];
                    // If the current tile is empty and the next tile is not empty
                    if (this.gameState.board[currentIndex] === 0
                        && this.gameState.board[nextIndex] !== 0) {
                        // console.log(`Curr Loc: ${currentIndex}, Curr Val: ${this.gameState.board[currentIndex]}`);
                        // console.log(`Next Loc: ${nextIndex}, Next Val: ${this.gameState.board[nextIndex]}`);
                        // Replace the current tile with the next tile
                        this.gameState.board[currentIndex] = this.gameState.board[nextIndex];
                        // Make the next tile empty
                        this.gameState.board[nextIndex] = 0;
                        // Indicate that a move occurred
                        moveOccurred = true;
                    }
                    // If the current tile and next tile are not empty and are equal
                    else if (this.gameState.board[currentIndex] !== 0
                        && this.gameState.board[nextIndex] !== 0
                        && this.gameState.board[currentIndex] === this.gameState.board[nextIndex]) {
                        // Combine the current tile with the next tile
                        this.gameState.board[currentIndex] += this.gameState.board[nextIndex];
                        // Increment the score
                        this.gameState.score += this.gameState.board[currentIndex];
                        // Make the next tile empty
                        this.gameState.board[nextIndex] = 0;
                        // Indicate that a move occurred
                        moveOccurred = true;
                        break;
                    }
                    // If the current tile and the next tile are not empty and are not equal
                    else if (this.gameState.board[currentIndex] !== 0
                        && this.gameState.board[nextIndex] !== 0
                        && this.gameState.board[currentIndex] !== this.gameState.board[nextIndex]) {
                        break;
                    }
                }
            }
        }
        if (moveOccurred) {
            this.addRandomTile();
            this.triggerEvent('onMove');
            if (this.isWin()) {
                this.gameState.won = true;
                this.triggerEvent('onWin');
            }
            if (this.isLoss()) {
                this.gameState.over = true;
                this.triggerEvent('onLose');
            }
        }
    }

    /**
     * Compute the index paths for moving the tiles vertically in the specified direction.
     * @param direction
     * @returns {[]}
     */
    moveVertical(direction) {
        let paths = []
        // For each board column
        for (let column = 0; column < this.dimension; column++) {
            let path = [];
            // For each board row
            for (let row = 0; row < this.dimension; row++) {
                // Log the tile index and merge state
                path.push(column + row * this.dimension);
            }
            direction === 'up'
                ? paths.push(path)
                : paths.push(path.reverse());
        }
        return paths;
    }

    /**
     * Compute the index paths for moving the tiles horizontally in the specified direction.
     * @param direction
     * @returns {[]}
     */
    moveHorizontal(direction) {
        let paths = []
        // For each board row
        for (let row = 0; row < this.dimension; row++) {
            let path = [];
            // For each board column
            for (let column = 0; column < this.dimension; column++) {
                // Log the tile index and merge state
                path.push(column + row * this.dimension);
            }
            direction === 'left'
                ? paths.push(path)
                : paths.push(path.reverse());
        }
        return paths;
    }

    /**
     * Determine if the game board is in a losing state
     */
    isLoss() {
        // Generate array of game board indexes
        let gameBoardIndexes = Array.from(Array(this.gameState.board.length).keys());
        // Filter array to indexes without a tile value
        let emptyTileLocations = gameBoardIndexes.filter((index) => this.gameState.board[index] === 0);
        // If there are empty tiles
        if (emptyTileLocations.length > 0) {
            return false;
        }
        let paths = this.moveHorizontal('left');
        paths = paths.concat(this.moveVertical('up'));
        paths = paths.concat(this.moveVertical('right'));
        paths = paths.concat(this.moveVertical('down'));
        for (let path of paths) {
            // For each tile in the path
            for (let current = 0; current < path.length; current++) {
                let currentIndex = path[current];
                // For all following tiles in the path
                for (let next = current + 1; next < path.length; next++) {
                    let nextIndex = path[next];
                    // If the current tile is empty and the next tile is not empty
                    if (this.gameState.board[currentIndex] === 0
                        && this.gameState.board[nextIndex] !== 0) {
                        // console.log(`Curr Loc: ${currentIndex}, Curr Val: ${this.gameState.board[currentIndex]}`);
                        // console.log(`Next Loc: ${nextIndex}, Next Val: ${this.gameState.board[nextIndex]}`);
                        return false;
                    }
                    // If the current tile and next tile are not empty and are equal
                    else if (this.gameState.board[currentIndex] !== 0
                        && this.gameState.board[nextIndex] !== 0
                        && this.gameState.board[currentIndex] === this.gameState.board[nextIndex]) {
                        // console.log(`Curr Loc: ${currentIndex}, Curr Val: ${this.gameState.board[currentIndex]}`);
                        // console.log(`Next Loc: ${nextIndex}, Next Val: ${this.gameState.board[nextIndex]}`);
                        return false;
                    }
                    // If the current tile and the next tile are not empty and are not equal
                    else if (this.gameState.board[currentIndex] !== 0
                        && this.gameState.board[nextIndex] !== 0
                        && this.gameState.board[currentIndex] !== this.gameState.board[nextIndex]) {
                        break;
                    }
                }
            }
        }
        return true;
    }

    /**
     * Determine if the game board is in a winning state
     */
    isWin() {
        // Generate array of game board indexes
        let gameBoardIndexes = Array.from(Array(this.gameState.board.length).keys());
        // Filter array to indexes without a 2048 tile value
        let emptyTileLocations = gameBoardIndexes.filter((index) => this.gameState.board[index] === 2048);
        // If there is a 2048 tile
        return emptyTileLocations.length > 0;
    }

    /**
     * Returns the current game state in ascii.
     */
    toString() {
        let board = '';
        this.gameState.board.forEach((tile, index) => {
            index % this.dimension === 0
                ? board += `\n[${ tile }]`
                : board += `[${ tile }]`;
        });
        return board;
    }

    /**
     * Trigger an event and call its registered callback functions
     */
    triggerEvent(event) {
        this.callbacks[event].forEach((callback) => {
            callback(this.gameState);
        })
    }

    /**
     * Register a callback function for the provided event.
     */
    registerCallback(event, callback) {
        this.callbacks[event].push(callback);
    }

    /**
     * Registers a callback function to run after every move event.
     */
    onMove(callback) {
        this.registerCallback('onMove', callback);
    }

    /**
     * Registers a callback function to run after every win event.
     */
    onWin(callback) {
        this.registerCallback('onWin', callback);
    }

    /**
     * Registers a callback function to run after every lose event.
     */
    onLose(callback) {
        this.registerCallback('onLose', callback);
    }

    /**
     * Returns the current game state.
     */
    getGameState() {
        return this.gameState;
    }

}