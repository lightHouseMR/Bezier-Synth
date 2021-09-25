let puntos = [];
let totPuntos = 0;
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
    createCanvas(windowWidth, windowHeight);
    fill(255);
    strokeWeight(5);
}

function draw() {
    background(3, 43, 67);
    for (let i = 0; i < puntos.length; i++) {
        stroke(color[i][0], color[i][1], color[i][2])
        for (let j = 0; j < puntos[i].length; j++) {
            puntos[i][j].display();
            //console.log(puntos[i][j]);
        }
    }
}

function mouseReleased() {
    puntos.push(new Array());
    totPuntos++;
    puntos[0].push(new Point(mouseX, mouseY))
    for (let i = 1; i < puntos.length; i++) {
        puntos[i].push(prom(puntos[i - 1]))
    }

    console.log("_____________")
}

function prom(list) {
    let ultimo = list[list.length - 1];
    let penult = list[list.length - 2];
    let x = (ultimo.x + penult.x) / 2;
    let y = (ultimo.y + penult.y) / 2;
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