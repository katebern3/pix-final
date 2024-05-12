let capture;
let canvasWidth = 640;
let canvasHeight = 886;
let x, y;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = (windowWidth - canvasWidth) / 2;
  y = (windowHeight - canvasHeight) / 2;

  // Create the capture and position it
  capture = createCapture(VIDEO);
  capture.size(canvasWidth, canvasHeight);
  capture.hide(); // Hide the video element

  // Set the background to black
  background(0);
}

function draw() {
  // Draw the video capture
  image(capture, x, y);

  // Load the pixels from the video capture
  capture.loadPixels();
  let stepSize = 5; // Pixel size

  // Nested loops to iterate through each pixel and draw rectangles
  for (let yy = 0; yy < capture.height; yy += stepSize) {
    for (let xx = 0; xx < capture.width; xx += stepSize) {
      let index = (xx + yy * capture.width) * 4;
      let r = capture.pixels[index];
      let g = capture.pixels[index + 1];
      let b = capture.pixels[index + 2];

      // Round each color value to the nearest specified color
      r = roundToColor(r, [255, 0, 255, 128, 255]);
      g = roundToColor(g, [0, 0, 192, 0, 255]);
      b = roundToColor(b, [0, 255, 203, 128, 0]);

      fill(r, g, b);
      rect(x + xx, y + yy, stepSize, stepSize);
    }
  }
}

// Function to round a color value to the nearest specified color
function roundToColor(value, colors) {
  let minDistance = Infinity;
  let closestColor = 0;

  for (let i = 0; i < colors.length; i++) {
    let distance = Math.abs(value - colors[i]);
    if (distance < minDistance) {
      minDistance = distance;
      closestColor = colors[i];
    }
  }

  return closestColor;
}
