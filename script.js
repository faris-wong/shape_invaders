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

document.addEventListener("keydown", (e) => movement(e));

function attack(event) {
  event.preventDefault();
  if (event.key === "g") {
    createProjectile();
  }
}

// ------------SHOOTING--------------

document.addEventListener("keydown", (e) => attack(e));

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
      hit();
    } else {
      bullet.remove();
    }
  }
}

//------------------------------------------

let spawnEnemy;
let Enemies;

class enemy {
  constructor(hp = 3) {
    this.hp = hp;
  }
  spawn(num) {
    for (let i = 0; i < num; i++) {
      //console.log(spawnEnemy)
      spawnEnemy = document.createElement("div");
      spawnEnemy.classList.add("enemy");
      gameBorder.appendChild(spawnEnemy);
      spawnEnemy.style.gridRowStart = Math.floor(Math.random() * 5 + 1);
      //console.log(`y` + Math.floor(Math.random() * 5));
      spawnEnemy.style.gridColumnStart = Math.floor(Math.random() * 30 + 1);
      //console.log(`x` + (Math.floor(Math.random() * 24 - 6) + 6));
      spawnEnemy.innerText = this.hp;
    }
  }
}

const dog = new enemy();

dog.spawn(2);

function hit() {
  //console.log(bullet);
  //console.log(spawnEnemy);
  Enemies = document.querySelectorAll(".enemy");
  for (const chicken of Enemies) {
    if (
      bullet.style.gridRowStart === chicken.style.gridRowStart &&
      bullet.style.gridColumnStart === chicken.style.gridColumnStart
    ) {
      //console.log(dog);
      //console.log(dog.hp);
      //console.log(bulletDamage)
      dog.hp = dog.hp - bulletDamage;
      dog.innerText = dog.hp;
      console.log("hit");
      bullet.remove();
    }
  }
}
