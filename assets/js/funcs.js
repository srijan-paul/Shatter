const ctx = document.getElementById('ctx').getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let width = ctx.canvas.width;
let height = ctx.canvas.height;

let strokeMode = true;
let fillMode = true;

const scale = {
    x: 1,
    y: 1
}

const Font = {
    size : 30,
    style : 'Consolas'
}

const offsets = {
    x: 0,
    y: 0
}

const colorModes = {
    HSL: 1,
    RGB: 2,
    HEX: 3
}

const strokeWeight = (num) => {
    if (num > 0 && num < 9) {
        ctx.lineWidth = num;
    }
}

const noStroke = () => {
    strokeMode = false;
}

const noFill = () => {
    fillMode = false;
}

const setScale = (xs, ys) => {
    scale.x = xs;
    scale.y = ys;
}

const translate = (x, y) => {
    ctx.translate(x, y);
    offsets.x = x;
    offsets.y = y;
}
const line = (x, y, x2, y2) => {
    ctx.beginPath();
    ctx.moveTo(scale.x * x, scale.y * y);
    ctx.lineTo(scale.x * x2, scale.y * y2);
    ctx.stroke();
}



const point = (x, y) => {
    ctx.strokeRect(scale.x * x, scale.y * y, 1, 1);
}

const background = (r, g, b) => {
    temp = ctx.fillStyle;
    ctx.fillStyle = `rgba(${r},${g},${b},1)`;
    ctx.fillRect(-offsets.x, -offsets.y, width, height);
    ctx.fillStyle = temp;
}

const stroke = (r, g, b) => {
    strokeMode = true;
    if (typeof r == "string") {
        ctx.strokeStyle = r;
    } else {
        ctx.strokeStyle = `rgba(${r},${g},${b},1)`;
    }

}

const fill = (r, g, b, type) => {
    fillMode = true;
    if (typeof r == "string") {
        ctx.fillStyle = r;
    } else if (type == colorModes.HSL) {
        ctx.fillStyle = `hsl(${r},${g}%,${b}%)`
    } else {
        ctx.fillStyle = `rgba(${r},${g},${b},1)`;
    }
}

const rect = (x, y, w, h) => {
    if (strokeMode) {
        ctx.strokeRect(x, y, w, h);
    }
    if (fillMode) {
        ctx.fillRect(x, y, w, h);
    }

}

const circle = (x, y, r) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    if (strokeMode) ctx.stroke();
    if (fillMode) ctx.fill();

}

const ellipse = (x, y, r1, r2) => {
    ctx.beginPath();
    ctx.ellipse(x, y, r1, r2, 0, 0, 2 * Math.PI);
    if (fillMode) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
}

const shadow = (color, blur) => {
    ctx.shadowBlur = blur;
    ctx.shadowColor = color;
}

const noShadow = () => {
    ctx.shadowBlur = 0;
    ctx.shadowColor = "";
}

const sqrt = (x) => {
    return Math.sqrt(x);
}

const floor = (x) => {
    return Math.floor(x);
}

const pow = (x, power) => {
    return Math.pow(x, power);
}

const random = (a, b) => {
    if (a != undefined && b != undefined) {
        if (a > b)
            return Math.random() * (b - a) + a;
        else
            return Math.random() * (a - b) + b;
    } else if (a != undefined) {
        return Math.random() * a;
    } else {
        return Math.random();
    }
}


// Math constants. 
const PI = Math.PI;

const text = (txt, x, y) => {
    ctx.font = Font.size + 'px ' + Font.style;
    ctx.fillText(txt, x, y);
}

const textSize = (size) => {
    Font.size = size;
}

const textStyle = (str) => {
    Font.style = str;
}