document.addEventListener('DOMContentLoaded', () =>{
    const squares = document.querySelectorAll('.snakeGrid div');
    const scoreDisplay = document.querySelector('span');
    const startBtn = document.querySelector('.start');

    const width = 15;
    let currentIndex = 0; //first div in our grid
    let appleIndex = 0; //again first div in our grid
    let currentSnake = [2,1,0]; //2 is the head, 0 is the tail, and everything in between is a 1

    let direction = 1;
    let score = 0;
    let speed = 1.1;
    let intervalTime = 0;
    let interval = 0;

        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        document.body.style.backgroundColor = "#" + randomColor;

    //start and restart game
    function startGame(){
        currentSnake.forEach(index => squares[index].classList.remove('snake'));
        squares[appleIndex].classList.remove('apple');
        score = 0;
        randomApple();
        direction = 1;
        scoreDisplay.innerText = score;
        intervalTime = 1000;
        currentSnake = [2,1,0];
        currentIndex=0;
        currentSnake.forEach(index => squares[index].classList.add('snake'));
        interval = setInterval(moveOutcomes, intervalTime);
    }

    //all outcomes for the snake
    function moveOutcomes(){

    //hitting border or itself
        if (
            (currentSnake[0] + width >= (width * width) && direction === width) || //if snake hits the bottom
            (currentSnake[0] % width === -1 && direction === 1) || //snake hits right wall
            (currentSnake[0] % width === 0 && direction === -1) || //snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width) || //snake hits top
            squares[currentSnake[0] + direction].classList.contains('snake') //snake hits itself
        ) {
            return clearInterval(interval);
        }

        const tail = currentSnake.pop() //removes last ite of array and shows it
        squares[tail].classList.remove('snake')
        currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head
    //snake gets an apple
        if(squares[currentSnake[0]].classList.contains('apple')){
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake');
            currentSnake.push(tail);
            randomApple();
            score++;
            scoreDisplay.textContent = score;
            clearInterval(interval);
            intervalTime = intervalTime * speed;
            interval = setInterval(moveOutcomes, intervalTime);
            
        }
        squares[currentSnake[0]].classList.add('snake');
    }

    //generate a new apple once the current apple is eaten
    function randomApple(){
        do{
            appleIndex = Math.floor(Math.random() * squares.length)
        } while(squares[appleIndex].classList.contains('snake'))
        squares[appleIndex].classList.add('apple');
    }

    //keycode functions
    function control(e) {
        console.log(e.keyCode);
        squares[currentIndex].classList.remove('snake') //briefly remove the snake from all squares

        if(e.keyCode === 39){
            direction = 1 //if we press right arrow, snake goes right
        }
        if(e.keyCode === 38) {
            direction = -width //if we press the up arrow, the snake will go upwards
        }
        if (e.keyCode === 37){
            direction = -1 //if we press left, the snake goes left
        }
        if(e.keyCode === 40){
            direction = width //pressing down moves snake down
        }
        console.log(direction);
    }

    document.addEventListener('keyup', control);
    startBtn.addEventListener('click', startGame);

})