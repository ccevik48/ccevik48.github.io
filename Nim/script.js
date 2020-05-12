var cv = document.querySelector('#cv');
var c = cv.getContext('2d');
var h = cv.height;
var w = cv.width;

var textWidth = 0;
var buttonW = 80;
var buttonH = 50;

var img = new Image();
img.src = 'card2.png';


var cards = [
    [1],
    [1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1]
];

var rules = [
    "Rules of Nim: ",
    "1. Take turns removing card(s) from only one row per turn",
    "2. You must take at least 1 card per turn",
    "3. The player that takes the last card, loses",
    " ",
    "Controls: ",
    "'Remove': Removes one card from the adjacent row",
    "'Be Player 2': Resets the game and switches player order",
    "'End Turn': Ends the current player's turn",
    "'Reset': Resets the game"
]

var currentRow = -1;
var cPlayer = new Button("   Player 1", w * 7 / 16, 10);
var changePlayer = new Button("Be Player 2", w * 2 / 3, 120);
var hasPicked = false;



window.addEventListener("click", function (event) {
    var rect = cv.getBoundingClientRect();
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
    this.console.log(x + " " + y);

    if (x > changePlayer.x && x < changePlayer.x + buttonW && y > changePlayer.y && y < changePlayer.y + buttonH) {
        cards = [
            [1],
            [1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ];
        hasPicked = false;
        currentRow = -1;
        cPlayer.text == "   Player 1" ? cPlayer.text = "   Player 2" : cPlayer.text = "   Player 1";
    }

    if (cards[0].length == 0 && cards[1].length == 0 && cards[2].length == 0 && cards[3].length == 0) {
        cPlayer.text == "   Player 1" ? this.alert("Player 2 won!") : this.alert("Player 1 won!");
        cards = [
            [1],
            [1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ];
        currentRow = -1;
        hasPicked = false;
        cPlayer.text = "   Player 1";

    }

    if (x > endTurn.x && x < endTurn.x + buttonW && y > endTurn.y && y < endTurn.y + buttonH) {
        currentRow = -1;
        if (hasPicked == true) {
            cPlayer.text == "   Player 1" ? cPlayer.text = "   Player 2" : cPlayer.text = "   Player 1";
        }

        hasPicked = false;
    }

    if (x > buttonArray[3].x && x < buttonArray[3].x + buttonW && y > buttonArray[3].y && y < buttonArray[3].y + buttonH) {
        if ((currentRow == -1 || currentRow == 3) && cards[3].length != 0) {
            cards[3].pop();
            currentRow = 3;
            hasPicked = true;
        }

    }
    if (x > buttonArray[2].x && x < buttonArray[2].x + buttonW && y > buttonArray[2].y && y < buttonArray[2].y + buttonH) {
        if ((currentRow == -1 || currentRow == 2) && cards[2].length != 0) {
            cards[2].pop();
            currentRow = 2;
            hasPicked = true;
        }

    }
    if (x > buttonArray[1].x && x < buttonArray[1].x + buttonW && y > buttonArray[1].y && y < buttonArray[1].y + buttonH) {
        if ((currentRow == -1 || currentRow == 1) && cards[1].length != 0) {
            cards[1].pop();
            currentRow = 1;
            hasPicked = true;
        }

    }
    if (x > buttonArray[0].x && x < buttonArray[0].x + buttonW && y > buttonArray[0].y && y < buttonArray[0].y + buttonH) {
        if ((currentRow == -1 || currentRow == 0) && cards[0].length != 0) {
            cards[0].pop();
            currentRow = 0;
            hasPicked = true;
        }

    }
    if (x > reset.x && x < reset.x + buttonW && y > reset.y && y < reset.y + buttonH) {
        cards = [
            [1],
            [1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ];
        currentRow = -1;
        hasPicked = false;
    }
}, false);


function Button(text, x, y) {
    this.text = text;
    this.x = x;
    this.y = y;

    this.draw = function () {
        c.fillStyle = "black";
        c.fillRect(this.x, this.y, buttonW, buttonH);
        c.textBaseline = "middle";
        c.fillStyle = "white";
        c.font = "17px Times New Roman";
        c.fillText(this.text, this.x, this.y + buttonH / 2);
        //+ c.measureText(this.text).width/2
    }

}

var buttonArray = [];
for (var i = 0; i < cards.length; i++) {
    buttonArray.push(new Button("   Remove", 548, 91 + i * 80));
}
var reset = new Button("    Reset", w * 2 / 3, 280);

var endTurn = new Button("  End Turn", w * 2 / 3, 200);




function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, w, h);
    for (var i = 0; i < cards.length; i++) {
        for (var j = 0; j < cards[i].length; j++) {
            c.drawImage(img, 140 + (j + 1) * 60 - i * 60, (i + 1) * 80);
        }
    }


    for (var i = 0; i < cards.length; i++) {
        buttonArray[i].draw();
    }
    reset.draw();
    endTurn.draw();

    cPlayer.draw();
    changePlayer.draw();

    for (var i = 0; i < rules.length; i++) {
        c.textBaseline = "middle";
        c.fillStyle = "black";
        c.font = "19px Times New Roman";
        c.fillText(rules[i], 70, 463 + i * 23);
    }
    c.fillText("Current Player: ", w * 5 / 16, 30);

}
requestAnimationFrame(animate);











































































/*
// c.beginPath();
// c.arc(w/2, h/2, 50, 0, Math.PI * 2);
// c.stroke();

// c.fillRect(100,100,200,100);

// c.beginPath();
// c.moveTo(w / 2, h / 2);
// for (var i = 0; i < 111; i++) {
//     var cw = Math.random() * w;
//     var ch = Math.random() * h;
//     c.lineTo(cw, ch);
// }
// c.stroke();

function Zxcv(x, y) {
    this.x = x;
    this.y = y;

    this.draw = function() {
        c.beginPath();
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        c.arc(this.x, this.y, 50, 0, Math.PI * 2);
        c.stroke();
    }
}


var zxcArray = [];
for(var i = 0; i < 100; i++){
    zxcArray.push(new Zxcv(Math.random() * w, Math.random() * h));
}

var x = 200;
var dx = 1;
function animate() {

    // c.clearRect(0,0,w,h);
    // c.beginPath();
    // c.arc(x,200, 50, 0, Math.PI * 2);
    // c.strokeStyle = 'blue';
    // c.stroke();
    // requestAnimationFrame(animate);
    // x += dx;
    // x = x%w;

    // var asd = new Zxcv(100, 1);
    // asd.draw();
    for(var i = 0; i < 100; i++){
        zxcArray[i].draw();
    }


}

requestAnimationFrame(animate);

*/