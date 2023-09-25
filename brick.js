const cnvs = document.getElementById('cnvs');
const context = cnvs.getContext('2d');
var img = new Image();
//brick image source
img.src = 'https://www.uwindsor.ca/engineering/sites/uwindsor.ca.engineering/files/brick.png';
var img1 = new Image();

//draw the image on the canvas
img.onload = function () {
  cnvs.width = img.width;
  cnvs.height = img.height;
  context.drawImage(img, 0, 0);
  func2();
};
//To increase the number of characters allowed, change the number in the if statement and the statement below it
//for text
function removeSpaces(elem) {
  var input = elem.value;
  var nonWhitespaceLength = input.replace(/\s+/g, '').length; // Count non-whitespace characters
  if (nonWhitespaceLength > 100) {
    var excessChars = nonWhitespaceLength - 100;
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
function func2() {
  context.clearRect(0, 0, cnvs.width, cnvs.height);
  context.drawImage(img, 0, 0);
  const text = document.getElementById('text').value;
  // Set your font size here
  const fontSize = 48;
  //select max width for adjusting the lines here i.e max width each line can have
  const maxWidth = cnvs.width * 0.45; // Set your desired maximum width here
  //lineHeight is the space between each line
  const lineHeight = fontSize * 1.1;

  const words = text.split(" ");
  let lines = [];
  let currentLine = words[0];
  // Iterate through the rest of the words
  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = context.measureText(currentLine + " " + word).width;

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
  const name2 = document.getElementById('name').value;
  //line image source
  img1.src= 'https://www.uwindsor.ca/engineering/sites/uwindsor.ca.engineering/files/line1.png'

  // if (name.trim() !== '') { // Check if the name field is not empty
  //   const name2 = "- " + name;
  //   lines.push(name2);
  // }
  lines.push(name2);

  const font2 = document.getElementById('font-select').value;
  context.font = fontSize + 'px ' + font2;
  context.save();
  context.fillStyle = 'black';
  context.textAlign = 'center';
  context.textAlign = 'center';

  // Calculate the total height of the text
  const totalHeight = (lines.length + 1) * lineHeight;
  // Calculate the starting y-coordinate to center the text vertically
  const startY = (cnvs.height - totalHeight * 0.95) / 2;
  // Draw the lines on the canvas
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineWidth = context.measureText(line).width;
    const startX = cnvs.width / 2;
    if (i === (lines.length - 1)) {
      context.drawImage(img1, startX - 320 , startY + (i) * lineHeight);
      context.fillText(line, startX, startY + (i + 1.7) * lineHeight);
    }
    else {
      context.fillText(line, startX, startY + (i + 1) * lineHeight);
    }
  } 
  context.restore();
}
