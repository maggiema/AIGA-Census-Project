import journey_data from "./data/journey.js";
import player_data from "./data/player.js";

// Global Variables
let currentMove = 0; // 0 to 24 index by 0
let choices = [];
let counter = 5;
let about = 0;

// Initialize Grid
function initGrid() {
  // the container that holds all the cells
  let container = document.getElementById("grid");
  const numRows = 5;
  const numCols = 5;

  // loop over rows and columns 5x5
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      let index = row * numCols + col;
      if (index % 10 >= 5) index = row * numCols + (4 - col);

      // make a new div for each cell
      let newDiv = document.createElement("div");
      newDiv.setAttribute("id", "cell-index-" + index);
      newDiv.setAttribute("class", "grid-cell");
      // newDiv.textContent = "grid cell:" + index;
      newDiv.textContent = index + 1;
      container.appendChild(newDiv);
    }
  }

  setActiveTile(0);
}

// Card Buttons
function initBtns() {
  let btns = ["risk", "reward", "obstacle"];
  btns.forEach((btn) => {
    let risk = document.getElementById("risk-btn"); // risk card button
    risk.onclick = function () {
      handleCard(btn);
    };
    let reward = document.getElementById("reward-btn"); // reward card button
    reward.onclick = function () {
      handleCard(btn);
    };
    let obstacle = document.getElementById("obstacle-btn"); // obstacle card button
    obstacle.onclick = function () {
      handleCard(btn);
    };
    let done = document.getElementById("done"); // done button
    done.onclick = function () {
      if (currentMove <= 24) {
        removeCard(btn);
      } else {
        showStickers(btn);
      }
    };
    let flip = document.getElementById("flip"); // flip button
    flip.onclick = function () {
      flipCard(btn);
    };
    // expertise options
    let ai = document.getElementById("ai");
    ai.onclick = function () {
      about = 0;
      aboutCard(btn);
      handleOptionA(btn);
    };
    let ar = document.getElementById("ar");
    ar.onclick = function () {
      about = 1;
      aboutCard(btn);
      handleOptionA(btn);
    };
    let game = document.getElementById("game");
    game.onclick = function () {
      about = 2;
      aboutCard(btn);
      handleOptionA(btn);
    };
    let graphic = document.getElementById("graphic");
    graphic.onclick = function () {
      about = 3;
      aboutCard(btn);
      handleOptionA(btn);
    };
    let ill = document.getElementById("ill");
    ill.onclick = function () {
      about = 4;
      aboutCard(btn);
      handleOptionA(btn);
    };
    let pack = document.getElementById("pack");
    pack.onclick = function () {
      about = 5;
      aboutCard(btn);
      handleOptionA(btn);
    };
  });
}

// Choice Buttons
function cardBtns() {
  let options = ["a", "b"];
  options.forEach((option) => {
    let a = document.getElementById("option-a");
    a.onclick = function () {
      handleOptionA(option);
      a.style.backgroundColor = "#FE5B32";
      a.style.opacity = "20%";
    };
    let b = document.getElementById("option-b");
    b.onclick = function () {
      handleOptionB(option);
      b.style.backgroundColor = "#FE5B32";
      b.style.opacity = "20%";
    };
  });
}

// Sets New Clickable Cell
function setActiveTile(index) {
  console.log("Setting cell index " + index + " to active");
  const cell = document.getElementById("cell-index-" + index);
  cell.onclick = handleStateChange;
  cell.className = cell.className + " active-cell";
}

// Make Others Not Clickable
function deactivateTile(index) {
  const cell = document.getElementById("cell-index-" + index);
  cell.onclick = undefined;
  // todo: how to lock the ones that were clicked already
}

// Cell Change
function handleStateChange() {
  console.log("State change! ");
  console.log(counter);
  smilieCounter(currentMove, counter);

  // increment our current move to get the new data to display
  let lastMove = currentMove;
  const data = journey_data[lastMove];
  let lastBox = lastMove - 1;

  // UI 1. put image on grid
  const cell = document.getElementById("cell-index-" + lastMove);
  let newImage = document.createElement("img");
  newImage.src = "./img/" + data.grid_image;
  newImage.className = "cell-img";
  cell.appendChild(newImage);
  cell.style.backgroundColor = data.grid_color;
  cell.style.borderRight = "1px #FE5B32 solid";
  cell.style.borderBottom = "1px #FE5B32 solid";
  cell.style.color = "#FE5B32";

  if (lastMove >= 1) {
    const old = document.getElementById("cell-index-" + lastBox);
    old.style.backgroundColor = "#FFFEFC";
    let oldImage = document.createElement("img");
    oldImage.src = "./img/" + data.color_image;
    oldImage.className = "cell-img";
    old.appendChild(oldImage);
  }

  // UI 2. display the right card with text/options
  const box = document.getElementById("card-container");
  let cardImage = document.createElement("img");
  cardImage.src = "./img/" + data.other_card;
  cardImage.className = "card-img";
  if (box.hasChildNodes()) {
    box.removeChild(box.lastChild);
  }
  box.appendChild(cardImage);

  if (data.other_card != "white.png") {
    let done = document.getElementById("done");
    done.style.color = "#FE5B32";
  } else {
    let done = document.getElementById("done");
    done.style.color = "#FFFFFF";
  }

  if (
    data.other_card == "expertise_card.png" ||
    data.other_card == "privilege_card.png"
  ) {
    let privilege = document.getElementById("graphic");
    privilege.style.display = "block";
  } else {
    let privilege = document.getElementById("graphic");
    privilege.style.display = "none";
  }

  // UI 3. change active tiles
  currentMove += 1;
  setActiveTile(currentMove);

  //if (currentMove < 24) {
  //setActiveTile(currentMove);
  //}
  //if (currentMove < 25) {
  //currentMove += 1;
  //}
  //console.log("***" + currentMove);
  //if (currentMove == 25) {
  //let main = document.getElementById("main-container");
  //main.style.display = "none";
  //console.log("end");
  //showStickers();
  //}
}

