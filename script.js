const gameBoard = document.getElementById("game-board");
const movesCounter = document.getElementById("moves");
const timerDisplay = document.getElementById("timer");
const restartButton = document.getElementById("restart-btn")

const cardValues = ["🍎", "🍌", "🍇", "🍉", "🍒", "🍓", "🥭", "🍍"]; // 8 unique pairs
let cards = [...cardValues, ...cardValues];

let firstCard = null;
let secondCard = null;
let lockBoard = false; 
let moves = 0;
let timer = 0;
let timerInterval;

function shuffle(array){
  for(let i = array.length-1;i>=0;i--){
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
}
}

function createCards(){
  gameBoard.innerHTML = "";
  shuffle(cards) //shuffling the cards before displaying

  cards.forEach(value =>{
    const card = document.createElement('div');
    card.classList.add("card");
    card.dataset.value=value;
    card.textContent = "?";
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || this === firstCard || this.classList.contains("matched")) return;

  this.textContent = this.dataset.value;
  this.classList.add("flipped");

  if (!firstCard) {
      firstCard = this;
  } else {
      secondCard = this;
      moves++;
      movesCounter.textContent = moves;
      checkForMatch();
  }
}

function checkForMatch(){
  lockBoard = true; // Lock the board while checking

  if(firstCard.dataset.value === secondCard.dataset.value){
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    resetBoard();
    checkForWin();
  }else{
    setTimeout(()=>{
      firstCard.textContent = "?";
      secondCard.textContent = "?";
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetBoard();
    }, 1000);
  }
}

function checkForWin(){
  const matchedCards = document.querySelectorAll(".matched");
  if (matchedCards.length === cards.length) {
    clearInterval(timerInterval); // Stop the timer
    setTimeout(() => alert(`Congratulations! You won in ${moves} moves and ${timer} seconds!`), 500);
  }
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}


function startTimer() {
  if (timerInterval) clearInterval(timerInterval)
  timerInterval = setInterval(() => {
      timer++;
      timerDisplay.textContent = timer;
  }, 1000);
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("card") && timer === 0) {
      startTimer();
  }
});

function restartGame() {
  clearInterval(timerInterval);
  
  timer = 0;
  moves = 0;
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  timerDisplay.textContent = "0";
  movesCounter.textContent = "0";
  createCards();
}

restartButton.addEventListener("click", restartGame); createCards();

createCards();  