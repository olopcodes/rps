
$(document).ready(function () {
  const gameBtn = $('.game-btn');
  const mainEl = $('.main');
  let playerPick = '';
  let computerPick = '';
  const gameData = {
    playerScore: 0,
    computerScore: 0
  };

  let gameBoardHTML = `<div class="game-board">
<div class="game-pick game-pick-user util-flex-center">
  <button id="scissors" class="game-btn util-flex-center">
    <div class="game-btn-img-box util-flex-center">
      <img src="./images/icon-scissors.svg" alt="">
    </div>

  </button>
  <h3>You Picked</h3>
</div>

<div class="game-pick game-pick-computer util-flex-center">
  <button id="scissors" class="game-btn util-flex-center">
    <div class="game-btn-img-box util-flex-center">
      <img src="./images/icon-scissors.svg" alt="">
    </div>

  </button>
  <h3>Computer picked</h3>
</div>

<div class="game-alert util-flex-center">
  <p class="game-alert-winner winner">You win</p>
  <button class="game-btn-rules game-btn-rules--bg">play again</button>
</div>
</div>`;



  $(gameBtn).click(function (e) {
    playerPick = $(e.target).attr('id');
  })

  function setGameData() {
    localStorage.setItem('gameData', JSON.stringify(gameData))
  }

  function getGameData() {
    return JSON.parse(localStorage.getItem('gameData'));
  }

  function getRandomNumber() {
    return Math.floor(Math.random() * 3);
  }

  function computerPick(rand) {
    if (rand === 0) {
      return 'rock';
    } else if (rand === 1) {
      return 'paper'
    } else {
      return 'scissors'
    }
  }

  function gameLogic(playerPick, computerPick) {
    if (playerPick === computerPick) {
      return 'tie.';
    } else if (
      playerPick === 'rock' && computerPick === 'scissors' ||
      playerPick === 'paper' && computerPick === 'rock' ||
      playerPick === 'scissors' && computerPick === 'paper'
    ) {
      return 'You win!';
    } else {
      return 'You lose.'
    }
  }

  function alertWinnerClass() {

  }

  function getGameBoardHTML(playerPick, computerPick, result) {
    return `<div class="game-board">
    <div class="game-pick game-pick-user util-flex-center">
      <button id="scissors" class="game-btn util-flex-center">
        <div class="game-btn-img-box util-flex-center">
          <img src="./images/icon-${playerPick}.svg" alt="">
        </div>
    
      </button>
      <h3>You Picked</h3>
    </div>
    
    <div class="game-pick game-pick-computer util-flex-center">
      <button id="scissors" class="game-btn util-flex-center">
        <div class="game-btn-img-box util-flex-center">
          <img src="./images/icon-${computerPick}.svg" alt="">
        </div>
    
      </button>
      <h3>Computer picked</h3>
    </div>
    
    <div class="game-alert util-flex-center">
      <p class="game-alert-winner ${className}">You win</p>
      <button class="game-btn-rules game-btn-rules--bg">play again</button>
    </div>
    </div>`
  }

  function renderGameBoard() {

  }

  function playGame() {

  }

  (function () {
    setGameData();

  })();
});
