document.addEventListener('DOMContentLoaded', () => {
  const gameBoard = document.getElementById('game-board');
  const scoreElement = document.getElementById('score');
  const highScoreElement = document.getElementById('high-score');
  const gridSize = 20;
  const boardSize = 400;
  const snake = [{ x: 200, y: 200 }];
  const food = { x: 0, y: 0 };
  let dx = 0;
  let dy = 0;
  let score = 0;
  let highScore = 0;
  let isGameOver = false;

  function update() {
    if (isGameOver) return;

    clearBoard();
    moveSnake();
    drawSnake();
    drawFood();

    if (isCollision()) {
      endGame();
    }

    if (isEatingFood()) {
      score += 10;
      scoreElement.textContent = score;
      if (score > highScore) {
        highScore = score;
        highScoreElement.textContent = highScore;
      }
      growSnake();
      generateFood();
    }
  }

  function clearBoard() {
    gameBoard.innerHTML = '';
  }

  function drawSnake() {
    snake.forEach(segment => {
      const snakeElement = document.createElement('div');
      snakeElement.classList.add('snake');
      snakeElement.style.left = segment.x + 'px';
      snakeElement.style.top = segment.y + 'px';
      gameBoard.appendChild(snakeElement);
    });
  }

  function drawFood() {
    const foodElement = document.createElement('div');
    foodElement.classList.add('food');
    foodElement.style.left = food.x + 'px';
    foodElement.style.top = food.y + 'px';
    gameBoard.appendChild(foodElement);
  }

  function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    snake.pop();
  }

  function changeDirection(event) {
    const LEFT_KEY = 'ArrowLeft';
    const UP_KEY = 'ArrowUp';
    const RIGHT_KEY = 'ArrowRight';
    const DOWN_KEY = 'ArrowDown';

    if (window.innerWidth >= 600) {
      if (event.key === LEFT_KEY && dx !== gridSize) {
        dx = -gridSize;
        dy = 0;
      }

      if (event.key === UP_KEY && dy !== gridSize) {
        dx = 0;
        dy = -gridSize;
      }

      if (event.key === RIGHT_KEY && dx !== -gridSize) {
        dx = gridSize;
        dy = 0;
      }

      if (event.key === DOWN_KEY && dy !== -gridSize) {
        dx = 0;
        dy = gridSize;
      }
    }
  }

  function isCollision() {
    const head = snake[0];

    return (
      head.x < 0 ||
      head.x >= boardSize ||
      head.y < 0 ||
      head.y >= boardSize ||
      snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    );
  }

  function isEatingFood() {
    const head = snake[0];
    return head.x === food.x && head.y === food.y;
  }

  function growSnake() {
    const tail = snake[snake.length - 1];
    snake.push({ x: tail.x, y: tail.y });
  }

  function generateFood() {
    const maxX = (boardSize / gridSize) - 1;
    const maxY = (boardSize / gridSize) - 1;
    const randomX = Math.floor(Math.random() * maxX) * gridSize;
    const randomY = Math.floor(Math.random() * maxY) * gridSize;

    food.x = randomX;
    food.y = randomY;
  }

  function endGame() {
    isGameOver = true;
    gameBoard.classList.add('dead');
    setTimeout(() => {
      alert('Game Over! Your score: ' + score);
      resetGame();
    }, 500);
  }

  function resetGame() {
    isGameOver = false;
    gameBoard.classList.remove('dead');
    snake.length = 1;
    dx = 0;
    dy = 0;
    snake[0].x = 200;
    snake[0].y = 200;
    score = 0;
    scoreElement.textContent = score;
    generateFood();
  }

  generateFood();
  setInterval(update, 100);
  document.addEventListener('keydown', changeDirection);

  // Button controls
  const upButton = document.getElementById('up');
  const downButton = document.getElementById('down');
  const leftButton = document.getElementById('left');
  const rightButton = document.getElementById('right');

  upButton.addEventListener('click', () => {
    if (dy !== gridSize) {
      dx = 0;
      dy = -gridSize;
    }
  });

  downButton.addEventListener('click', () => {
    if (dy !== -gridSize) {
      dx = 0;
      dy = gridSize;
    }
  });

  leftButton.addEventListener('click', () => {
    if (dx !== gridSize) {
      dx = -gridSize;
      dy = 0;
    }
  });

  rightButton.addEventListener('click', () => {
    if (dx !== -gridSize) {
      dx = gridSize;
      dy = 0;
    }
  });
});