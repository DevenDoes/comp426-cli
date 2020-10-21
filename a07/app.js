import { Game } from './engine/game.js';

class browserGame {
    constructor () {
        this.game = new Game(4);
        this.board = document.querySelector('#board');
        this.modal = document.querySelector('#modal');
        this.score = document.querySelector('#score')
        this.loadEventListener();
        this.updateBoard();
        this.game.onLose(function () {
            this.modal.classList = 'visible';
            this.modal.children[0].innerHTML = 'You lost :('
            this.modal.children[1].innerHTML = 'You ended with a score of ' + this.game.gameState.score + '.'
        }.bind(this));
        this.game.onWin(function () {
            this.modal.classList = 'visible';
            this.modal.children[0].innerHTML = 'You won :)'
            this.modal.children[1].innerHTML = 'You ended with a score of ' + this.game.gameState.score + '.'
        }.bind(this));
    }
    loadEventListener () {
        document.querySelectorAll('.newGame').forEach((el) => {
           el.addEventListener('click', (e) => {
                this.modal.classList = 'hidden';
                this.game.setupNewGame();
                this.updateBoard();
            });
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.game.move('left');
                this.updateBoard();
            }
            else if (e.key === 'ArrowUp') {
                this.game.move('up');
                this.updateBoard();
            }
            else if (e.key === 'ArrowRight') {
                this.game.move('right');
                this.updateBoard();
            }
            else if (e.key === 'ArrowDown') {
                this.game.move('down');
                this.updateBoard();
            }
        })
    }
    updateBoard () {
        for (const tile in this.game.gameState.board) {
            this.board.children[tile].innerHTML = this.game.gameState.board[tile]
            if (this.game.gameState.board[tile] === 0) {
                this.board.children[tile].classList = 'tile tile-0';
            }
            else if (this.game.gameState.board[tile] === 2) {
                this.board.children[tile].classList = 'tile tile-2';
            }
            else if (this.game.gameState.board[tile] === 4) {
                this.board.children[tile].classList = 'tile tile-4';
            }
            else if (this.game.gameState.board[tile] === 8) {
                this.board.children[tile].classList = 'tile tile-8';
            }
            else if (this.game.gameState.board[tile] === 16) {
                this.board.children[tile].classList = 'tile tile-16';
            }
            else if (this.game.gameState.board[tile] === 32) {
                this.board.children[tile].classList = 'tile tile-32';
            }
            else if (this.game.gameState.board[tile] === 64) {
                this.board.children[tile].classList = 'tile tile-64';
            }
            else if (this.game.gameState.board[tile] === 128) {
                this.board.children[tile].classList = 'tile tile-128';
            }
            else if (this.game.gameState.board[tile] === 256) {
                this.board.children[tile].classList = 'tile tile-256';
            }
            else if (this.game.gameState.board[tile] === 512) {
                this.board.children[tile].classList = 'tile tile-512';
            }
            else if (this.game.gameState.board[tile] === 1024) {
                this.board.children[tile].classList = 'tile tile-1024';
            }
            else if (this.game.gameState.board[tile] === 2048) {
                this.board.children[tile].classList = 'tile tile-2048';
            }
            this.score.innerHTML = 'Score: ' + this.game.gameState.score;
        }
    }
}

window.onload = function () {
    new browserGame();
}