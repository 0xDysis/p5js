let maxDepth = 6;
let zoom = 1;
let zoomDirection = 1;

function setup() {
  createCanvas(710, 710);
  noFill();
  stroke(255);
}

function draw() {
  clear();
  
  translate(width / 2, height / 2);

  // Draw the boundary of the Poincaré disk
  ellipse(0, 0, width, height);

  // Apply the zoom effect only to the fractal pattern
  push();
  scale(zoom);

  // Draw a fractal pattern of circles within the Poincaré disk
  drawCircle(0, 0, width / 2, 0);

  pop();

  // Update the zoom effect
  if (zoom <= 0.1 || zoom >= 1) {
    zoomDirection *= -1; // Reverse the zoom direction when it reaches the limit
  }
  zoom += zoomDirection * 0.01; // Change the zoom level
}

// Function to draw a circle and recursively draw smaller circles around it
function drawCircle(x, y, d, depth) {
  // Adjust the scale based on the current level of recursion
  let scalingFactor = pow(0.5, depth / maxDepth);
  push();
  scale(scalingFactor);
  
  // Stop drawing circles when they would exceed the boundary of the disk at the initial scale
  if (dist(0, 0, x, y) + d > width / 2) {
    pop();
    return;
  }

  ellipse(x, y, d * 2);

  if (depth < maxDepth) {
    // Each circle is surrounded by six smaller circles
    for (let i = 0; i < 6; i++) {
      let angle = PI / 3 * i;
      let newX = x + cos(angle) * d * 2 / 3; // Adjust the position based on the hyperbolic geometry
      let newY = y + sin(angle) * d * 2 / 3; // Adjust the position based on the hyperbolic geometry
      drawCircle(newX, newY, d / 3, depth + 1);
    }
  }
  
  pop();
}