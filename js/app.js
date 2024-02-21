
$(document).ready(function () {
  const gameBtn = $('.game-btn');
  const gameRulesBtn = $('.game-btn-rules');
  const closeModalBtn = $('.btn-close-modal');
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
    const rand = getRandomNumber();
    computerPick = getComputerPick(rand);
    const gameResult = gameLogic(playerPick, computerPick);
    // console.log(playerPick, computerPick, gameResult, gameData);
  })

  $(gameRulesBtn).click(function (e) {
    if ($('.modal-rules').hasClass('hide')) {
      $('.modal-rules').removeClass('hide');
    }
  })

  $(closeModalBtn).click(function (e) {
    $('.modal-rules').addClass('hide');
  })


  function setGameData(gameData) {
    localStorage.setItem('gameData', JSON.stringify(gameData))
  }

  function getGameData() {
    return JSON.parse(localStorage.getItem('gameData'));
  }

  function getRandomNumber() {
    return Math.floor(Math.random() * 3);
  }

  function getComputerPick(rand) {
    if (rand === 0) {
      return 'rock';
    } else if (rand === 1) {
      return 'paper'
    } else {
      return 'scissors'
    }
  }

  function gameLogic(playerPick, computerPick) {
    let result
    if (playerPick === computerPick) {
      result = 'tie.';
    } else if (
      playerPick === 'rock' && computerPick === 'scissors' ||
      playerPick === 'paper' && computerPick === 'rock' ||
      playerPick === 'scissors' && computerPick === 'paper'
    ) {
      gameData.playerScore++;
      result = 'you win!';
    } else {
      gameData.computerScore++
      result = 'you lose.'
    }

    // store game info in local storage
    setGameData(gameData);

    getScores();

    return result;
  }

  function getScores() {
    let data;

    if (getGameData()) {
      data = getGameData();
    } else {
      data = gameData;
      $('.player-score').text(data.playerScore);
      $('.computer-score').text(data.computerScore);
    }

  }

  function alertWinnerClass(result) {
    if (result === 'you win!') {
      return 'winner'
    } else if (result === 'you lose.') {
      return 'loser'
    }
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
    
    
    </div>`
  }

  function getGameAlertHTML(className) {
    return `
    <div class="game-alert util-flex-center">
      <p class="game-alert-winner ${className}">You win</p>
      <button class="game-btn-rules game-btn-rules--bg">play again</button>
    </div>
    `
  }
  function renderGameBoard() {

  }

  function playGame() {

  }

  (function () {
    // setGameData();
    getScores()
  })();
});
