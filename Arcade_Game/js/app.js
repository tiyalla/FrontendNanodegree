// Enemies our player must avoid
class Enemy {
    constructor(){
        this.sprite = 'images/enemy-bug.png';
        this.setSpeedAndPosition();
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt){
        //randomly resets enemy's position and speed when enemy is off the board
        if (this.x > 450 ) {
           this.setSpeedAndPosition();
        }
        else {
            this.x += this.speed * dt;
        }
        //checks for enemy collision with player and resets player if collision occurred
        if(player.x < this.x + 60 &&
            player.x +30 > this.x &&
            player.y < this.y+35 &&
            player.y + 40 > this.y){
            player.reset();
            if(player.score > 0){
                player.score -=1;
            }
            setScore();
        }
    }
    // Draws enemy on the screen
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // This sets enemy's speed and position
    setSpeedAndPosition(){
        this.x = -50;
        this.y = Math.floor(Math.random() * (230 - 10 + 1)) + 10;
        this.speed = Math.floor(Math.random() * (450 - 50 + 1)) + 60;
    }
}

// Player must avoid enemy
class Player {
    constructor() {
        this.x = 200;
        this.y = 450;
        this.sprite = 'images/char-princess-girl.png';
        this.score = 0;
        this.counter = 0;
    }

    update() {
        if(this.y <= 0 && this.counter === 0){
            this.isWin();
            this.score+=1;
            setScore();
            this.counter+=1;
            console.log(this.score);
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(key) {
        (key === "up" && this.y > 0) ? this.y -= 40 : this.y = this.y;
        (key === "down" && this.y < 450) ? this.y += 40 : this.y = this.y;
        (key === "left" && this.x > 0) ? this.x -= 50 : this.x = this.x;
        (key === "right" && this.x < 450) ? this.x += 50 : this.x = this.x;
    }

    reset(){
        this.x = 200;
        this.y = 450;
        this.counter = 0;
    }

    isWin() {
        setTimeout(function (player) {
            player.reset();
        },100, this);
    }
}

//update div components to view score
function setScore() {
    let score = document.querySelector('.score span');
    score.innerText = player.score;
}


// Instantiate objects.
let allEnemies = [];
let player = new Player();
const createEnemies = () => {
    for(let i = 0; i < 2; i++){
        let enemy = new Enemy();
        allEnemies.push(enemy);
    }
};
createEnemies();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
