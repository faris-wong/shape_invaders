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

// y-axis
position.style.gridRowStart = 20;
// x-axis
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

function shoot(event) {
  event.preventDefault();
}
