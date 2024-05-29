const enemyGroup = [];

function rng(chance) {
  const roll = Math.floor(Math.random() * 100);
  if (roll <= chance) {
    console.log(`${roll}` + ` true`);
    //return active === true;
  } else {
    console.log(`${roll}` + ` false`);
    //return active === false
  }
}

//const arrowkey = document.addEventListener("keypress", movement());

const him = document.getElementById("him");
const position = document.getElementById("position");
const gameBorder = document.getElementById("gameborder");

// y-axis (bottom border 20)
position.style.gridRowStart = 20;
// x-axis (right border 30)
position.style.gridColumnStart = 15;

function movement(event) {
  event.preventDefault();
  if (event.key === "w") {
    position.style.gridRowStart = Number(position.style.gridRowStart) - 1;
  }
  if (event.key === "a") {
    position.style.gridColumnStart = Number(position.style.gridColumnStart) - 1;
  }
  if (event.key === "s") {
    if (position.style.gridRowStart <= 19) {
      position.style.gridRowStart = Number(position.style.gridRowStart) + 1;
    }
  }
  if (event.key === "d") {
    if (position.style.gridColumnStart <= 29) {
      position.style.gridColumnStart =
        Number(position.style.gridColumnStart) + 1;
    }
  }
}

document.addEventListener("keydown", movement);

function attack(event) {
  event.preventDefault();
  if (event.key === "g") {
    createProjectile();
  }
}

// ------------SHOOTING--------------

document.addEventListener("keydown", attack);

const bulletDamage = 1;

let bullet;
let bullets;

function createProjectile() {
  bullet = document.createElement("div");
  bullet.classList.add("bullet");
  gameBorder.appendChild(bullet);
  bullet.style.gridRowStart = Number(position.style.gridRowStart);
  bullet.style.gridColumnStart = Number(position.style.gridColumnStart);
  projectileFly();
}

function projectileFly() {
  bullets = document.querySelectorAll(".bullet");
  for (const bullet of bullets) {
    //console.log(bullet);
    if (bullet.style.gridRowStart != 1) {
      bullet.style.gridRowStart = Number(bullet.style.gridRowStart) - 1;
      //console.log(bullet.style.gridRowStart);
      setTimeout(projectileFly, 200);
      for (let i = 0; i < enemyGroup.length; i++) {
        enemyGroup[i].hit(bullet);
      }
    } else {
      bullet.remove();
    }
  }
}

//------------------------------------------

let Enemies;

class Enemy {
  constructor(hp = 5) {
    this.hp = hp;
    this.spawnEnemy = document.createElement("div");
    this.spawnEnemy.classList.add("enemy");
    gameBorder.appendChild(this.spawnEnemy);
    this.spawnEnemy.style.gridRowStart = Math.floor(Math.random() * 5 + 1);
    this.spawnEnemy.style.gridColumnStart = Math.floor(Math.random() * 30 + 1);
    this.spawnEnemy.innerText = this.hp
    }
  

  hit(bullet) {
    //Enemies = document.querySelectorAll(".enemy");
    //for (const oneEnemy of Enemies) {
    if (
      bullet.style.gridRowStart === this.spawnEnemy.style.gridRowStart &&
      bullet.style.gridColumnStart === this.spawnEnemy.style.gridColumnStart
    ) {
      this.hp = this.hp - bulletDamage;
      this.spawnEnemy.innerText = this.hp;
      if (this.hp === 0){
        this.spawnEnemy.remove();
      }
      console.log("hit");
      bullet.remove();
    }
  }
}


// WHEN GAME INITIALIZES ----------------------

function spawnMultiple(num) {
  for (let i = 0; i < num; i++) {
    const enemy = new Enemy();
    enemyGroup.push(enemy);
    // enemy.spawn();
  }
}

spawnMultiple(7);

