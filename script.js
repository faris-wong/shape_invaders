const enemyGroup = [];
let spawnEnemy;

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

// y-axis (top to bottom 1-20)
position.style.gridRowStart = 20;
// x-axis (left to right 1-30)
position.style.gridColumnStart = 15;

function movement(event) {
  event.preventDefault();
  if (event.key === "ArrowUp") {
    position.style.gridRowStart = Number(position.style.gridRowStart) - 1;
  }
  if (event.key === "ArrowLeft") {
    position.style.gridColumnStart = Number(position.style.gridColumnStart) - 1;
  }
  if (event.key === "ArrowDown") {
    if (position.style.gridRowStart <= 19) {
      position.style.gridRowStart = Number(position.style.gridRowStart) + 1;
    }
  }
  if (event.key === "ArrowRight") {
    if (position.style.gridColumnStart <= 29) {
      position.style.gridColumnStart =
        Number(position.style.gridColumnStart) + 1;
    }
  }
}

document.addEventListener("keydown", movement);

function attack(event) {
  event.preventDefault();
  if (event.key === " ") {
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
      setTimeout(projectileFly, 300);
      for (let i = 0; i < enemyGroup.length; i++) {
        enemyGroup[i].hit(bullet);
        console.log(enemyGroup);
        if (enemyGroup[i].hp === 0) {
          enemyGroup.splice(i, 1);
        }
      }
    } else {
      bullet.remove();
    }
  }
}

//------------------------------------------

class Enemy {
  constructor(hp = 5) {
    this.hp = hp;
    this.spawnEnemy = document.createElement("div");
    this.spawnEnemy.classList.add("enemy");
    gameBorder.appendChild(this.spawnEnemy);
    this.spawnEnemy.style.gridRowStart = Math.floor(Math.random() * 5 + 1);
    this.spawnEnemy.style.gridColumnStart = Math.floor(Math.random() * 30 + 1);
    this.spawnEnemy.innerText = this.hp;
    //this.direction = "right";

    setInterval(() => {
      this.enemyMovement();
    }, 1000);
  }

  // enemyMoving() {
  //   if (
  //     this.direction === "right" &&
  //     this.spawnEnemy.style.gridColumnStart < 30
  //   ) {
  //     this.spawnEnemy.style.gridColumnStart =
  //       parseInt(this.spawnEnemy.style.gridColumnStart) + 1;
  //   } else if (
  //     this.direction === "left" &&
  //     this.spawnEnemy.style.gridColumnStart > 1
  //   ) {
  //     this.spawnEnemy.style.gridColumnStart =
  //       parseInt(this.spawnEnemy.style.gridColumnStart) - 1;
  //   } else if (
  //     this.direction === "right" &&
  //     this.spawnEnemy.style.gridColumnStart == 30
  //   ) {
  //     this.direction = "left";
  //   } else if (
  //     this.direction === "left" &&
  //     this.spawnEnemy.style.gridColumnStart == 1
  //   ) {
  //     this.direction = "right";
  //   }
  // }

  /*
  enemyMovement() {
    //console.log(this.spawnEnemy);
    //console.log(this.spawnEnemy.style.gridRowStart);

    if (
      this.spawnEnemy.style.gridRowStart > 2 &&
      this.spawnEnemy.style.gridRowStart < 19
    ) {
      this.spawnEnemy.style.gridRowStart =
        parseInt(this.spawnEnemy.style.gridRowStart) +
        (Math.random() > 0.5 ? -1 : 1);
      console.log(this.spawnEnemy.style.gridRowStart);
    } else if (this.spawnEnemy.style.gridRowStart <= 2) {
      this.spawnEnemy.style.gridRowStart =
        parseInt(this.spawnEnemy.style.gridRowStart) + 1;
    }

  }
*/

  enemyMovement() {
    if (this.spawnEnemy.style.gridRowStart == 1) {
      this.spawnEnemy.style.gridRowStart =
        Number(this.spawnEnemy.style.gridRowStart) + 1;
    }
    if (this.spawnEnemy.style.gridRowStart == 20) {
      this.spawnEnemy.style.gridRowStart =
        Number(this.spawnEnemy.style.gridRowStart) - 1;
    }
    if (this.spawnEnemy.style.gridColumnStart == 1) {
      this.spawnEnemy.style.gridColumnStart =
        Number(this.spawnEnemy.style.gridColumnStart) + 1;
    }
    if (this.spawnEnemy.style.gridColumnStart == 30) {
      this.spawnEnemy.style.gridColumnStart =
        Number(this.spawnEnemy.style.gridColumnStart) - 1;
    }
    if (
      this.spawnEnemy.style.gridColumnStart >= 2 &&
      this.spawnEnemy.style.gridColumnStart <= 30
    ) {
      this.spawnEnemy.style.gridColumnStart =
        Number(this.spawnEnemy.style.gridColumnStart) +
        (Math.floor(Math.random() * 3) - 1);
    }
    if (
      this.spawnEnemy.style.gridRowStart >= 2 &&
      this.spawnEnemy.style.gridRowStart <= 20
    ) {
      this.spawnEnemy.style.gridRowStart =
        Number(this.spawnEnemy.style.gridRowStart) +
        (Math.floor(Math.random() * 3) - 1);
    }
  }

  hit(bullet) {
    if (
      bullet.style.gridRowStart === this.spawnEnemy.style.gridRowStart &&
      bullet.style.gridColumnStart === this.spawnEnemy.style.gridColumnStart
    ) {
      this.hp = this.hp - bulletDamage;
      this.spawnEnemy.innerText = this.hp;
      this.spawnEnemy.classList.add("onHit");
      setTimeout(() => {
        this.spawnEnemy.classList.remove("onHit"), 1000;
      });

      setTimeout;
      if (this.hp === 0) {
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
    console.log(spawnEnemy);
  }
}

spawnMultiple(15);
