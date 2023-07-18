
function startGame() {
  window.location.href = 'SnakeGame.html';
}

function endGame() {
  window.location.href = 'index.html';
}

// Start Links //
document.getElementById('home_page').addEventListener('click', function(event) {
  event.preventDefault();
  window.location.href = '#';
});

var game_link = document.getElementById('game');
game_link.addEventListener('click', function(event) {
  event.preventDefault();
  window.location.href = 'SnakeGame.html';
});
// End Links //
