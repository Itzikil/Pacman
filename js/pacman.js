'use strict'

const PACMAN = '😃';
var gPacman;

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 7
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

    if (!gGame.isOn) return
    const nextLocation = getNextLocation(ev)
    console.log(nextLocation);
    if (!nextLocation) return

    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return
    if (nextCell === FLOOR) return
    if (nextCell === FOOD) {
        foodCount()
        updateScore(1)
    }
    if (nextCell === CHERRY) {
        updateScore(15)
    }
    if (nextCell === SUPERFOOD) {
        if (gGhostBlues) return
        else {
            gDeadGhosts = []
            var ghostColor = document.querySelector('.ghost')
            ghostColor.style.backgroundColor = 'blue'
            gGhostBlues = true
            setTimeout(() => {
                gGhosts.push(...gDeadGhosts)
                gGhostBlues = false
            },
                5000)

            console.log('gGhosts', gGhosts);
        }
    }
    else if (nextCell === GHOST) {
        if (gGhostBlues) {
            if (gGhosts[0].location.i === nextLocation.i && gGhosts[0].location.j === nextLocation.j) {
                gDeadGhosts.push(gGhosts.splice(0, 1)[0])
            } else if (gGhosts[1].location.i === nextLocation.i && gGhosts[1].location.j === nextLocation.j) {
                gDeadGhosts.push(gGhosts.splice(1, 1)[0])
            } else if (gGhosts[2].location.i === nextLocation.i && gGhosts[2].location.j === nextLocation.j) {
                gDeadGhosts.push(gGhosts.splice(2, 1)[0])
            }
            updateScore(10)
        } else {
            gameOver('lose')
            renderCell(gPacman.location, EMPTY)
            return
        }
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // update the DOM
    renderCell(gPacman.location, PACMAN)
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    if (eventKeyboard === 'up') {
        nextLocation.i--;
        console.log('hi');
    } else if (eventKeyboard === 'down') {
        nextLocation.i++;
    } else if (eventKeyboard === 'left') {
        nextLocation.j--;
    } else if (eventKeyboard === 'right') {
        nextLocation.j++;
    }

    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        // default:
        //     return null;
    }
    return nextLocation;
}


function foodCount() {
    var countFood = -1
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === FOOD) countFood++
        }
    }
    // console.log(countFood);
    return countFood
}