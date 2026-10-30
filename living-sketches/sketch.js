let scannedImages = [];
let currentIndex = 0;
let time = 0;
let timer = 0;
const PAGE_DURATION = 5;
let sparkles = [];

async function setup() {
  createCanvas(800, 1000);

  const imagePromises = [];
  for (let i = 0; i < 6; i++) {
    const p = new Promise((resolve) => {
      loadImage("assets/cute" + i + ".jpg", resolve);
    });
    imagePromises.push(p);
  }

  scannedImages = await Promise.all(imagePromises);
  eraseBackground(scannedImages, 10);
}

function draw() {
  background(255);

  if (currentIndex !== 4 && currentIndex !== 5) {
    timer += deltaTime / 1000;
    if (timer >= PAGE_DURATION) {
      currentIndex = currentIndex + 1;
      timer = 0;
      sparkles = [];
    }
  }

  time += 0.05;
  let floatY = sin(time) * 15;

  imageMode(CENTER);
  let displayW = 800;
  let displayH = 950;
  image(
    scannedImages[currentIndex],
    width / 2,
    height / 2 + floatY,
    displayW,
    displayH
  );
  imageMode(CORNER);

  if (currentIndex === 4) {
    drawStaticSparkles();
  }
}

function mousePressed() {
  if (currentIndex === 4) {
    currentIndex = currentIndex + 1;
    timer = 0;
    sparkles = [];
  } else if (currentIndex === 5) {
    currentIndex = 0;
    timer = 0;
    sparkles = [];
  }
}

function keyPressed() {
  if (key === ' ' && currentIndex === 4) {
    for (let i = 0; i < 16; i++) {
      sparkles.push({
        x: random(0, 800),
        y: random(0, 1000),
        diameter: random(8, 18),
        colorHue: random(360)
      });
    }
  }
}

function drawStaticSparkles() {
  colorMode(HSB, 360, 100, 100);
  noStroke();

  for (let circleParticle of sparkles) {
    fill(circleParticle.colorHue, 90, 90);
    ellipse(circleParticle.x, circleParticle.y, circleParticle.diameter);
  }
  colorMode(RGB);
}

function eraseBackground(images, threshold = 10) {
  for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
    const currentImage = images[imageIndex];
    currentImage.loadPixels();

    for (let pixelIndex = 0; pixelIndex < currentImage.pixels.length; pixelIndex += 4) {
      let distanceFromWhite = 255 - currentImage.pixels[pixelIndex];
      distanceFromWhite += 255 - currentImage.pixels[pixelIndex + 1];
      distanceFromWhite += 255 - currentImage.pixels[pixelIndex + 2];

      if (distanceFromWhite < threshold) {
        currentImage.pixels[pixelIndex + 3] = 0;
      }
    }
    currentImage.updatePixels();
  }
}



