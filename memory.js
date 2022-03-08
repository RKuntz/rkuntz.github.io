document.addEventListener('DOMContentLoaded', () => {

    //card options
    const cardArray = [
        {
            name: 'articuno',
            img: 'images/articuno.png'
        },
        {
            name: 'articuno',
            img: 'images/articuno.png'
        },
        {
            name: 'dragon',
            img: 'images/big lizard.png'
        },
        {
            name: 'dragon',
            img: 'images/big lizard.png'
        },
        {
            name: 'link',
            img: 'images/link.jpg'
        },
        {
            name: 'link',
            img: 'images/link.jpg'
        },
        {
            name: 'logo',
            img: 'images/Logo.png'
        },
        {
            name: 'logo',
            img: 'images/Logo.png'
        },
        {
            name: 'myFace',
            img: 'images/myFace.jpg'
        },
        {
            name: 'myFace',
            img: 'images/myFace.jpg'
        },
        {
            name: 'otherFace',
            img: 'images/that one face.PNG'
        },
        {
            name: 'otherFace',
            img: 'images/that one face.PNG'
        }
    ];

    cardArray.sort(() => 0.5 - Math.random())

    const resultDisplay = document.querySelector('#result')
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    const grid = document.getElementById('grid')

    //create the board
    function createBoard(){
        for (let i = 0; i < cardArray.length; i++) {
            let card = document.createElement('img');
            card.setAttribute('src', 'images/goldenbird.png');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }

    createBoard();

    //check for matches
    function checkForMatch(){
        let cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        if (cardsChosen[0] === cardsChosen[1]){
            alert('Match found!');
            cards[optionOneId].setAttribute('src', 'images/background-white.jpg');
            cards[optionTwoId].setAttribute('src', 'images/background-white.jpg');
            cardsWon.push(cardsChosen);
        } else {
            cards[optionOneId].setAttribute('src', 'images/goldenbird.png');
            cards[optionTwoId].setAttribute('src', 'images/goldenbird.png');
            alert('Not a match. Try again!')
        }
        cardsChosen = [];
        cardsChosenId = [];
        resultDisplay.textContent = cardsWon.length;
        if (cardsWon.length === cardArray.length/2) {
            resultDisplay.textContent = 'Congrats! You did it!'
        }
    }

    //flip cards
    function flipCard(){
        let cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].name);
        console.log(cardsChosen);
        cardsChosenId.push(cardId);
        console.log(cardsChosenId);
        this.setAttribute('src', cardArray[cardId].img);
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500)
        }
    }
})