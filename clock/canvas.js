const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth - 140
canvas.height = innerHeight - 140

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
  canvas.width = innerWidth - 140
  canvas.height = innerHeight - 140
})

addEventListener('resize', () => {
  clk.x = canvas.width/2
  clk.y = canvas.height/2
})


class Clock {
  constructor(x, y, radius, timezone, font_style) {
    this.x = x
    this.y = y
    this.radius = radius
    this.timezone = timezone
    this.font_style = font_style
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    // c.strokeStyle = 'red'
    this.secondHand()
    this.minuteHand()
    this.hourHand()
    this.numbers()
    c.fill()
    c.closePath()
  }

  secondHand() {
    c.strokeStyle = 'red'
    var sHand = new Date()
    c.beginPath();
    c.moveTo(this.x, this.y);
    c.lineWidth = 1
    c.lineTo(this.x + this.radius*(Math.cos(sHand.getSeconds()*6*Math.PI/180 - Math.PI/2)), this.y + this.radius*(Math.sin(sHand.getSeconds()*6*Math.PI/180 - Math.PI/2)));
    c.stroke();
  }

  minuteHand() {
    c.strokeStyle = 'black'
    var mHand = new Date()
    c.beginPath();
    c.moveTo(this.x, this.y);
    c.lineWidth = 3
    c.lineTo(this.x + this.radius*(Math.cos(mHand.getMinutes()*6*Math.PI/180 - Math.PI/2)), this.y + this.radius*(Math.sin(mHand.getMinutes()*6*Math.PI/180 - Math.PI/2)));
    c.stroke();
  }

  hourHand() {
    c.strokeStyle = 'black'
    var hHand = new Date()
    c.beginPath();
    c.moveTo(this.x, this.y);
    c.lineWidth = 3
    c.lineTo(this.x + 7/10*this.radius*(Math.cos(hHand.getHours()*30*Math.PI/180 - Math.PI/2 + hHand.getMinutes()/2*Math.PI/180       + this.timezone*Math.PI/6       )), this.y + 7/10*this.radius*(Math.sin(hHand.getHours()*30*Math.PI/180 - Math.PI/2 + hHand.getMinutes()/2*Math.PI/180    + this.timezone*Math.PI/6     )));
    c.stroke();
  }

  numbers() {
    for(var i = 0; i < 12; i++) {
      c.fillStyle = 'black'
      c.textBaseline = 'middle'
      c.textAlign = 'center'
      c.font = this.font_style ||  '32px Arial'
      c.fillText((i+1),this.x + 11/10*this.radius*(Math.cos(i* 30 * Math.PI/180 - Math.PI/2 + Math.PI/6)), this.y + 11/10*this.radius*(Math.sin(i * 30 * Math.PI/180 - Math.PI/2 + Math.PI/6)))
    }
  }

  update() {
    this.draw()
  }
}

var clk = new Clock(canvas.width / 2, canvas.height / 2, 190, 0, '')

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  clk.update()


}

animate()
