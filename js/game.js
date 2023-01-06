'use strict'

const WALL = '| |'
const FLOOR = '| |'
const FOOD = '.'
const SUPERFOOD = '🎂'
const CHERRY = '🍒'
const EMPTY = ' '

var gGame = {
    score: 0,
    isOn: false
}
var gBoard
var cherryInterval

function init() {
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)

    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
    gGame.score = 0
    document.querySelector('h2 span').innerText = gGame.score
    document.querySelector('.nav').classList.toggle('hide')
    cherryInterval = setInterval(addCherry, 10000)
}


function buildBoard() {
    const COL = 9
    const ROW = 18
    const board = []

    for (var i = 0; i < COL; i++) {
        board.push([])

        for (var j = 0; j < ROW ; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === COL - 1) board[i][j] = FLOOR

            if (j === 0 || j === ROW - 1 ||
                (j === 2 && i > 3 && i < COL - 2) ||
                (j === ROW - 3 && i > 3 && i < COL - 2)||
                (j ===8  && i > 1 && i < COL - 2)||
                (j ===10  && i > 1 && i < COL - 2)) {
                board[i][j] = WALL
            }
            if ((i === 1 && j === 1) || (i === 1 && j === ROW - 2) ||
                (i === COL -2 && j === 1) || (i === COL - 2 && j === ROW - 2)) {
                board[i][j] = SUPERFOOD
            }

        }
    }
    return board
}

function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score

    if (foodCount() === 0) gameOver('win')
}


function addCherry() {
    var emptyCells = []
    for (var i = 1; i < gBoard.length - 1; i++) {
        for (var j = 1; j < gBoard[0].length - 1; j++) {
            if (gBoard[i][j] === FOOD || gBoard[i][j] === EMPTY) emptyCells.push({ i, j })
        }
    }
    var emptyCell = emptyCells[getRandomIntInclusive(0, emptyCells.length - 1)]
    renderCell(emptyCell, CHERRY)
    gBoard[emptyCell.i][emptyCell.j] = CHERRY
}

function gameOver(score) {
    console.log('Game Over')
    var gameOver = document.querySelector('.nav')
    gameOver.classList.toggle('hide')

    gameOver = document.querySelector('.victorius')
    if (score === 'win') {
        gameOver.innerText = 'Victorius!'
        gameOver.style.color = 'blue'
    } else {
        gameOver.innerText = 'Game over!'
        gameOver.style.color = 'red'
    }

    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    clearInterval(cherryInterval)
}