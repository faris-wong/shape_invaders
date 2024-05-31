const enemyGroup = [];
let spawnEnemy;
let ammo;
let life;
const him = document.getElementById("him");
const stats = document.getElementById("stats");
const position = document.getElementById("position");
const gameBorder = document.getElementById("gameborder");
const startButton = document.getElementById("startbutton");

//-----------------------START GAME ---------------------------

startButton.addEventListener("click", startGame);

function startGame() {
  chooseDifficulty();
  startButton.disabled = true;
}

function chooseDifficulty() {
  for (let i = 1; i < 4; i++) {
    let difficulty = document.createElement("button");
    difficulty.classList.add("button");
    stats.appendChild(difficulty);
    if (i == 1) {
      difficulty.innerText = "Easy";
      difficulty.addEventListener("click", () => {
        spawnMultiple(5);
        setAmmo(90);
        setLife(3);
        document.querySelectorAll(".button").forEach((button) => {
          button.disabled = true;
        });
      });
    }
    if (i == 2) {
      difficulty.innerText = "Medium";
      difficulty.addEventListener("click", () => {
        spawnMultiple(10);
        setAmmo(110);
        setLife(2);
        document.querySelectorAll(".button").forEach((button) => {
          button.disabled = true;
        });
      });
    }
    if (i == 3) {
      difficulty.innerText = "Hard";
      difficulty.addEventListener("click", () => {
        spawnMultiple(20);
        setAmmo(130);
        setLife(1);
        document.querySelectorAll(".button").forEach((button) => {
          button.disabled = true;
        });
      });
    }
  }
}

function setAmmo(num) {
  ammo = num;
  document.querySelector(".ammoCount").innerText = ammo;
}

function spawnMultiple(num) {
  for (let i = 0; i < num; i++) {
    const enemy = new Enemy(/*Math.floor(Math.random()*8)+1*/);
    enemyGroup.push(enemy);
  }
}

function checkWinorLose() {
  if (enemyGroup.length == 0) {
    alert("win");
    location.reload();
  }
  if (ammo == 0 || life == 0) {
    alert("lose");
    location.reload();
  }
}
//------------MOVEMENT------------------------------

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
  enemyGroup.forEach((chicken) => {
    checkLife(chicken.spawnEnemy);
  });
}

document.addEventListener("keydown", movement);

function attack(event) {
  event.preventDefault();
  if (event.key === " ") {
    createProjectile();
    ammo = ammo - 1;
    document.querySelector(".ammoCount").innerText = ammo;
    checkWinorLose();
  }
}

//-------------LIFE--------------------------

function setLife(num) {
  life = num;
  document.querySelector(".lifeCount").innerText = life;
}

function checkLife(chicken) {
  if (
    Number(position.style.gridRowStart) ===
      Number(chicken.style.gridRowStart) &&
    Number(position.style.gridColumnStart) ===
      Number(chicken.style.gridColumnStart)
  ) {
    life = life - 1;
    setLife(life);
    checkWinorLose();
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
    if (bullet.style.gridRowStart != 1) {
      bullet.style.gridRowStart = Number(bullet.style.gridRowStart) - 1;
      setTimeout(projectileFly, 300);
      for (let i = 0; i < enemyGroup.length; i++) {
        enemyGroup[i].hit(bullet);
        if (enemyGroup[i].hp === 0) {
          enemyGroup.splice(i, 1);
          checkWinorLose();
        }
      }
    } else {
      bullet.remove();
    }
  }
}

// --------------ENEMY CLASS------------------------------------------

class Enemy {
  constructor(hp = 5) {
    this.hp = hp;
    this.spawnEnemy = document.createElement("div");
    this.spawnEnemy.classList.add("enemy");
    gameBorder.appendChild(this.spawnEnemy);
    this.spawnEnemy.style.gridRowStart = Math.floor(Math.random() * 5 + 1);
    this.spawnEnemy.style.gridColumnStart = Math.floor(Math.random() * 30 + 1);
    this.spawnEnemy.innerText = this.hp;
    setInterval(() => {
      this.enemyMovement();
      checkLife(this.spawnEnemy);
    }, 1000);
  }

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
        this.spawnEnemy.classList.remove("onHit");
      }, 5000);
      setTimeout;
      if (this.hp === 0) {
        this.spawnEnemy.remove();
      }
      bullet.remove();
    }
  }
}

/*
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
*/
