//import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth - 4
canvas.height = innerHeight - 4

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
  canvas.width = innerWidth - 4
  canvas.height = innerHeight - 4

  init()
})


class Racer {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {
    this.draw()
  }
}

var goomba = new Image();
goomba.src = 'g0.png';
var goomba2 = new Image();
goomba2.src = 'g1.png'
var gboo = new Image();
gboo.src = 'b0.png';
var gboo2 = new Image();
gboo2.src = 'b1.png'
var gbomb = new Image();
gbomb.src = 'bb0.png';
var gbomb2 = new Image();
gbomb2.src = 'bb1.png'
var koopa = new Image();
koopa.src = 'k0.png';
var koopa2 = new Image();
koopa2.src = 'k1.png'




var mul = 0
let buffer = 0
let racers
racers = []
let wins = [0,0,0,0]
var bobOmb = new Racer(innerWidth / 10, Math.floor(1 * innerHeight / 5), 0, '#FF4500')
var whomp = new Racer(innerWidth / 10, Math.floor(2 * innerHeight / 5), 0, 'grey')
var thwomp = new Racer(innerWidth / 10, Math.floor(3 * innerHeight / 5), 0, '#000000')
var boo = new Racer(innerWidth / 10, Math.floor(4 * innerHeight / 5), 0, '#006400')
racers.push(bobOmb)
racers.push(whomp)
racers.push(thwomp)
racers.push(boo)
function init() {

}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  c.fillStyle = 'black'
  buffer++
  // c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
  

  racers.forEach(object => {
    var distance = Math.round(Math.random() * 1.9)
    object.x += distance
    object.update()
    mul += 1
    c.strokeStyle = object.color
    c.lineWidth = 3
    c.beginPath();
    c.moveTo(innerWidth / 10, Math.floor(mul * innerHeight / 5) - 5);
    c.lineTo(object.x, Math.floor(mul * innerHeight / 5) - 5);
    c.stroke();

    c.fillStyle = 'black'
    c.font = '20px Georgia'
    c.fillText('Wins', (innerWidth / 10) - 35, Math.floor((0.8) * innerHeight / 5))
    for(var i = 0; i < wins.length; i++){ 
      c.fillText(wins[i], (innerWidth / 10) - 30, Math.floor((i+1) * innerHeight / 5)) 
    }

    if (object.x > innerWidth * 9 / 10) {
      wins[mul - 1] += 1
      racers.forEach(obj => { obj.x = innerWidth / 10 })
      
    }

    if (mul == 4) { mul = 0 }

    if (buffer >= 0 && buffer < 50) { c.drawImage(goomba, bobOmb.x - 25, Math.floor(1 * innerHeight / 5) - 45, 50, 50) }
    if (buffer >= 50 && buffer < 100) { c.drawImage(goomba2, bobOmb.x - 25, Math.floor(1 * innerHeight / 5) - 45, 50, 50) }

    if (buffer >= 0 && buffer < 50) { c.drawImage(gboo, whomp.x - 25, Math.floor(2 * innerHeight / 5) - 45, 50, 50) }
    if (buffer >= 50 && buffer < 100) { c.drawImage(gboo2, whomp.x - 25, Math.floor(2 * innerHeight / 5) - 45, 50, 50) }

    if (buffer >= 0 && buffer < 50) { c.drawImage(gbomb, thwomp.x - 25, Math.floor(3 * innerHeight / 5) - 45, 50, 50) }
    if (buffer >= 50 && buffer < 100) { c.drawImage(gbomb2, thwomp.x - 25, Math.floor(3 * innerHeight / 5) - 45, 50, 50) }

    if (buffer >= 0 && buffer < 50) { c.drawImage(koopa, boo.x - 25, Math.floor(4 * innerHeight / 5) - 45, 50, 50) }
    if (buffer >= 50 && buffer < 100) { c.drawImage(koopa2, boo.x - 25, Math.floor(4 * innerHeight / 5) - 45, 50, 50) }
    if (buffer > 99) { buffer = 0 }

  })




}

init()
animate()


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}