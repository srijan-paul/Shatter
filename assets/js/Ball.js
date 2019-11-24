class Ball {
    constructor(x, y, r, m) {
        this.position = new Vector(x, y);
        this.velocity = new Vector(BallProperties.xspeed, BallProperties.yspeed);
        this.acceleration = new Vector(BallProperties.xAcc, BallProperties.yAcc);
        this.propulsion = BallProperties.propulsion;
        this.maxSpeed = 5;
        this.mass = m;
        this.aimR = BallProperties.aimRadius;

        this.tempVelocity = this.velocity;

        this.r = r;
        this.dx = BallProperties.xspeed;
        this.dy = BallProperties.yspeed;
        this.color = BallProperties.color;
        this.clicked = false;

        this.alive = true;
        this.health = BallProperties.maxHP;
        this.healthBar = new HPBar(this.health);


        window.addEventListener("mousedown", (e) => {
            let x = e.clientX;
            let y = e.clientY;
            if (sqrt(pow(x - (this.position.x + offsets.x), 2) + pow(y - (this.position.y + offsets.y), 2)) < this.r + 20) {
                Environment.speed = 0.5;
                this.tempVelocity = this.velocity;
                this.clicked = true;
            }

        });

        window.addEventListener("mouseup", () => {
            Environment.speed = 1;
            this.velocity = this.tempVelocity;
            if (this.clicked) {
                this.clicked = false;
                this.propel(mouse.x - offsets.x, mouse.y - offsets.y);
            }

        });
    }

    show() {
        fill(this.color);
        noStroke();
        shadow(this.color, 2 * this.r);
        circle(this.position.x, this.position.y, this.r);
        noShadow();
        this.healthBar.show();
        if (this.clicked) {
            this.aim();
        }
    }

    applyForce(force) {
        let f = Vector.div(force, this.mass);
        this.acceleration.add(f);
    }

    update() {
        if (this.position.x > width - offsets.x - this.r) {
            this.position.x = width - offsets.x - this.r;
            this.velocity.x *= -Environment.friction;
        } else if (this.position.x < -offsets.x + this.r) {
            this.position.x = this.r - offsets.x;
            this.velocity.x *= -Environment.friction;
        }

        if (this.position.y > -Environment.groundLevel + offsets.y - this.r) {
            this.position.y = -Environment.groundLevel + offsets.y - this.r;
            this.velocity.y *= -Environment.friction;
        } else if (this.position.y < -offsets.y + this.r) {
            this.position.y = this.r - offsets.y;
            this.velocity.y *= -1;
        }

        if (this.position.y >= -Environment.groundLevel + offsets.y - this.r) {
            if (this.health > 0) {
                this.health -= (Environment.speed < 1) ? 0.25 : 1;
            } else {
                this.alive = false;
            }
        }

        this.applyForce(Environment.gravity);
        this.velocity.add(this.acceleration);
        this.velocity.mult(Environment.speed)
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    aim() {
        fill(255, 255, 255);
        strokeWeight(2);
        stroke(255, 255, 255);
        line(mouse.x - offsets.x, mouse.y - offsets.y, this.position.x, this.position.y);
        circle(mouse.x - offsets.x, mouse.y - offsets.y, this.aimR);
    }

    propel(x, y) {
        let f = new Vector(this.position.x - x, this.position.y - y);
        f.normalize();
        f.mult(this.propulsion);
        this.applyForce(f);
    }
}

class HPBar {
    constructor(hp) {
        this.hp = hp;
        this.currrent = hp;
    }

    show() {
        noStroke();

        fill(getHue(ball.health / BallProperties.maxHP), 100, 50, colorModes.HSL);
        rect(HPBarProperties.x - offsets.x, HPBarProperties.y - offsets.y, HPBarProperties.scale * ball.health, HPBarProperties.breadth)
    }
}

function getHue(value) {
    var hue = 120 - (1 - value) * 120;
    return hue;
}