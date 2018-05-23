// Enemies our player must avoid
class Enemy {
    constructor() {
        this.rows = [60, 140, 220, 300];
        const randomRow = Math.round(Math.random() * 3);

        this.x = 5;
        this.y = this.rows[randomRow];

        this.sprite = 'images/enemy-bug.png';
    }

    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Player {
    constructor() {
        this.x = 200;
        this.y = 405;
        this.sprite = 'images/char-boy.png';
        this.lives = 3;
        this.score = 0;
    }

    handleInput(key) {
        if (key === 'left' || key === 'a') {
            if (this.x > 0)
                this.x -= 100;
        } else if (key === 'up' || key === 'w') {
            if (this.y > -20) 
                this.y -= 85;
            else
                this.x = 200, this.y = 405;
        } else if (key === 'right' || key === 'd') {
            if (this.x < 400)
                this.x += 100; 
        } else if (key === 'down' || key === 's') {
            if (this.y < 405)
                this.y += 85;
        }
    }

    update() {
        // TODO: Implement
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

let allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];
let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        65: 'a',
        87: 'w',
        68: 'd',
        83: 's'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
