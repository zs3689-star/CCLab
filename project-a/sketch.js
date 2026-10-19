/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/

let x1 = 0;
let y1 = 0;
let w = 120;
let h = 90;
let angle = 0;
let darkMode = false;
let t = 0;
let noiseSeedVal;


let pauseTimer = 0;
let isPaused = false;
let pauseDuration;

function setup() {
    createCanvas(800, 500);
    angleMode(DEGREES);
    noiseSeedVal = random(1000);
    noiseSeed(noiseSeedVal);
}

function draw() {
    if (isPaused) {
        pauseTimer++;
        if (pauseTimer >= pauseDuration) {
            isPaused = false;
            pauseTimer = 0;
        }
    } else {
        t += 0.045;
    }

    if (t > 7) {
        noLoop();
        return;
    }


    let headX = map(t, 0, 7, 50, 750);

    let yCenter = 250;
    let amp = 220;
    let headY = yCenter + (noise(t * 0.7) - 0.5) * amp;

    drawCreature(headX, headY);

    if (random() < 0.12 && !isPaused) {
        isPaused = true;
        pauseDuration = floor(random(15, 45));
    }
}

function drawCreature(x, y) {
    push();
    translate(x, y);

    drawBody(0, 0, 200);
    drawFeet(0, 0, 1.3, angle);
    push();
    rotate(-angle);
    drawEye();
    pop();

    pop();
}

function drawBody(x, y, size) {
    angle = angle + 72 + 2;

    x1 = x1 - 0.08;
    if (x1 < -12) x1 = -12;
    if (x1 > 12) x1 = 12;

    y1 = y1 + 0.04;
    if (y1 < -8) y1 = -8;
    if (y1 > 8) y1 = 8;


    w = w - 0.9;
    if (w < 20) w = 20;

    h = h - 0.6;
    if (h < 16) h = 16;

    push();
    blendMode(ADD);

    translate(x, y);
    rotate(angle);
    noFill();
    if (darkMode) {
        stroke(255, 140, 0, 90);
    } else {
        stroke(200, 40, 90, 90);
    }
    ellipse(x1, y1, w, h);
    pop();
}


function keyPressed() {
    if (key === ' ') {
        darkMode = !darkMode;

        if (darkMode) {
            background(0);
        } else {
            background(215);
        }

        x1 = 0;
        y1 = 0;
        w = 120;
        h = 90;
        angle = 0;
        t = 0;
        isPaused = false;
        pauseTimer = 0;

        noiseSeedVal = random(1000);
        noiseSeed(noiseSeedVal);

        loop();
    }
}

function drawFeet(x2, y2, len, angle) {
    push();
    translate(x2, y2);
    rotate(angle);
    stroke(0, 0, 255, 90);
    strokeWeight(0.3);
    noFill();
    let footCount = 60;
    push();
    rotate(angle);
    line(90, 0, 60 + len, 0);
    pop();
    pop();
}

function drawEye() {
    push();
    fill(255, 255, 90, 30);
    noStroke();
    beginShape();
    vertex(-12, -48);
    vertex(12, -48);
    vertex(0, -28);
    endShape(CLOSE);
    pop();
}



