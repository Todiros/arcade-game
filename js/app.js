class Enemy {
    constructor() {
        // random number between 0 and 3, coresponding to each row
        let randomRow = Math.round(Math.random() * 3);

        let randomSprite = Math.round(Math.random() * 3);
        const availableSprites = [
            'images/enemy-bug.png', 
            'images/blue-enemy-bug.png', 
            'images/green-enemy-bug.png',
            'images/red-enemy-bug.png'
        ];

        this.rows = [60, 145, 230, 315];

        // initial position, outside canvas between -100 and -200
        this.x = -(Math.round(Math.random() * 100) + 100);
        this.y = this.rows[randomRow];

        // random speed setter (80 - 300)
        this.speed = Math.round(Math.random() * 220) + 80;
        this.sprite = availableSprites[randomSprite];
    }

    // set the bug back to the starting position once it gets out of frame (canvas)
    setInitialX() {
        return -(Math.round(Math.random() * 100) + 100);
    }

    setRow() {
        return Math.round(Math.random() * 3);
    }

    // pauses the bugs in their current position
    // used when the modal on loss is displayed
    freeze() {
        this.speed = 0;
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

        this.moves = 0;
        this.collision = false;
        this.crossed = false;
        this.unmoveable = false;
        this.sprite = 'images/char-boy.png';
    }

    // player's starting position
    reset() {
        this.x = 200; 
        this.y = 400;
        this.moves = 0;
    }

    handleInput(key) {
        if (!this.unmoveable) {
            if (key === 'left' || key === 'a') {
                this.moves++;
                if (this.x > 0)
                    this.x -= 100; // one column to the left
            } else if (key === 'up' || key === 'w') {
                this.moves++;
                if (this.y >= 60) 
                    this.y -= 85; // one row up
                if (this.y == -25) {
                    this.unmoveable = true;
                    // this allows the character to get to the last row before being reset back to the first row
                    setTimeout(() => { this.crossed = true; }, 400);
                }
            } else if (key === 'right' || key === 'd') {
                this.moves++;
                if (this.x < 400)
                    this.x += 100; // one column to the right
            } else if (key === 'down' || key === 's') {
                this.moves++;
                if (this.y < 400)
                    this.y += 85; // one row down
            }
        }
    }

    update() {
        if (this.crossed) {
            this.crossed = false;
            this.unmoveable = false;
            
            if (this.moves === 5) {
                score.count += 100;
            } else if (this.moves < 10) {
                score.count += this.moves * 10; 
            }

            score.count += 100;
            this.reset();

            if (score.count >= 1000 && score.count <= 1200) {
                congratsMsg();
            } else if (score.count >= 3000) {
                surpriseScreen();
            }
        }

        if (this.collision) {
            this.collision = false;

            lives.reduce();
            this.reset();

            if (lives.count === 0) {
                this.unmoveable = true;
                pauseGame();
                toggleModal();
            }
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

    reset() {
        this.count = 3;
    }

    static get spriteWidth() {
        return 40;
    }

    static get spriteHeight() {
        return 60;
    }

    render() {
        let xPos = this.x;

        // renders heart sprites based on the current lives count
        for (let index = 0; index < this.count; index++) {
            ctx.drawImage(Resources.get(this.sprite), xPos, this.y, Lives.spriteWidth, Lives.spriteHeight);
            xPos += this.x + 10;
        }
    }
}

class Score {
    constructor() {
        this.x = 20;
        this.y = 575;

        this.count = 0;
    }

    reset() {
        this.count = 0;
    }

    render() {
        ctx.font = "20px Impact";
        ctx.fillText("SCORE:", this.x, this.y);
        ctx.font = "25px Impact";
        ctx.fillText(this.count, this.x + 105, this.y);
    }
}

function pauseGame() {
    allEnemies.forEach((enemy) => {
        enemy.freeze();
    })
}

function gameRestart() {
    player.reset();
    lives.reset();
    score.reset();
}

let allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];
let player = new Player();
let lives = new Lives();
let score = new Score();

function congratsMsg() {
    const msg = document.getElementsByClassName('header-msg')[0];

    msg.innerHTML = 'Congrats! You reached 1000 points. Keep going! ;)';
}

function surpriseScreen() {
    const loseMsg = document.getElementsByClassName('lose-msg')[0];
    const easterEgg = document.getElementsByClassName('easter-egg')[0];
    const rickrolled = document.getElementsByClassName('rickrolled')[0];

    loseMsg.style.display = "none";
    easterEgg.style.display = "block";

    pauseGame();
    toggleModal();
    rickrolled.setAttribute('src', 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&showinfo=0&controls=0&disablekb=1&iv_load_policy=3');
}

function toggleModal() {
    const modal = document.getElementsByClassName('modal')[0];

    if (modal.style.display == "none" || !modal.style.display) {
        modal.style.display = "block";
    } else {
        modal.style.display = "none";
    }
}

(() => {
    const restartBtn = document.getElementsByClassName('restart')[0];
    const tryAgainBtn = document.getElementsByClassName('try-again')[0];
    
    restartBtn.addEventListener('click', () => {
        gameRestart();
    });

    tryAgainBtn.addEventListener('click', () => {
        toggleModal();
        location.reload();
    });
})();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this
// and yet, I did...
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