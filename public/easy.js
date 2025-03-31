const buttonElement = document.querySelector('.begin-button');
const testElement = document.querySelector('.test-button');
const cards = document.querySelectorAll('.card');
const cardsTest = document.querySelectorAll('.card-test');
const displayMemory = document.querySelector('.memory-array');
const scoreElement = document.querySelector('.memory-score')
const cardsResult = document.querySelectorAll('.card-result')
//form document//
const scoreForm = document.querySelector('#scoreForm');
const scoreInput = document.querySelector('#scoreInput');
const formPlayerName = document.querySelector('#form-player-name');

let userSelection = []
let memoryCards = []
let hasBegun = false;

buttonElement.addEventListener('click', () => { 
    cards.forEach((card, index) => {
        setTimeout(() => {
            memoryCards.push(card.textContent)
            card.style.display = 'block'; 
            setTimeout(() => {
                card.style.display = 'none'; // Hide again a little less then 1 second
            }, 900);
        }, (index + 1) * 1000); // Delay increases by 1 second for each bc index * 1 sec
    });
    setTimeout(() => {
        hasBegun = true
    },4000)
})
testElement.addEventListener('click', () => {
    if (hasBegun === false) return;
    cardsTest.forEach(card => {
        card.style.display = 'block'
        card.onclick = userClicked;
    }) // have to loop bc of ALL 
})
function userClicked(event) {
    if (userSelection.length < 3) {
        const card = event.target; //NEED TO GRASP THIS MORE
        userSelection.push(card.textContent);
        card.style.backgroundColor = 'lightblue';
        console.log(userSelection)
    }
    if (userSelection.length === 3) {
        checkAnswers()
    }
}
function countIdenticalArrays(array1, array2) {
    let count = 0;
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] === array2[i]) {
            count++;
        }
    }
    return count;
}
function classListRemove() {
    cardsTest.forEach(card => card.classList.remove('selected'))
}
function displayMemoryCards() {
    cardsResult.forEach(card => {
         card.style.display = 'block'
    })
}
function checkAnswers() {
    displayMemoryCards();
    let correctCount = countIdenticalArrays(userSelection, memoryCards);
    let total = memoryCards.length;
    let score = (correctCount / total) * 100;
    score = Math.round(score);
    scoreElement.textContent = `Score: ${score}%`;

    const playerName = localStorage.getItem('playerName') || 'Player'
    formPlayerName.value = playerName;
    scoreInput.value = score;
    
    setTimeout(() => {
        classListRemove()
        scoreForm.submit(); //submit() uses <form id="scoreForm" action="/save-score" method="POST"> POST to /save-score
    }, 4000)
}