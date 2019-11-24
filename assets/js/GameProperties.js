const BallProperties = Object.freeze({
    color: "#cc66ff",
    radius: 30,
    xspeed: 1,
    yspeed: 0,
    xMaxSpeed: 10,
    yMaxSpeed: 10,
    xAcc: 0,
    yAcc: 0,
    mass: 0.5,
    aimRadius: 10,
    propulsion: 20,
    maxHP : 100,
});

const HPBarProperties = Object.freeze({
    x: 10,
    y : 10,
    breadth : 30,
    scale : 5
})

const targetProperties = Object.freeze({
    color: '#A9FCF9',
    radius: 20,
    xSpeed : 0,
    ySpeed : 10
});

const particleProperties = Object.freeze({
    radiusMax: 20,
    radiusMin: 10,
    xSpeedMin: -1,
    ySpeedMin: 10,
    xSpeedMax: 1,
    ySpeedMax: 15,
    mass: 1
});

const Environment = {
    speed: 1,
    gravity: new Vector(0, 0.4),
    groundLevel: 1 * width / 12,
    friction: 0.8
}

const gameSettings = {
    FPS: 60
}