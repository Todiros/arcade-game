class Enemy {
    constructor() {
        // random number between 0 and 3, coresponding to each row
        let randomRow = Math.round(Math.random() * 3);
        this.rows = [60, 145, 230, 315];

        // initial position, outside canvas between -100 and -200
        this.x = -(Math.round(Math.random() * 100) + 100);
        this.y = this.rows[randomRow];

        // random speed setter (80 - 300)
        this.speed = Math.round(Math.random() * 220) + 80;
        this.sprite = 'images/enemy-bug.png';
    }

    setInitialX() {
        return -(Math.round(Math.random() * 100) + 100);
    }

    setRow() {
        return Math.round(Math.random() * 3);
    }

    update(dt) {
        this.x += dt * this.speed;

        if (this.x > 500) {
            // reset the enemy to random position behind the canvas
            this.x = this.setInitialX();

            // randomizing enemy position on each update
            this.y = this.rows[this.setRow()];
        }

        // check whether the player and the enemy are in the same row
        // ... and if they're overlapping (colliding)
        if (this.y == player.y && (this.x > player.x - 70 && this.x < player.x + 60)) {
            player.collision = true;
        };
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// ----- PLAYER CLASS -----

class Player {
    constructor() {
        this.x = 200;
        this.y = 400;
        
        this.lives = 3;
        this.score = 0;
        this.collision = false;
        this.crossed = false;
        this.sprite = 'images/char-boy.png';
    }

    // player's starting position
    reset() {
        this.x = 200; 
        this.y = 400;
    }

    handleInput(key) {
        if (key === 'left' || key === 'a') {
            if (this.x > 0)
                this.x -= 100; // one column to the left
        } else if (key === 'up' || key === 'w') {
            if (this.y > 0) 
                this.y -= 85; // one row up
            else
                // reset if player gets to the top aka wins
                this.crossed = true;
        } else if (key === 'right' || key === 'd') {
            if (this.x < 400)
                this.x += 100; // one column to the right
        } else if (key === 'down' || key === 's') {
            if (this.y < 400)
                this.y += 85; // one row down
        }
    }

    update() {
        if (this.crossed) {
            this.crossed = false;
            
            this.reset();
        }

        if (this.collision) {
            this.collision = false;

            lives.reduce();
            player.reset();
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Lives {
    constructor() {
        this.x = 10;
        this.y = 10;

        this.count = 3;
        this.sprite = 'images/Heart.png';

        const spriteWidth = 40;
        const spriteHeight = 60;
    }

    reduce() {
        this.count--;
    }

    static get spriteWidth() {
        return 40;
    }

    static get spriteHeight() {
        return 60;
    }

    render() {
        let xPos = this.x;

        for (let index = 0; index < this.count; index++) {
            ctx.drawImage(Resources.get(this.sprite), xPos, this.y, Lives.spriteWidth, Lives.spriteHeight);
            xPos += this.x + 10;
        }
    }
}

let allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];
let player = new Player();
let lives = new Lives();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this
// and yet, I did
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