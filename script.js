const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const resultScreen = document.getElementById('result-screen');
const resultMessage = document.getElementById('result-message');
const gameContainer = document.getElementById('game-container');

let currentPlayer = 'X';
let board = Array(9).fill('');
let gameOver = false;

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function renderBoard() {
  boardElement.innerHTML = '';
  board.forEach((value, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.innerText = value;
    cell.addEventListener('click', () => handleClick(index));
    boardElement.appendChild(cell);
  });
}

function handleClick(index) {
  if (board[index] || gameOver) return;
  board[index] = currentPlayer;
  renderBoard();
  if (checkWinner()) {
    showResult(`🎉 Player ${currentPlayer} wins!`);
    gameOver = true;
  } else if (board.every(cell => cell)) {
    showResult("🤝 It's a draw!");
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusElement.innerText = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function showResult(message) {
  resultMessage.innerText = message;
  resultScreen.classList.remove('hidden');
  gameContainer.style.display = 'none';
}

function resetGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameOver = false;
  statusElement.innerText = `Player ${currentPlayer}'s turn`;
  renderBoard();
}

function startNewGame() {
  resultScreen.classList.add('hidden');
  gameContainer.style.display = 'block';
  resetGame();
}

// Start
renderBoard();
