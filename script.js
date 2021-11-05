const grid = document.querySelector('.grid');
const scoreEl = document.getElementById('score');
const width = 28;
let squares = [];
let score = 0;

const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
];

// 0 - pacdots
// 1 - wall
// 2 - ghost lair
// 3 - powerpellets
// 4 - empty

function createBoard() {
    for (let i = 0; i < layout.length; i++) {
        const square = document.createElement('div');
        grid.appendChild(square);
        squares.push(square);

        if (layout[i] === 0) {
            squares[i].classList.add('pac-dot');
        } else if (layout[i] === 1) {
            squares[i].classList.add('wall');
        } else if (layout[i] === 2) {
            squares[i].classList.add('ghost-lair');
        } else if (layout[i] === 3) {
            squares[i].classList.add('power-pallets');
        }
    }
}

createBoard();

let pacManPosition = 490;
squares[pacManPosition].classList.add('pac-man');
//
let myInt = '';
let pressedRight = 0;
let pressedLeft = 0;
let pressedUp = 0;
let pressedDown = 0;
//

function move(e) {
    squares[pacManPosition].classList.remove('pac-man');
    //console.log(e.key)

    //fix all these cases
    switch (e.key) {
        case 'ArrowUp':
            clearInterval(myInt);
            myInt = setInterval( function () {
                //console.log('up')
                if (!squares[pacManPosition - width].classList.contains('wall')) {
                    squares[pacManPosition].classList.remove('pac-man');
                    pacManPosition -= width;
                    squares[pacManPosition].classList.add('pac-man');
                    pacdotsEaten();
                    powerPelletsEaten();
                }
            }, 400)
        break;

        case 'ArrowRight':
            clearInterval(myInt);
            myInt = setInterval( function () {
                //console.log('right')
                if (!squares[pacManPosition + 1].classList.contains('wall')) {
                    squares[pacManPosition].classList.remove('pac-man');
                    pacManPosition++;
                    squares[pacManPosition].classList.add('pac-man');
                    pacdotsEaten();
                    powerPelletsEaten();
                }
            }, 400)
            
        break;

        case 'ArrowDown':
            console.log('DOWN');
            clearInterval(myInt);
            myInt = setInterval( function () {
                //console.log('up')
                if (!squares[pacManPosition + width].classList.contains('wall')) {
                    squares[pacManPosition].classList.remove('pac-man');
                    pacManPosition += width;
                    squares[pacManPosition].classList.add('pac-man');
                    pacdotsEaten();
                    powerPelletsEaten();
                }
            }, 400)

        break;

        case 'ArrowLeft':
            clearInterval(myInt);
            myInt = setInterval( function () {
                //console.log('up')
                if (!squares[pacManPosition - 1].classList.contains('wall')) {
                    squares[pacManPosition].classList.remove('pac-man');
                    pacManPosition--;
                    squares[pacManPosition].classList.add('pac-man');
                    pacdotsEaten();
                    powerPelletsEaten();
                }
            }, 400)
        break;
    }
    squares[pacManPosition].classList.add('pac-man');
}
document.addEventListener('keyup', move);

function pacdotsEaten() {
    if(squares[pacManPosition].classList.contains('pac-dot')) {
        squares[pacManPosition].classList.remove('pac-dot');
        score++;
        scoreEl.textContent = score;
    }
}

function powerPelletsEaten() {
    if (squares[pacManPosition].classList.contains('power-pallets')) {
        squares[pacManPosition].classList.remove('power-pellets');
        score += 20;
        scoreEl.textContent = score;
        //here change the ghost color of the ghosts and enable pacMan to eat them
    }
}


/*
---
ghost
----
*/

class ghost {
    constructor(name, startPosition, speed) {
        this.name = name;
        this.startPosition = startPosition;
        this.position = startPosition;
        this.speed = speed;
        this.isScared = false;
        this.timerId = NaN;
    }
}

const ghosts = [
    new ghost ('red', 348, 350),
    new ghost ('blue', 349, 400),
    new ghost ('pink', 350, 450),
    new ghost ('yellow', 351, 550)
]

ghosts.forEach( (ghost) => {
    squares[ghost.position].classList.add(ghost.name);
    squares[ghost.position].classList.add('ghost');
})

//ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost) {
    const allDirections = [-1, +1, -width, +width];
    let random = Math.floor(Math.random() * allDirections.length);
    let direction = allDirections[random];
    

    ghost.timerId = setInterval( function() {
        if (
            !squares[ghost.position + direction].classList.contains('wall') &&
            !squares[ghost.position + direction].classList.contains('ghost')
        ) {
            //remove the ghost from the old position
            squares[ghost.position].classList.remove(ghost.name)
            squares[ghost.position].classList.remove('ghost')
            //update the ghost position
            ghost.position += direction;
            //add the ghost to the grid
            squares[ghost.position].classList.add(ghost.name);
            squares[ghost.position].classList.add('ghost');
        } else {
            direction = allDirections[Math.floor(Math.random() * allDirections.length)]
        }
    }, ghost.speed)
}

/*

    switch (e.key) {
        case 'ArrowUp':
            if (!squares[pacManPosition - width].classList.contains('wall')) {
                pacManPosition -= width;
            }
        break;

        case 'ArrowRight':
            if (!squares[pacManPosition + 1].classList.contains('wall')) {
                pacManPosition++;
            }
        break;

        case 'ArrowDown':
            console.log('DOWN');

            if (!squares[pacManPosition + width].classList.contains('wall')) {
                pacManPosition += width;
            }

        break;

        case 'ArrowLeft':
            if (!squares[pacManPosition - 1].classList.contains('wall')) {
                pacManPosition--;
            }
        break;
    }



*/












/*

class ghost {
    constructor(name, startPosition, speed) {
        this.name = name;
        this.startPosition = startPosition;
        this.position = startPosition;
        this.speed = speed;
        this.isScared = false;
    }
}

const ghosts = [
    new ghost ('red', 348, 250),
    new ghost ('blue', 349, 250),
    new ghost ('pink', 350, 250),
    new ghost ('yellow', 351, 250)
]

ghosts.forEach( (ghost) => {
    squares[ghost.position].classList.add(ghost.name);
    squares[ghost.position].classList.add('ghost');
})

function moveGhost(ghost) {
    let random = Math.floor( Math.random() * 4) + 1;
    const allDirections = [-1, +1, -width, +width];
    let direction = allDirections[random];

    //
    setInterval( () => {
        if (!squares[ghost.position + direction].classList.contains('wall')) {
            //remove the ghost from the old position
            squares[ghost.position].classList.remove(ghost.name)
            squares[ghost.position].classList.remove('ghost')
            //update the ghost position
            squares[ghost.position] += direction;
            //add the ghost to the grid
            squares[ghost.position].classList.add(ghost.name);
            squares[ghost.position].classList.add('ghost');
        } else {
            direction = allDirections[Math.floor(Math.random() * allDirections.length)]
        }
    }, 2500)
}

ghosts.forEach(ghost => moveGhost(ghost))
*/