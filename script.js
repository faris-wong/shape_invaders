const enemyGroup = [];
let spawnEnemy;
let ammo;
let life;
let dropStuff = "false";
const him = document.getElementById("him");
const stats = document.getElementById("stats"); // to update ammo and life values
const position = document.getElementById("position"); // for movement of character
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
        spawnMultiple(5, 4);
        setAmmo(70);
        setLife(3);
        document.querySelectorAll(".button").forEach((button) => {
          button.disabled = true;
        });
      });
    }
    if (i == 2) {
      difficulty.innerText = "Medium";
      difficulty.addEventListener("click", () => {
        spawnMultiple(10, 5);
        setAmmo(100);
        setLife(2);
        document.querySelectorAll(".button").forEach((button) => {
          button.disabled = true;
        });
      });
    }
    if (i == 3) {
      difficulty.innerText = "Hard";
      difficulty.addEventListener("click", () => {
        spawnMultiple(20, 6);
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

function spawnMultiple(num, hp) {
  for (let i = 0; i < num; i++) {
    const enemy = new Enemy(hp);
    enemyGroup.push(enemy);
  }
}

function checkWinorLose() {
  if (
    enemyGroup.every((item) => {
      return item == undefined;
    })
  ) {
    alert("YOU WIN !!!! :)");
    location.reload();
  } else if (ammo == 0 || life == 0) {
    const all = document.querySelectorAll(".enemy");
    alert("YOU LOSE  T_T");
    location.reload();
  }
}
//------------MOVEMENT------------------------------

// y-axis (top to bottom 1-20)
position.style.gridRowStart = 20;
// x-axis (left to right 1-30)
position.style.gridColumnStart = 15;

document.addEventListener("keydown", movement);

function movement(event) {
  event.preventDefault();
  if (event.key === "ArrowUp") {
    position.style.gridRowStart = Number(position.style.gridRowStart) - 1;
  } else if (event.key === "ArrowLeft") {
    position.style.gridColumnStart = Number(position.style.gridColumnStart) - 1;
  } else if (event.key === "ArrowDown") {
    if (position.style.gridRowStart <= 19) {
      position.style.gridRowStart = Number(position.style.gridRowStart) + 1;
    }
  } else if (event.key === "ArrowRight") {
    if (position.style.gridColumnStart <= 29) {
      position.style.gridColumnStart =
        Number(position.style.gridColumnStart) + 1;
    }
  }
  enemyGroup.forEach((chicken) => {
    if (chicken != undefined) {
      checkLife(chicken.spawnEnemy);
    }
  });
}

//-------------LIFE--------------------------

function setLife(num) {
  life = num;
  document.querySelector(".lifeCount").innerText = life;
}

function checkLife(chicken) {
  if (chicken == undefined || chicken.innerText == 0) {
    return;
  }
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

function attack(event) {
  event.preventDefault();
  if (event.key === " ") {
    createProjectile();
    ammo = ammo - 1;
    document.querySelector(".ammoCount").innerText = ammo;
    checkWinorLose();
  }
}

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
        if (enemyGroup[i] != undefined) {
          enemyGroup[i].hit(bullet);
          enemyGroup[i].dropCheck(bullet);
          if (enemyGroup[i].hp == 0) {
            enemyGroup[i].spawnEnemy.remove();
            enemyGroup[i] = undefined;
            // enemyGroup.splice(i, 1);
            checkWinorLose();
          }
        }
      }
      // const enemyDom = document.querySelectorAll(".enemy");
      // for (let i = 0; i < enemyDom.length; i++) {
      //   //enemyDom[i].hit(bullet);
      //   //enemyDom[i].dropCheck(bullet);
      //   if (enemyDom[i].innerText == 0) {
      //     enemyDom[i].remove();
      //     // enemyDom[i] = undefined;
      //     checkWinorLose();
      //   }
      // }
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
      if (this.hp <= 0) {
        this.spawnEnemy.remove();
      }
      bullet.remove();
    }
  }

  dropCheck(bullet) {
    if (
      bullet.style.gridRowStart === this.spawnEnemy.style.gridRowStart &&
      bullet.style.gridColumnStart === this.spawnEnemy.style.gridColumnStart
    ) {
      rng(8);
      if (dropStuff == "true") {
        this.drop();
      }
    }
  }

  drop() {
    const power = document.createElement("div"); // dont declare global
    power.classList.add("power");
    gameBorder.appendChild(power);
    power.style.gridRowStart = Number(this.spawnEnemy.style.gridRowStart);
    power.style.gridColumnStart = Number(this.spawnEnemy.style.gridColumnStart);
    function dropDownwards() {
      power.style.gridRowStart = Number(power.style.gridRowStart) + 1;
      if (power.style.gridRowStart < 20) {
        setTimeout(dropDownwards, 300);
        if (
          power.style.gridRowStart == Number(position.style.gridRowStart) &&
          power.style.gridColumnStart == Number(position.style.gridColumnStart)
        ) {
          ammo = ammo + 5;
          document.querySelector(".ammoCount").innerText = ammo;
          power.remove();
        }
      } else {
        power.remove();
      }
    }
    dropDownwards();
  }
}

function rng(chance) {
  const roll = Math.floor(Math.random() * 100);
  if (roll <= chance) {
    dropStuff = "true";
  } else {
    dropStuff = "false";
  }
}
