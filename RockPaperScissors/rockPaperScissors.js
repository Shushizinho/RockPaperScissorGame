// converte de JSON para JS
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};   

updateScoreElem();

let isAutoPlaying = false;
let intervalId;


function autoPlay(){
  if (!isAutoPlaying){
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }  
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
});

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
});


document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    playGame('rock');
  } else if (event.key === 'p'){
    playGame('paper');
  } else if (event.key === 's'){
    playGame('scissors');
  } 
});


function playGame(playerMove){
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors'){
    if (computerMove === 'rock'){
      result= 'You lose!';
    } else if (computerMove === 'paper'){
      result = 'YOU WIN!';
    } else if (computerMove === 'scissors'){
      result = 'Tie!';
    }
  
  } else if (playerMove === 'paper'){
    if (computerMove === 'rock'){
      result= 'YOU WIN';
    } else if (computerMove === 'paper'){
      result = 'Tie!';
    } else if (computerMove === 'scissors'){
      result = 'You lose!';
    }
  
  } else if (playerMove === 'rock'){
    if (computerMove === 'rock'){
      result= 'Tie!';
    } else if (computerMove === 'paper'){
      result = 'You lose!';
    } else if (computerMove === 'scissors'){
      result = 'YOU WIN!';
    }
  }        

  if(result === 'You lose!'){
    score.losses += 1;
  } else if(result === 'YOU WIN!'){
    score.wins += 1;
  } else if(result === 'Tie!'){
    score.ties += 1;
  }

  //salva para no local storage, assim ao dar refresh os valores não alteram
  localStorage.setItem('score', JSON.stringify(score));
       
  updateScoreElem();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`;
  
}

function updateScoreElem(){
  document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove(){
  const randomNumb = Math.random();
 
  let computerMove = '';

  if (randomNumb >= 0 && randomNumb < 1/3){
    computerMove = 'rock';
  } else if(randomNumb >= 1/3 && randomNumb < 2/3){
    computerMove = 'paper';
  } else if(randomNumb >= 2/3 && randomNumb < 1){
    computerMove = 'scissors';
  }

  return computerMove;
}