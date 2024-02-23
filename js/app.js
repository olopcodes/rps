$(document).ready(function () {
  const rulesButton = $('.game-btn-rules');
  const closeModalButton = $('.btn-close-modal');
  const modal = $('.modal-rules');
  const gameButtons = $('.game-btn');
  const game = $('.game');
  const mainEl = $('.main');

  const data = {
    player: {
      pick: '',
      score: 0
    },
    computer: {
      pick: '',
      score: 0
    }
  };


  rulesButton.click(function (e) {
    modal.removeClass('hide');
  });

  closeModalButton.click(function (e) {
    modal.addClass('hide');
  });

  gameButtons.click(function (e) {
    const playerPick = $(e.target).attr('id');

    data.player.pick = playerPick;

    getComputerPick();

    const result = playGameRound();

    updateScores(result);

    const html = getGameBoardHTML(data.player.pick, data.computer.pick);

    $(game).addClass('hide');

    $(mainEl).append(html);

    const className = getAlertClassName(result);

    const alertHTML = getGameAlertHTML(className, result);

    setTimeout(function () { $('.game-board').append(alertHTML) }, 150);

    const scores = getScores();

    renderScores(scores);

  });

  // add event listener to something that does not exist yet
  $(mainEl).on('click', '.play-again-btn', function (e) {
    // const gameHTML = getGameHTML();
    $(game).removeClass('hide');
    $('.game-board').addClass('hide');
  });

  function randomNumber() {
    // return a number between 1 and 3
    return Math.floor(Math.random() * 3) + 1;
  }

  function getComputerPick() {
    const num = randomNumber();
    let pick = ''
    if (num === 1) {
      pick = 'rock';
    } else if (num === 2) {
      pick = 'scissors';
    } else {
      pick = 'paper'
    }

    data.computer.pick = pick;
  }

  function saveScores(data) {
    const { player, computer } = data;

    localStorage.setItem('gameScores', JSON.stringify({
      player: player.score,
      computer: computer.score
    }));
  }

  function getScores() {
    return JSON.parse(localStorage.getItem('gameScores'));
  }

  function playGameRound() {
    const { player, computer } = data;
    const playerPick = player.pick;
    const computerPick = computer.pick;

    if (playerPick === computerPick) {
      return 'tie.'
    } else if (
      playerPick === 'rock' && computerPick === 'paper' ||
      playerPick === 'scissors' && computerPick === 'rock' ||
      playerPick === 'paper' && computerPick === 'scissors'
    ) {
      return 'you lose.'
    } else {
      return 'you win!'
    }

  }

  function updateScores(result) {
    const { player, computer } = data;

    if (result === 'you win!') {
      player.score++;
    } else if (result === 'you lose.') {
      computer.score++;
    } else {
      return
    }


    saveScores(data);
  }

  function renderScores(scores) {
    const { player, computer } = scores;

    $('.player-score').text(player);
    $('.computer-score').text(computer);
  }

  function getAlertClassName(result) {
    if (result === 'you win!') {
      return 'winner'
    } else if (result === 'you lose.') {
      return 'loser'
    }
  }

  function getGameAlertHTML(className, result) {
    return `
        <div class="game-alert util-flex-center">
          <p class="game-alert-winner ${className}">${result}</p>
          <button class="game-btn-rules game-btn-rules--bg play-again-btn">play again</button>
        </div>
        `
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
  };


  (function () {
    const storedScores = getScores();

    if (storedScores) {
      renderScores(storedScores);
      data.player.score = storedScores.player;
      data.computer.score = storedScores.computer;
    }
  })();
});