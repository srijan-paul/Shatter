class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    mult(v) {
        if (v.x != undefined && v.y != undefined) {
            this.x *= v.x;
            this.y *= v.y;
        } else {
            this.x *= v;
            this.y *= v;
        }
    }

    div(v) {
        if (v.x != undefined && v.y != undefined) {
            this.x /= v.x;
            this.y /= v.y;
        }
    }

    sub(v) {
        if (v.x != undefined && v.y != undefined) {
            this.x -= v.x;
            this.y -= v.y;
        }
    }

    add(v) {
        if (v.x != undefined && v.y != undefined) {
            this.x += v.x;
            this.y += v.y;
        }
    }

    mag() {
        return sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        let m = sqrt(this.x * this.x + this.y * this.y);
        this.x /= m;
        this.y /= m;
    }

    static div(vec, num) {
        return new Vector(vec.x / num, vec.y / num);
    }

    static mult(vec, num) {
        return new Vector(vec.x * num, vec.y * num);
    }
}