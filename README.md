![alt text](image.png)

INTRODUCTION
Welcome to Shape Invaders, a Space-Invaders inspired game where you play as a rocket shooting
down evil yellow squares. In this varation of the classic shooter game, your ammo is limited, and running out of ammo means death! Each successful shot, however, has a chance for the squares to drop a power-up that replenishes ammo. Even if it looks like ammo is running low and all hope is lost, the fight isn't over until its over! Good luck, have fun and may RNGesus be with you.

[Play The Game](https://faris-wong.github.io/shape_invaders/)

FEATURES

- Power-Ups: A chance based drop which rewards accuracy.
- Levels: Three different levels which spawns enemies in varying amounts and strengths.

INSTRUCTIONS

- Shoot down all the enemies to win.
- Colliding into enemies causes the player to lose a life. Losing all lives or running out of ammo results in a loss.

CONTROLS

- Arrow Keys: Move your rocket up, down, left or right.
- Spacebar: Shoot bullets.

TECHNOLOGIES USED

- HTML
- CSS
- Javascript

GAME DESIGN

- Animating movements and pseudo collision-detection
  All elements (character, enemies, and projectiles) that are seen moving in the game is done by manipulating the Document Object Model (DOM), accessing that element's CSS using the style object to change the value of the `gridRowStart` and `gridColumnStart` property. The game area is a 30 by 20 grid created using CSS grid and an element's `gridRowStart` value (ranges from 1-20) represents its position on the y-axis, and `gridColumnStart` value (ranges from 1-30) represents its position on the x-axis. Each of the 600 grids in the game area therefore, represents space in which an element can occupy.

Collision occurs in the game by having 2 elements occupy the same grid. The player moving into the enemy or vice-versa results in a life lost for the player. Similarly, if the player fired projectile moves into the same grid as an enemy, it would count as a hit on the enemy.

- Utilising Class object
  During planning I knew that I wanted this game to have many enemies and possibly customize each enemy to have different attack and movement patterns while maintaining the core concept that an enemy should be defeated (by reducing its HP to 0). My idea was to implement an enemy Class. This allowed me to create many instances of enemies each of which are unique independent objects which follow the same movement rules. This also simplified things when I wanted to change the strength of enemy or create different amounts between difficulty levels. However, in this version of the game, I did not have the chance to create sub Classes that extends from my enemy Class but my plans for future development includes creating some with new movement and attack patterns which would require the player to employ different playstyles based on the enemies they are facing.

FUTURE DEVELOPMENTS

- Add different kinds of Power-Ups (e.g., increasing bullet damage, introducing variations in bullet trajectory).
- Add new Classes of enemies.
