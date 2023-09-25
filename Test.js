<style type="text/css">@import url('https://fonts.cdnfonts.com/css/din-2');
@import url('https://fonts.cdnfonts.com/css/century-schoolbook');

.container2 {

    margin: auto;
  display: inline-block;
  width: 80%;
}
.content{
  margin: auto;

}

canvas {
    margin-left: 5%;
    width: 100%;
    height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid black;
}

input[type=text] {
  width: 50%;
  padding: 12px 20px;
  margin:auto;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  font-size: 16px;
  resize: none;
}

button[type=button] {
  margin: auto;
  display: block;
  background-color: #005596;
  color: white;
  padding: 14px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
 }

button[type=button]:hover {
  background-color: #023b67;
}
label[for="font-select"] {
  font-size: 18px;
  color: black;
  margin: auto;
}
label[for="size-select"] {
  font-size: 18px;
}
label[for="text"] , label[for="text2"]{
  font-size: 18px;
  color: black;
}
#font-select {
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  margin:auto;
}
#feedback, #feedback2 {
  margin: auto;
  width: 50%;
  padding: 10px;
  font-size: 18px;
  color: black;
}
</style>
<div class="container2"><canvas id="canvas"></canvas><br />
<!-- <div class="content"> -->
<form><br />
<br />
<label for="text">Enter text: (max 50 characters) </label> <input id="text" maxlength="70" name="text" onkeyup="removeSpaces(this)" type="text" /><br />
&nbsp;
<div id="feedback">&nbsp;</div>
<br />
<label for="text">Enter Name: (max 25 characters) </label> <input id="name" maxlength="35" name="name" onkeyup="removeSpaces2(this)" type="text" /><br />
&nbsp;
<div id="feedback2">&nbsp;</div>
<br />
<label for="font-select">&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Select font: </label> <select id="font-select"><option value="din-2014">DIN</option><option value="Century Schoolbook">Century Schoolbook</option> <!-- To add new font - <option value="Times New Roman">Times New Roman</option> --> </select><br />
<br />
<button onclick="draw()" type="button">Draw</button> <!-- <a download="image.png" id="download" style="display: none;"><button type="button">Download</button></a> --></form>
<!-- </div> --></div>
<link href="https://fonts.cdnfonts.com/css/century-schoolbook" rel="stylesheet" />
<link href="https://fonts.cdnfonts.com/css/din-2" rel="stylesheet" /><script>
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
var image = new Image();
image.src = 'https://www.uwindsor.ca/engineering/sites/uwindsor.ca.engineering/files/brick2.png';


//draw the image on the canvas

image.onload = function () {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
    draw();
};
function removeSpaces(elem) {
    var input = elem.value;
    var nonWhitespaceLength = input.replace(/\s+/g, '').length; // Count non-whitespace characters
    if (nonWhitespaceLength > 50) {
        var excessChars = nonWhitespaceLength - 50;
        var startPos = input.length - (input.split(/\s+/, excessChars).join('').length);
        input = input.slice(0, startPos);
        document.getElementById("feedback").textContent = "You have exceeded the maximum character count. Please remove " + excessChars + " characters and try again.";
    } else {
        document.getElementById("feedback").textContent = "Character count - " + nonWhitespaceLength;
    }
    elem.value = input;
}
function removeSpaces2(elem) {
    var input = elem.value;
    var nonWhitespaceLength = input.replace(/\s+/g, '').length; // Count non-whitespace characters
    if (nonWhitespaceLength > 25) {
        var excessChars = nonWhitespaceLength - 25;
        var startPos = input.length - (input.split(/\s+/, excessChars).join('').length);
        input = input.slice(0, startPos);
        document.getElementById("feedback2").textContent = "You have exceeded the maximum character count. Please remove " + excessChars + " characters and try again.";
    } else {
        document.getElementById("feedback2").textContent = "Character count - " + nonWhitespaceLength;
    }
    elem.value = input;
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0);
    const text = document.getElementById('text').value;
    const fontSize = 48;
    const maxWidth = canvas.width * 0.52; //.67/0.65 , .54/.52
    const lineHeight = fontSize * 1.1;

    const words = text.split(" ");
    let lines = [];
    let currentLine = words[0];
    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = ctx.measureText(currentLine + " " + word).width;

        // If the current line with the new word is too wide, start a new line
        if (width > maxWidth) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            // Otherwise, add the new word to the current line
            currentLine += " " + word;
        }
    }
    lines.push(currentLine);
    const name = document.getElementById('name').value;
    if (name.trim() !== '') { // Check if the name field is not empty
        const name2 = "- " + name;
        lines.push(name2);
    }
    console.log(lines);
    const font = document.getElementById('font-select').value;

    ctx.font = fontSize + 'px ' + font;
    ctx.save();

    ctx.fillStyle = 'black';
    ctx.textAlign = 'middle';

    // Calculate the total height of the text
    const totalHeight = (lines.length + 1) * lineHeight;

    // Calculate the starting y-coordinate to center the text vertically
    const startY = (canvas.height - totalHeight * 0.95) / 2;
    // Draw the lines on the canvas
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const lineWidth = ctx.measureText(line).width;
        const startX = (canvas.width - lineWidth) / 2;
        if (i === (lines.length - 1)){
            ctx.fillText(line, startX, startY + (i + 1.4) * lineHeight);
        }
        else {
            ctx.fillText(line, startX, startY + (i + 1) * lineHeight);
        }
    }
    ctx.restore();
}</script><quillbot-extension-portal></quillbot-extension-portal><quillbot-extension-portal></quillbot-extension-portal>