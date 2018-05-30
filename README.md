# The Frogger (An Arcade Game)
##### *A Udacity FEND Project*

## About The Game

Simple arcade game, called The Frogger. Part of Udacity's [Front End Nanodegree](https://eu.udacity.com/course/front-end-web-developer-nanodegree--nd001) program (Project 4). 

## Setup

Play the game [HERE](https://todiros.github.io/frogger/). 
    
Alternatively, you can host it yourself by running `index.html` with `js`, `css` and `images` folders on a web server.  

## How To Play

##### Overview & Control

Once the game is loaded, you'll see a character in the bottom of the game board. The character is controlled by the player using the keyboard arrow keys (←, ↑, →, ↓) or alternatively (A, W, D, S). You will also see enemies in the form of bugs going at random speeds horizontally, randomly positioned on four rows above the character (player). 

On the top left corner of the game board, player's remaining hearts (life) will be shown. And on the bottom left, current score. 

Below the game board a simple navigation will be present. The **restart** button will ... well, restart the game, reseting the player's position, score and hearts. Next to it, the **instructions** button will link back to this page, for additional information about the game. 

##### Goal

The goal for the player is to cross the field (reach the top of the board) safely, without colliding with the enemies (bugs). Once the player crossed successfully, the player will receive points to the overall score. The player will also be reset back to the starting position. 

##### Scoring

The scoring system is based on player's moves as such:

* 5 moves (minimum to cross) = 200 points
* 6 moves = 190 points
* 7 moves = 180 points
* ... 
* 10+ moves = 100 points (minimum amount of points awarded for successful cross)

There are multiple surprises laying behind certain score thresholds.   

##### Penalties

On *collision*, the player will lose a heart (life) and will also be reset back to the starting position. Once all hearts / life (3) are lost, the game is over. In that case, a modal will appear and the player will have the option to restart the game and try again. 


## Technology

* Pure JavaScript (ES6)
* Clean CSS
* HTML 

## Credits

* Core project files (engine and resources) provided by Udacity
* Background from [Pixabay](https://pixabay.com/en/background-mesh-triangles-polygon-1430105)




