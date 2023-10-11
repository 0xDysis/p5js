let angle = 0;
let from;
let to;

function setup() {
  createCanvas(710, 710);
  noFill();
  // Define the two colors we want to interpolate between
  from = color(255, 0, 0);
  to = color(0, 0, 255);
}

function draw() {
  clear();
  
  translate(width / 2, height / 2);
  rotate(angle);

  // Calculate a ratio (between 0 and 1) based on the current frameCount
  let ratio = abs(sin(frameCount * 0.80));
  // Interpolate between the two colors using the ratio
  let currentColor = lerpColor(from, to, ratio);
  // Set the stroke color to the interpolated color
  stroke(currentColor);

  // Draw the boundary of the Poincaré disk
  ellipse(0, 0, width, height);

  // Draw a pattern of circles within the Poincaré disk
  let numCircles = min(frameCount, 360); // Vary the number of circles up to a maximum of 360
  for (let i = 0; i < numCircles; i += 10) {
    let angle = radians(i);
    let x = cos(angle) * width / 4;
    let y = sin(angle) * height / 4;
    let d = dist(0, 0, x, y);
    let r = sqrt(sq(width / 2 - d)); // Adjust the radius based on the position
    ellipse(x, y, r * 2);
  }

  // Increase the angle for the next frame
  angle += 0.20;
}


