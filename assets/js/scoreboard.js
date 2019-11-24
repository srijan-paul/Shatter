class ScoreBoard{
    constructor(score, x, y){
        this.score = score;
        this.x = x;
        this.y = y;
        this.color = '#e8eb34'
    }

    show(){
        fill(this.color);
        textSize(30);
        text('Score : ' + this.score, this.x, this.y);
    }
}