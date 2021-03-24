const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// canvas.width = innerWidth - 40
// canvas.height = innerHeight - 40

canvas.width = 600
canvas.height = 600

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  // canvas.width = innerWidth - 4
  // canvas.height = innerHeight - 4
})

addEventListener('keydown', (e) => {
  if(e.key == 'ArrowUp' && snake.curDirection != 'D'){
    snake.curDirection = 'U'
  }
  else if(e.key == 'ArrowDown' && snake.curDirection != 'U'){
    snake.curDirection = 'D'
  }
  else if(e.key == 'ArrowLeft' && snake.curDirection != 'R'){
    snake.curDirection = 'L'
  }
  else if(e.key == 'ArrowRight' && snake.curDirection != 'L'){
    snake.curDirection = 'R'
  }
})


class Snake {
  constructor(x, y, length) {
    this.x = x
    this.y = y
    this.length = length
    this.curDirection = 'R'
    this.body = [[this.x,this.y]]
  }

  draw() {
    // this.move(this.curDirection)
    c.fillStyle = 'green'
    // c.fillRect(this.x,this.y,20,20)
    this.body.forEach(x => {
      c.fillRect(x[0],x[1],20,20)
    })
  }

  move(direction) {
    
    if(direction == 'U'){
      this.y-=20
    }
    else if(direction == 'D'){
      this.y+=20
    }
    else if(direction == 'L'){
      this.x-=20
    }
    else if(direction == 'R'){
      this.x+=20
    }
    
  }

  bodystuff() {
    this.body.pop()
    this.body.unshift([this.x,this.y])
  }

  collision() {
    if(this.x < 0 || this.x > 600 || this.y < 0 || this.y > 600) {
      this.x = 300
      this.y = 300
      this.body = [[this.x,this.y]]
      this.curDirection = 'R'
    }
  }


  update() {
    this.draw()
  }
}


var snake = new Snake(300,300, 1)
var speed = 0
var apple = [20 * Math.floor(30 * Math.random()),20 * Math.floor(30 * Math.random())]
var eat = function() {
  if(apple[0] == snake.x && apple[1] == snake.y){
    snake.body.push([snake.x, snake.y])
    apple[0] = 20 * Math.floor(30 * Math.random())
    apple[1] = 20 * Math.floor(30 * Math.random())
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.clearRect(0, 0, canvas.width, canvas.height)
  c.fillRect(0,0,2000,2000)
  snake.collision()
  c.fillStyle = 'green'
  speed++
  if(speed % 10 == 0) {
    snake.bodystuff()
    snake.move(snake.curDirection)
    speed = 0
    eat()
    
    // console.log(snake.body)
  }
  snake.update()
  
  c.fillStyle = 'red'
  c.fillRect(apple[0],apple[1],20,20)

  
  
}




animate()
