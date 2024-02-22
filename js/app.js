
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



  $(gameBtn).click(function (e) {
    playerPick = $(e.target).attr('id');
    const rand = getRandomNumber();
    computerPick = getComputerPick(rand);
    const gameResult = gameLogic(playerPick, computerPick);
    const boardHTML = getGameBoardHTML(playerPick, computerPick);

    const className = alertWinnerClass(gameResult);
    const alertHTML = getGameAlertHTML(className);


    setTimeout(function () { $(mainEl).html(boardHTML) }, 200);

    setTimeout(function () { $('.game-board').append(alertHTML) }, 500);


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

    if (JSON.parse(localStorage.getItem('gameData'))) {
      return JSON.parse(localStorage.getItem('gameData'))
    } else {
      return gameData
    }
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
    let gameData = getGameData();

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
    const { playerScore, computerScore } = getGameData();

    renderScores(playerScore, computerScore)

  }

  function renderScores(playScore, compScore) {
    $('.player-score').text(playScore);
    $('.computer-score').text(compScore);
  }

  function alertWinnerClass(result) {
    if (result === 'you win!') {
      return 'winner'
    } else if (result === 'you lose.') {
      return 'loser'
    }
  }

  function getGameBoardHTML(playerPick, computerPick) {
    return `<div class="game-board">
    <div class="game-pick game-pick-user util-flex-center">
      <button id="${playerPick}" class="game-btn util-flex-center">
        <div class="game-btn-img-box util-flex-center">
          <img src="./images/icon-${playerPick}.svg" alt="">
        </div>
    
      </button>
      <h3>You Picked</h3>
    </div>
    
    <div class="game-pick game-pick-computer util-flex-center">
      <button id="${computerPick}" class="game-btn util-flex-center">
        <div class="game-btn-img-box util-flex-center">
          <img src="./images/icon-${computerPick}.svg" alt="">
        </div>
    
      </button>
      <h3>Computer picked</h3>
    </div>
    </div>`;
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
    setGameData(gameData);
    getScores()
  })();
});
