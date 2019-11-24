class Ground {
    constructor(w) {
        this.w = w;
        this.h = Environment.groundLevel;
        this.fric = Environment.friction;
    }

    show() {
        fill(51, 51, 51);
        noStroke();
        rect(-offsets.x, -this.h + offsets.y, this.w, this.h);
    }
}