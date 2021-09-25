let puntos = [];
let curve = [];
let totPuntos = 0;
let t = 0;
let flag = true;
let tiempo = 5;
let cnv;
let color = [
    [249, 65, 68],
    [243, 114, 44],
    [248, 150, 30],
    [249, 132, 74],
    [249, 199, 79],
    [144, 190, 109],
    [67, 170, 139],
    [77, 144, 142],
    [87, 117, 144],
    [39, 125, 161]
];
function setup() {
    frameRate(60);
    createCanvas(windowWidth, windowHeight);
    fill(255);
    strokeWeight(5);
    cnv = createGraphics(windowWidth, windowHeight);
    cnv.stroke(255);
    cnv.strokeWeight(5);
    cnv.noFill();
}

function draw() {
    background(3, 43, 67);
    t = (sin(PI * frameCount / (60 * tiempo)) + 1) / 2;
    drawPoints(puntos, t, 0);
    image(cnv, 0, 0);
}

function drawPoints(pnt, t, k) {
    if (pnt.length) {
        sig = [];
        stroke(color[k][0], color[k][1], color[k][2]);
        for (let i = 1; i < pnt.length; i++) {
            sig.push(percent(pnt[i], pnt[i - 1], t));
            line(pnt[i].x, pnt[i].y, pnt[i - 1].x, pnt[i - 1].y);
        }
        for (let i = 0; i < pnt.length; i++) {
            pnt[i].display();
        }
        k++;
        //console.log(i);
        drawPoints(sig, t, k);
    }
    if (pnt.length === 1 && flag) {
        if (curve.length > 60 * tiempo * 2) {
            flag = false;
            console.log("Done");
        } else {
            cnv.clear();
            curve.push(pnt[0]);
            cnv.beginShape();
            for (let i = 0; i < curve.length; i++) {
                cnv.curveVertex(curve[i].x, curve[i].y);
            }
            cnv.endShape();
        }
    }
}

function mouseReleased() {
    if (totPuntos != color.length) {
        totPuntos++;
        puntos.push(new Point(mouseX, mouseY));
    }
    curve = [];
    cnv.clear();
    flag = true;
}

function percent(ultimo, penult, t) {
    let x = (ultimo.x * (1 - t) + penult.x * t);
    let y = (ultimo.y * (1 - t) + penult.y * t);
    return new Point(x, y);
}

class Point {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    display() {
        circle(this.x, this.y, 20);
    }
}