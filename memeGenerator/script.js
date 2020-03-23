//canvas variables
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var c = canvas.getContext("2d");
var w = canvas.width;
var h = canvas.height;


const anchor = document.querySelector('a');
const rand = i => Math.random() * i << 0
const fileName = `image${100 + rand(100)}.png`;
function onClickAnchor(e) {
    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(canvas.msToBlob(), fileName);
        e.preventDefault();
    } else {
        anchor.setAttribute('download', fileName);
        anchor.setAttribute('href', canvas.toDataURL());
    }
}
anchor.addEventListener('click', onClickAnchor);

//meme related variables
var topCaption = "TOP TEXT";
var bottomCaption = "BOTTOM TEXT";
var tcFont = 42;
var bcFont = 42;
var bgImage = new Image();
var topCaptionColor = '#ffffff';
var bottomCaptionColor = '#ffffff';
//top caption event listener
var topTXT = document.getElementById('topText');
topTXT.addEventListener('keyup', function () {
    topCaption = document.getElementById('topText').value;
})
//bottom caption event listener
var bottomTXT = document.getElementById('bottomText');
bottomTXT.addEventListener('keyup', function () {
    bottomCaption = document.getElementById('bottomText').value;
})
//top text font size event listener
var topTXTfont = document.getElementById('topFont');
topTXTfont.addEventListener('change', function () {
    tcFont = document.getElementById('topFont').value;
})
//bottom text font size event listener
var bottomTXTfont = document.getElementById('bottomFont');
bottomTXTfont.addEventListener('change', function () {
    bcFont = document.getElementById('bottomFont').value;
})

//image event listener
var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);
//image upload event handler
function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var img = new Image();
        img.onload = function () {
            c.drawImage(img, 0, 0, w, h);
        }
        img.src = event.target.result;
        bgImage.src = img.src;
    }
    reader.readAsDataURL(e.target.files[0]);
}

//top caption color event listener
var tcColor = document.getElementById('topCaptionColor');
tcColor.addEventListener('change', function () {
    topCaptionColor = tcColor.value;
})
//bottom caption color event listener
var bcColor = document.getElementById('bottomCaptionColor');
bcColor.addEventListener('change', function () {
    bottomCaptionColor = bcColor.value;
})


//update canvas
function memeTime() {
    requestAnimationFrame(memeTime);
    c.clearRect(0, 0, w, h);
    c.drawImage(bgImage, 0, 0, w, h);

    //TOP CAPTION
    c.font = `${tcFont}px Impact`;
    c.textBaseline = "middle";
    c.lineWidth = 3;
    var textWidth = c.measureText(topCaption).width;
    c.strokeText(topCaption.toUpperCase(), w / 2 - textWidth / 2, h / 9);
    c.fillStyle = `${topCaptionColor}`;
    c.fillText(topCaption.toUpperCase(), w / 2 - textWidth / 2, h / 9);

    //BOTTOM CAPTION
    c.font = `${bcFont}px Impact`;
    c.textBaseline = "middle";
    c.fillStyle = `${bottomCaptionColor}`;
    var textWidthBottom = c.measureText(bottomCaption).width;
    c.strokeText(bottomCaption.toUpperCase(), w / 2 - textWidthBottom / 2, h * 8 / 9);
    c.fillText(bottomCaption.toUpperCase(), w / 2 - textWidthBottom / 2, h * 8 / 9);

}
requestAnimationFrame(memeTime);