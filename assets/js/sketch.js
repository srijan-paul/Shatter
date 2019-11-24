let ball, ground, targets, loop = true,
    particles = [],
    track, lastDespawn, now, scoreboard;

function init() {
    translate(width / 2, height / 2);
    ball = new Ball(0, 0, BallProperties.radius, BallProperties.mass);
    ground = new Ground(width);
    targets = [];
    particles = [];

    // track = new Sound('sound/Combichrist - Never Surrender.mp3');
    // track.play();
    for (let i = 0; i < 3; i++) {
        targets.push(new Target(random(targetProperties.radius - offsets.x, width - offsets.x - targetProperties.radius),
            -Environment.groundLevel - random(100, 300) + offsets.y - targetProperties.radius));
    }

    scoreboard = new ScoreBoard(0, width - offsets.x - 200, -height + offsets.y + 30);

}

const mouse = {
    x: undefined,
    y: undefined
}

function draw() {
    now = Date.now();
    background(0, 0, 0);

    ground.show();
    ball.show();
    scoreboard.show();
    ball.update();
    if (targets.length < 3 && now - lastDespawn >= 1500) {
        targets.push(new Target(random(targetProperties.radius - offsets.x, width - offsets.x - targetProperties.radius),
            -Environment.groundLevel - random(50, 100) + offsets.y - targetProperties.radius));
        lastDespawn = now;
    }
    for (let target of targets) {
        target.show();
        target.update();
        target.detectCollision();
    }
    for (let particle of particles) {
        particle.show();
        particle.update();
    }

    if (!ball.alive) {
        loop = false;
        showGameOverText();
    }

    if (loop) {
        requestAnimationFrame(draw);
    }
}

function showGameOverText() {
    fill('red')
    textSize(40);
    text('Game Over !!', -10, 100);
}

window.addEventListener("resize", () => {
    loop = false;
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    width = ctx.canvas.width;
    height = ctx.canvas.height;
    init();
    loop = true;
});

window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

init();
draw();