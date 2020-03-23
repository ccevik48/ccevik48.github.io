var cv = document.querySelector('#cv');
var c = cv.getContext('2d');
var h = cv.height;
var w = cv.width;

var gravity = 1.5;
var friction = 0.9;
var speed = 5.2;
var score = 0;
var hiScore = 0;
var index = 0;

var img = new Image();
img.src = 'dc.jpg';

var imgCactus = new Image();
imgCactus.src = 'cc.png'


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


function Dino() {
    this.y = h / 2;
    this.x = w / 8;
    this.dy = 2;

    this.update = function () {

        this.y += this.dy;
        if (this.y > h / 2 - 30) {
            this.y = h / 2 - 30;
            this.dy = 12;
        }
        else {
            this.dy += gravity;
        }

        this.draw();
    }

    this.draw = function () {
        c.drawImage(img, w / 8, this.y)
    }

    this.jump = function () {
        this.dy = -16;
    }

}

function Cactus() {
    this.y = h / 2 - 25;
    this.x = w;

    this.update = function () {
        this.x -= speed;
        this.draw();
    }
    this.draw = function () {
        c.drawImage(imgCactus, this.x, this.y)
    }

}

var cactusArray = [];
for (var i = 0; i < 1000; i++) {
    cactusArray.push(new Cactus());

}



var d;
var cc;
function init() {
    d = new Dino();
    cc = new Cactus();
    console.log(d)
}

for (var i = 0; i < cactusArray.length - 1; i++) {
    cactusArray[i + 1].x = cactusArray[i].x + getRandomInt(400, 700 + i * 2)

}

window.addEventListener("keypress", function (e) {
    var keyp = e.keyCode;
    if (keyp == 32 && d.y > h / 2 - 32) {
        d.jump();
    }
});



var current = 0;
var curmax = 0;
var hit = false;
function animate() {
    requestAnimationFrame(animate);


    for (var i = current; i < cactusArray.length - 1; i++) {

        if (Math.abs(d.x - cactusArray[i].x) < 25 && Math.abs(d.y - cactusArray[i].y) < 20) {
            hit = true;
            current = 0;
            break;
        }
        else {
            hit = false
        }
        if (cactusArray[i].x < 0) {
            current = i;
        }
    }

    if (hit == true) {
        score = 0;
        speed = 5.2;
        cactusArray[0].x = w
        for (var i = 0; i < cactusArray.length - 1; i++) {
            cactusArray[i + 1].x = cactusArray[i].x + getRandomInt(400, 700 + i * 2)

        }

    }
    else {
        score += 0.3;
        speed += 0.003;

        c.clearRect(0, 0, w, h);

        c.fillStyle = 'black';
        c.beginPath();
        c.moveTo(0, h / 2 - 15);
        c.lineTo(w, h / 2 - 15);
        c.stroke();

        c.font = "20px Arial";
        c.fillText("Score: " + Math.round(score), w * 5 / 6, h / 9);
        if (hiScore < score) {
            hiScore = score;
        }
        c.fillText("High Score: " + Math.round(hiScore), w * 5 / 6 - 30, h / 9 + 60);

        d.update();


        for (var i = 0; i < cactusArray.length - 1; i++) {
            cactusArray[i].update();
        }
    }

    if(score > 9000){
        score = 9000;
    }





}
requestAnimationFrame(animate);

init();




