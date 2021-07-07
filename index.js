'use strict'

let deckId = ""
let computerScore = 0
let myScore = 0
const newDeckBtn = document.getElementById('new-deck')
const drawCards = document.getElementById('draw-cards')
const cardsContainer = document.getElementById("cards")
const scoreMark = document.getElementById("score-mark")
const remainingCards = document.getElementById("remaining-cards")
const computerScoreEl = document.getElementById("computer-score")
const myScoreEl = document.getElementById("my-score")


// can write much simplified code using async - await (than .then.then...)
async function handleClick() {
    const res = await fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    const data = await res.json()
    remainingCards.textContent = `Remaining Cards: ${data.remaining}`
    deckId = data.deck_id
    console.log(deckId)
}


// function handleClick() {
//     fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
//         .then(res => res.json())
//         .then(data => {
//             console.log(data)
//             deckId = data.deck_id
//             remainingCards.textContent = `Remaining Cards: ${data.remaining}`

//         })
// }


newDeckBtn.addEventListener('click', handleClick)
drawCards.addEventListener('click', async () => {
    const res = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    const data = await res.json()

    console.log(data.cards)
    cardsContainer.children[0].innerHTML = `
        <img src=${data.cards[0].image} class ="card"/>`

    cardsContainer.children[1].innerHTML = `  
        <img src=${data.cards[1].image} class ="card"/> `

    remainingCards.textContent = `Remaining Cards: ${data.remaining}`

    const winnerText = determineCardWinner(data.cards[0], data.cards[1])
    scoreMark.textContent = winnerText

    if (data.remaining === 0) { //when the game is over
        drawCards.disabled = true
        if (computerScore > myScore) {
            scoreMark.textContent = `Finally Computer wins!`
        } else if (computerScore < myScore) {
            scoreMark.textContent = `Finally You win!`
        } else {
            scoreMark.textContent = `Finally it's a tie game!`
        }
    }
})

function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9",
        "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)

    if (card1ValueIndex > card2ValueIndex) {
        computerScore++
        computerScoreEl.textContent = `Computer Score: ${computerScore}`
        return `Computer wins!`
    } else if (card2ValueIndex > card1ValueIndex) {
        myScore++
        myScoreEl.textContent = `My Score: ${myScore}`
        return `You win!`
    }
    else {
        return `WAR!`
    }
}




// const voters = [
//     { name: "Joe", email: "joe@joe.com", voted: true },
//     { name: "Jane", email: "jane@jane.com", voted: true },
//     { name: "Bo", email: "bo@bo.com", voted: false },
//     { name: "Bane", email: "bane@bane.com", voted: false }
// ]
// const voterEmails = voters.filter(voter => voter.voted)
//     .map(voter => voter.email)
// console.log(voterEmails)


// function callback() {
//     console.log("I finally ran!")
// }
// setTimeout(callback, 2000)


// const people = [
//     { name: "Jack", hasPet: true, age: 12 },
//     { name: "Jill", hasPet: false, age: 18 },
//     { name: "Alice", hasPet: true, age: 22 },
//     { name: "Bob", hasPet: false, age: 32 },
// ]

// const peopleWithPets = people.filter(person => person.hasPet)
// console.log(peopleWithPets)

// const overAge18 = people.filter(person => person.age >= 18)
// console.log(overAge18)

// function filterArray(array, callback) {
//     const resultingArray = []
//     for (let item of array) {
//         const shouldBeIncluded = callback(item)
//         if (shouldBeIncluded) {
//             resultingArray.push(item)
//         }

//     }
//     return resultingArray
// }


// //const peopleWithPets = filterArray(people, checkingPets)

// const peopleWithPets = filterArray(people, function (person) {
//     return person.hasPet
// })


// console.log(peopleWithPets)