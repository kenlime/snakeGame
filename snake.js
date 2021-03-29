
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const cellSize = 15 //cell size in px
const gap = 2

//ga stands for game area
const ga = {
  w: 25,
  h: 25,
  bg: 'black',
  draw: function(){
    c.fillStyle = this.bg
    c.fillRect(0, 0, this.w * cellSize + gap, this.h * cellSize + gap)
  },
  clear: function(){
    //console.log('clearing')
    c.clearRect(0, 0, canvas.width, canvas.height)
  },
  startScreen: function(){
    ga.clear()
    ga.draw()
    c.font = '30px Arial'
    c.fillStyle = 'white'
    c.textAlign = "center"
    c.fillText("Click to Start", (this.w * cellSize) / 2, (this.h * cellSize) / 2)
    addEventListener('click', startGame)
  },
  tick: 600

}

ga.startScreen()

//snake class are added to the tail array
class Snake {
  constructor(x, y){
    this.x = x
    this.y = y
    this.color = 'green'
    this.fs = cellSize - gap
  }

  draw(){
    c.fillStyle = this.color
    c.fillRect((this.x * cellSize) + gap, (this.y * cellSize) + gap, this.fs, this.fs)
  }

}

class Target {
  constructor(x, y){
    this.x = x
    this.y = y
    this.color = 'red'
    this.fs = cellSize - gap
  }

  draw(){
    c.fillStyle = this.color
    c.fillRect((this.x * cellSize) + gap, (this.y * cellSize) + gap, this.fs, this.fs)
  }
}

let tail = []
let tar = new Target(10, 10)
let dir = {x: 1, y: 0} //default 'right'
//key down changes the direction
addEventListener('keydown', (key) => {
  //console.log(key.keyCode)
  /* Key Codes:
  w = 87 / up = 38
  a = 65 / left = 37
  s = 83 / down = 40
  d = 68 / right = 39
  */
  switch(key.keyCode){
    case 87: // 'W'  up
    case 38:
      dir = {x: 0, y: -1}
      break
    case 65: // 'A'  left
    case 37:
      dir = {x: -1, y: 0}
      break
    case 83: // 'S'  down
    case 40:
      dir = {x: 0, y: 1}
      break
    case 68: // 'D'  right
    case 39:
      dir = {x: 1, y: 0}
      break
  }
})

function startGame(){
  tail = []
  dir = {x: 1, y: 0}
  tar = new Target(10, 10)
  ga.clear()
  ga.draw()
  //add first snake pieces
  tail.push(new Snake(6, 5))
  tail.push(new Snake(5, 5))
  tail.push(new Snake(4, 5))
  tail.push(new Snake(3, 5))
  //draw all in tail
  tail.forEach((t) => {
    t.draw()
  })
  tar.draw()
  gameFunc(ga.tick)
}

function gameFunc(speed){
  //console.log(ga.tick)
  removeEventListener('click', startGame)
  let gameTick = setInterval(function(){
    ga.clear()
    ga.draw()
    let nm = {x: tail[0].x + dir.x, y: tail[0].y + dir.y}

    //check if in bounds
    if(nm.x < 25 && nm.x >= 0 && nm.y < 25 && nm.y >= 0){
      //check if hit tail
      for(let i = 0; i < tail.length; i++){
        if(nm.x == tail[i].x && nm.y == tail[i].y){
          clearInterval(gameTick)
          ga.tick = 800
          ga.startScreen()
          return
        }
      }
      //check if hit the target
      if(nm.x == tar.x && nm.y == tar.y){ //hit target
        tail.unshift(new Snake(nm.x, nm.y))
        tar = new Target(Math.floor(Math.random() * ga.w), Math.floor(Math.random() * ga.h))
        ga.tick = ga.tick - ((ga.tick - 50) / 15)
        clearInterval(gameTick)
        gameFunc(ga.tick)
      } else { //didn't hit target
        tail.pop()
        tail.unshift(new Snake(nm.x, nm.y))
      }
      tail.forEach((t) => {
        t.draw()
      })
      tar.draw()
    } else {
      clearInterval(gameTick)
      ga.tick = 600
      ga.startScreen()
      return
    }
  }, speed)
}

function randTar(){
  let x = Math.floor(Math.random() * ga.w)

}