// Card Change
function handleCard(type) {
  let flip = document.getElementById("flip");
  flip.style.color = "#FE5B32";

  console.log("Clicked " + type);
  const data = journey_data[currentMove - 1];

  // add chosen option to options array
  const box = document.getElementById("card-container");
  let cardImage = document.createElement("img");
  cardImage.src = "./img/" + data.card_type;
  cardImage.className = "card-img";

  if (box.hasChildNodes()) {
    box.removeChild(box.lastChild);
  }
  box.appendChild(cardImage);

  // change next grid to be clickable
  cardBtns();
}

// Icon A Change
function handleOptionA(type) {
  console.log("Clicked " + type);
  const data = journey_data[currentMove - 1];

  let cell = document.getElementById("cell-index-" + (currentMove - 1));
  cell.removeChild(cell.lastChild);
  let replaceImage = document.createElement("img");
  replaceImage.src = "./img/" + data.option_a;
  replaceImage.className = "cell-img";
  cell.appendChild(replaceImage);

  setActiveTile(currentMove);

  choices.push(data.option_a);
  console.log(choices);
}

// Icon B Change
function handleOptionB(type) {
  console.log("Clicked " + type);
  const data = journey_data[currentMove - 1];

  let cell = document.getElementById("cell-index-" + (currentMove - 1));
  cell.removeChild(cell.lastChild);
  let replaceImage = document.createElement("img");
  replaceImage.src = "./img/" + data.option_b;
  replaceImage.className = "cell-img";
  cell.appendChild(replaceImage);

  setActiveTile(currentMove);

  choices.push(data.option_b);
  console.log(choices);
}

// Remove Card
function removeCard() {
  const box = document.getElementById("card-container");
  if (box.hasChildNodes()) {
    box.removeChild(box.lastChild);
  }

  let optionA = document.getElementById("option-a");
  optionA.style.display = "none";
  let optionB = document.getElementById("option-b");
  optionB.style.display = "none";

  let done = document.getElementById("done");
  done.style.color = "#FFFFFF";
}

// Flip Card
function flipCard(type) {
  console.log("Clicked " + type);
  const data = journey_data[currentMove - 1];

  const box = document.getElementById("card-container");
  let flipImage = document.createElement("img");
  flipImage.src = "./img/" + data.flip_card;
  flipImage.className = "card-img";

  if (box.hasChildNodes()) {
    box.removeChild(box.lastChild);
  }
  box.appendChild(flipImage);

  let flip = document.getElementById("flip");
  flip.style.color = "#ffffff";
  let done = document.getElementById("done");
  done.style.color = "#FE5B32";

  let optionA = document.getElementById("option-a");
  optionA.style.display = "block";
  let optionB = document.getElementById("option-b");
  optionB.style.display = "block";
}

// About Card
function aboutCard(type) {
  console.log("Clicked " + type);
  console.log("Clicked " + about);
  const player = player_data[about];

  const box = document.getElementById("card-container");
  let aboutImage = document.createElement("img");
  aboutImage.src = "./img/" + player.about_card;
  aboutImage.className = "card-img";

  if (box.hasChildNodes()) {
    box.removeChild(box.lastChild);
  }
  box.appendChild(aboutImage);
}

// Smilie Counter
function smilieCounter(index, count) {
  if (index == 6 || index == 14 || index == 19 || index == 22) {
    count++;
  } else if (index == 8 || index == 15) {
    console.log("-");
    count--;
  }
  let happy = document.getElementById("happy");
  happy.textContent = count;
  counter = count;
}

// End Page
function showStickers() {
  console.log("end");

  let main = document.getElementById("main-container");
  main.style.display = "none";

  const page = document.getElementById("sticker-container");
  const numRows = 2;
  const numCols = 5;
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      let i = row * numCols + col;

      let stickerImage = document.createElement("img");
      stickerImage.src = "./img/" + choices[i];
      stickerImage.className = "sticker-img";
      if (i % 2 == 0) {
        stickerImage.style.transform = "rotate(45deg)";
      } else {
        stickerImage.style.transform = "rotate(315deg)";
      }
      console.log(stickerImage);
      page.appendChild(stickerImage);
    }
  }

  //for(let i = 0; i < choices.length; i++){
  //let stickerImage = document.createElement("img");
  //stickerImage.className = "sticker-img";
  //stickerImage.style.position = "absolute";
  //stickerImage.style.top = Math.random()*windownHeight*.8;
  //stickerImage.style.left = Math.random()*windownWidth*.8;
  //page.appendChild(stickerImage);
  //}
}

// On Load
initGrid();
initBtns();
updatePage();
