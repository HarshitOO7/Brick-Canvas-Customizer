const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
var image = new Image();
//brick image source
image.src = 'https://www.uwindsor.ca/engineering/sites/uwindsor.ca.engineering/files/brick2.png';
var img1 = new Image();

//draw the image on the canvas
image.onload = function () {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
    draw();
};
//To increase the number of characters allowed, change the number in the if statement and the statement below it
//for text
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
//To increase the number of characters allowed, change the number in the if statement and the statement below it
//for name
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
    //select font size here
    const fontSize = 48;
    //select max width for adjusting the lines here  i.e max width each line can have
    const maxWidth = canvas.width * 0.50; 
    //lineHeight is the space between lines
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
    const name2 = document.getElementById('name').value; //change back to name
    //line image source
    img1.src= 'https://www.uwindsor.ca/engineering/sites/uwindsor.ca.engineering/files/line1.png'

    //adding "- " before the name
    // if (name.trim() !== '') { // Check if the name field is not empty
    //     const name2 = "- " + name;
    //     lines.push(name2);
    // }
    lines.push(name2);
    const font = document.getElementById('font-select').value;
    ctx.font = fontSize + 'px ' + font;
    //select font color here
    ctx.fillStyle = 'black';
    ctx.textAlign = 'middle';
    ctx.save();
    // Calculate the total height of the text
    const totalHeight = (lines.length + 1) * lineHeight;

    // Calculate the starting y-coordinate to center the text vertically
    const startY = (canvas.height - totalHeight * 0.95) / 2;
    // Draw the lines on the canvas
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const lineWidth = ctx.measureText(line).width;
        const startX = (canvas.width - lineWidth) / 2;
        if (i === (lines.length - 1)) {
            const lineY = startY + (i + 0.37) * lineHeight + 10; // adjust the vertical position of the line
            // ctx.beginPath();
            // ctx.moveTo(startX - lineWidth / 2, lineY);
            // ctx.lineTo(startX + lineWidth / 2, lineY);
            // ctx.lineTo(startX + lineWidth*1.5, lineY );
            // ctx.strokeStyle = "#000";
            // ctx.stroke();
            // ctx.beginPath();
            // ctx.moveTo(startX - line Width / 2, lineY);
            // ctx.lineTo(startX + lineWidth / 2, lineY);
            // ctx.lineTo(startX + lineWidth*1.5, lineY );
            // ctx.strokeStyle = "#000";
            // ctx.lineWidth = 4;
            // ctx.setLineDash([22, 5]);
            // ctx.stroke();
            // ctx.setLineDash([]);
            ctx.drawImage(img1, startX - 200, startY + (i) * lineHeight -14);
            ctx.fillText(line, startX, startY + (i + 1.5) * lineHeight);
        }
        else {
            ctx.fillText(line, startX, startY + (i + 1) * lineHeight);
        }
    }
    ctx.restore();




}   