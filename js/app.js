const gameBtn = $('.game-btn')
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
    console.log('cl')
})



