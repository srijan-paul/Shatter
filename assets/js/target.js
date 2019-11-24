class Target {
    constructor(x, y) {
        this.position = new Vector(x, y);
        this.r = targetProperties.radius;
        this.color = targetProperties.color;
        this.HPrestore = 20;
    }

    show() {
        fill(this.color);
        noStroke();
        shadow(this.color, 2 * this.r);
        circle(this.position.x, this.position.y, this.r);
        noShadow();
    }

    update() {

        if (this.position.y > -Environment.groundLevel + offsets.y - this.r * 2) {
            this.position.y = -Environment.groundLevel + offsets.y - this.r * 1.5;
        } else if (this.position.y < -offsets.y + this.r * 2) {
            this.position.y = this.r - offsets.y;
        } else {
            this.position.y += targetProperties.ySpeed;
        }

    }

    detectCollision() {
        if (sqrt(pow(this.position.x - ball.position.x, 2) + pow(this.position.y - ball.position.y, 2)) <= this.r + ball.r) {
            targets.splice(targets.indexOf(this), 1);
            this.explode();
            if (ball.health <= BallProperties.maxHP - this.HPrestore) {
                ball.health += this.HPrestore;
            } else {
                ball.health = BallProperties.maxHP;
            }

            scoreboard.score += 10;
        }

    }

    explode() {
        for (let i = 0; i < 10; i++) {
            particles.push(new Particle(this.position.x, random(this.position.y, this.position.y + this.r), this.color));
        }
        this.shatterSound.play();
        lastDespawn = Date.now();
    }
}

Target.prototype.shatterSound = new Sound('sound/break.wav');

class Particle {
    constructor(x, y, clr, r) {
        this.position = new Vector(x, y);
        this.acceleration = new Vector(0, 0);
        this.color = clr;
        if (r) {
            this.r = r;
        } else {
            this.r = random(particleProperties.radiusMin, particleProperties.radiusMax);
        }

        this.mass = particleProperties.mass;
        this.velocity = new Vector(random(particleProperties.xSpeedMin, particleProperties.xSpeedMax),
            random(particleProperties.ySpeedMin, particleProperties.ySpeedMax));
        this.radius = random(particleProperties.radiusMin, particleProperties.radiusMax);
    }
}

Particle.prototype.show = function () {
    fill(this.color);
    noStroke();
    circle(this.position.x, this.position.y, this.r);
}

Particle.prototype.applyForce = function (force) {
    let f = Vector.div(force, this.mass);
    this.acceleration.add(f);
}

Particle.prototype.update = function () {

    if (this.position.x > width - this.r) {
        this.position.x = width - this.r;
        this.velocity.x *= -Environment.friction;
    } else if (this.position.x < -offsets.x + this.r) {
        this.position.x = this.r - offsets.x;
        this.velocity.x *= -Environment.friction;
    }

    if (this.position.y > -Environment.groundLevel + offsets.y - this.r) {
        this.position.y = -Environment.groundLevel + offsets.y - this.r;
        this.velocity.y *= -Environment.friction;
        this.r /= 4;
        if (floor(this.r) <= 0) {
            particles.splice(particles.indexOf(this), 1);
        }
    } else if (this.position.y < -offsets.y + this.r) {
        this.position.y = this.r - offsets.y;
        this.velocity.y *= -1;
    }


    this.applyForce(Environment.gravity);
    this.velocity.add(this.acceleration);
    this.velocity.mult(Environment.speed)
    this.position.add(this.velocity);
    this.acceleration.mult(0);
}