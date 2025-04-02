const beginButtonElement = document.querySelector('.begin-button');
const cards = document.querySelectorAll('.card');
const testButtonElement = document.querySelector('.test-button')
const testCards = document.querySelectorAll('.card-testM');
const memoryArray = document.querySelector('.memory-array');
const memoryScore = document.querySelector('.memory-score');
const cardsResult = document.querySelectorAll('.card-result')

const scoreForm = document.querySelector('#scoreForm');
const scoreInput = document.querySelector('#scoreInput');
const formPlayerName = document.querySelector('#form-player-name');

let memoryCards = [];
let userSelection = [];
let hasBegun = false

beginButtonElement.addEventListener('click', () => {
    cards.forEach((card, index) => {
        memoryCards.push(card.innerHTML)
        setTimeout(() => {
            card.style.display = 'block'
            setTimeout(() => {
                card.style.display = 'none'
            }, 350)
        },(index + 1) * 400)
    })
    setTimeout(() => {
        hasBegun = true
    },5000)
});
testButtonElement.addEventListener('click', () => {
    if(hasBegun === false) return
    testCards.forEach(card => {
        card.style.display = 'block'
        card.onclick = userClicked;
    }) // have to loop bc of ALL 
});
function userClicked(event) {
    if (userSelection.length < 5) {
        const card = event.target; //NEED TO GRASP THIS MORE
        userSelection.push(card.textContent);
        card.style.backgroundColor = 'lightblue';
        console.log(userSelection)
    }
    if(userSelection.length === 5) {
        checkScore()
    }
}
const compareArrays = (array1, array2) => {
    console.log(`Memory: ${memoryCards}`)
    console.log(`User: ${userSelection}`)
    let correct = 0
    let score = 0
    for (i = 0; i < array1.length; i++ ) {
        if (array1[i] === array2[i]) {
            correct = correct + 1
        }
    }
    score = (correct / array1.length) * 100
    return score
}
function displayMemoryCards() {
    cardsResult.forEach(card => {
         card.style.display = 'block'
    })
}
const checkScore = () => {
    let score = compareArrays(memoryCards, userSelection)
    displayMemoryCards();
    memoryScore.innerHTML = `Score: ${score}%`;

    const playerName = localStorage.getItem('playerName') || 'Player';
    formPlayerName.value = playerName;
    scoreInput.value = score;
    setTimeout(() => {
        scoreForm.submit();
    }, 4000)
}