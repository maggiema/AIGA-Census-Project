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
    let ar = document.getElementById("ar");
    ar.onclick = function () {
      about = 0;
      aboutCard(btn);
    };
    let game = document.getElementById("game");
    game.onclick = function () {
      about = 1;
      aboutCard(btn);
    };
    let graphic = document.getElementById("graphic");
    graphic.onclick = function () {
      about = 2;
      aboutCard(btn);
    };
    let ill = document.getElementById("ill");
    ill.onclick = function () {
      about = 3;
      aboutCard(btn);
    };
    let pack = document.getElementById("pack");
    pack.onclick = function () {
      about = 4;
      aboutCard(btn);
    };
    let ui = document.getElementById("ui");
    ui.onclick = function () {
      about = 5;
      aboutCard(btn);
    };
    // race options
    let white = document.getElementById("white");
    white.onclick = function () {
      about = 6;
      aboutCard(btn);
    };
    let black = document.getElementById("black");
    black.onclick = function () {
      about = 7;
      aboutCard(btn);
    };
    let asian = document.getElementById("asian");
    asian.onclick = function () {
      about = 8;
      aboutCard(btn);
    };
    let latino = document.getElementById("latino");
    latino.onclick = function () {
      about = 9;
      aboutCard(btn);
    };
    let multi = document.getElementById("multi");
    multi.onclick = function () {
      about = 10;
      aboutCard(btn);
    };
    let other = document.getElementById("other");
    other.onclick = function () {
      about = 11;
      aboutCard(btn);
    };
    // gender options
    let female = document.getElementById("female");
    female.onclick = function () {
      about = 12;
      aboutCard(btn);
    };
    let male = document.getElementById("male");
    male.onclick = function () {
      about = 13;
      aboutCard(btn);
    };
    let nbin = document.getElementById("nbin");
    nbin.onclick = function () {
      about = 14;
      aboutCard(btn);
    };
    let ncon = document.getElementById("ncon");
    ncon.onclick = function () {
      about = 15;
      aboutCard(btn);
    };
    let fluid = document.getElementById("fluid");
    fluid.onclick = function () {
      about = 16;
      aboutCard(btn);
    };
    let trans = document.getElementById("trans");
    trans.onclick = function () {
      about = 17;
      aboutCard(btn);
    };
    // experience options
    let less = document.getElementById("less");
    less.onclick = function () {
      about = 18;
      aboutCard(btn);
    };
    let four = document.getElementById("four");
    four.onclick = function () {
      about = 19;
      aboutCard(btn);
    };
    let ten = document.getElementById("ten");
    ten.onclick = function () {
      about = 20;
      aboutCard(btn);
    };
    let fourteen = document.getElementById("fourteen");
    fourteen.onclick = function () {
      about = 21;
      aboutCard(btn);
    };
    let twenty = document.getElementById("twenty");
    twenty.onclick = function () {
      about = 22;
      aboutCard(btn);
    };
    let more = document.getElementById("more");
    more.onclick = function () {
      about = 23;
      aboutCard(btn);
    };
    // satisfication options
    let yes = document.getElementById("yes");
    yes.onclick = function () {
      about = 24;
      aboutCard(btn);
    };
    let no = document.getElementById("no");
    no.onclick = function () {
      about = 25;
      aboutCard(btn);
    };
    let popOne = document.getElementById("pop-up-1");
    popOne.onclick = function () {
      goAway(btn);
    };
    let popTwo = document.getElementById("pop-up-2");
    popTwo.onclick = function () {
      goAway(btn);
    };
    let popThree = document.getElementById("pop-up-3");
    popThree.onclick = function () {
      goAway(btn);
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
      //a.style.backgroundColor = "#FE5B32";
      //a.style.opacity = "20%";
    };
    let b = document.getElementById("option-b");
    b.onclick = function () {
      handleOptionB(option);
      //b.style.backgroundColor = "#FE5B32";
      //b.style.opacity = "20%";
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

  if(lastMove == 0 || lastMove == 24) {
    choices.push(data.grid_image);
  }

  //if (lastMove == 8 || lastMove == 11) {
    //const old = document.getElementById("cell-index-" + lastBox);
    //old.style.backgroundColor = "#FFFEFC";
    //let oldImage = document.createElement("img");
    //oldImage.src = "./img/" + data.color_image;
    //oldImage.className = "cell-img";
    //old.appendChild(oldImage);
  //}

  if (lastMove >= 1) {
    const old = document.getElementById("cell-index-" + lastBox);
    old.style.backgroundColor = "#FFFEFC";
    //let oldImage = document.createElement("img");
    //oldImage.src = "./img/" + data.color_image;
    //oldImage.className = "cell-img";
    //old.appendChild(oldImage);
  }

  // UI 2. display the right card with text/options
  const box = document.getElementById("card-container");
  let cardImage = document.createElement("img");
  if(lastMove == 5) {
    if (choices[choices.length - 1] == "friends.png") {
      cardImage.src = "./img/" + data.other_card_one;
    }
    else {
      cardImage.src = "./img/" + data.other_card_two;
    }
  }
  else if(lastMove == 12) {
    if (choices[choices.length - 1] == "high_sal.png") {
      cardImage.src = "./img/" + data.other_card_one;
    }
    else {
      cardImage.src = "./img/" + data.other_card_two;
    }
  }
  else if(lastMove == 16) {
    if (choices[choices.length - 1] == "favors.png") {
      cardImage.src = "./img/" + data.other_card_one;
    }
    else {
      cardImage.src = "./img/" + data.other_card_two;
    }
  }
  else if(lastMove == 21) {
    if (choices[choices.length - 1] == "51-60h.png") {
      cardImage.src = "./img/" + data.other_card_one;
    }
    else {
      cardImage.src = "./img/" + data.other_card_two;
    }
  }
  else {
    cardImage.src = "./img/" + data.other_card;
  }
  if(lastMove == 0 || lastMove == 24) {
    cardImage.className = "ins-img";
  }
  else if(lastMove == 2) {
    cardImage.className = "hint-img";
  }
  else {
    cardImage.className = "card-img";
  }

  if(lastMove == 2) {
    let popOne = document.getElementById("pop-up-1");
    popOne.style.display = "block";
  }
  else if(lastMove == 3) {
    let popTwo = document.getElementById("pop-up-2");
    popTwo.style.display = "block";
  }
  else if(lastMove == 5) {
    let popThree = document.getElementById("pop-up-3");
    popThree.style.display = "block";
  }

  if (box.hasChildNodes()) {
    box.removeChild(box.lastChild);
  }
  box.appendChild(cardImage);

  if (data.other_card == "end_ins.png") {
    let done = document.getElementById("done");
    done.style.color = "#FE5B32";
  }
  else {
    let done = document.getElementById("done");
    done.style.color = "#FFFFFF";
  }

  let jobOne = document.getElementById("ar");
  let jobTwo = document.getElementById("game");
  let jobThree = document.getElementById("graphic");
  let jobFour = document.getElementById("ill");
  let jobFive = document.getElementById("pack");
  let jobSix = document.getElementById("ui");
  let raceOne = document.getElementById("white");
  let raceTwo = document.getElementById("black");
  let raceThree = document.getElementById("asian");
  let raceFour = document.getElementById("latino");
  let raceFive = document.getElementById("multi");
  let raceSix = document.getElementById("other");
  let genOne = document.getElementById("female");
  let genTwo = document.getElementById("male");
  let genThree = document.getElementById("nbin");
  let genFour = document.getElementById("ncon");
  let genFive = document.getElementById("fluid");
  let genSix = document.getElementById("trans");
  let expOne = document.getElementById("less");
  let expTwo = document.getElementById("four");
  let expThree = document.getElementById("ten");
  let expFour = document.getElementById("fourteen");
  let expFive = document.getElementById("twenty");
  let expSix = document.getElementById("more");
  let satOne = document.getElementById("yes");
  let satTwo = document.getElementById("no");

  if (data.other_card == "job_card.png") {
    jobOne.style.display = "block";
    jobTwo.style.display = "block";
    jobThree.style.display = "block";
    jobFour.style.display = "block";
    jobFive.style.display = "block";
    jobSix.style.display = "block";
  } 
  else {
    jobOne.style.display = "none";
    jobTwo.style.display = "none";
    jobThree.style.display = "none";
    jobFour.style.display = "none";
    jobFive.style.display = "none";
    jobSix.style.display = "none";
  }
  if (data.other_card == "race_card.png") {
    raceOne.style.display = "block";
    raceTwo.style.display = "block";
    raceThree.style.display = "block";
    raceFour.style.display = "block";
    raceFive.style.display = "block";
    raceSix.style.display = "block";
  } 
  else {
    raceOne.style.display = "none";
    raceTwo.style.display = "none";
    raceThree.style.display = "none";
    raceFour.style.display = "none";
    raceFive.style.display = "none";
    raceSix.style.display = "none";
  }
  if (data.other_card == "gender_card.png") {
    genOne.style.display = "block";
    genTwo.style.display = "block";
    genThree.style.display = "block";
    genFour.style.display = "block";
    genFive.style.display = "block";
    genSix.style.display = "block";
  } 
  else {
    genOne.style.display = "none";
    genTwo.style.display = "none";
    genThree.style.display = "none";
    genFour.style.display = "none";
    genFive.style.display = "none";
    genSix.style.display = "none";
  }
  if (data.other_card == "experience_card.png") {
    expOne.style.display = "block";
    expTwo.style.display = "block";
    expThree.style.display = "block";
    expFour.style.display = "block";
    expFive.style.display = "block";
    expSix.style.display = "block";
  } 
  else {
    expOne.style.display = "none";
    expTwo.style.display = "none";
    expThree.style.display = "none";
    expFour.style.display = "none";
    expFive.style.display = "none";
    expSix.style.display = "none";
  }
  if (data.other_card == "satisfication_card.png") {
    satOne.style.display = "block";
    satTwo.style.display = "block";
  } 
  else {
    satOne.style.display = "none";
    satTwo.style.display = "none";
  }

  // UI 3. change active tiles
  currentMove += 1;
  setActiveTile(currentMove);
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

  //let done = document.getElementById("done");
  //done.style.color = "#FFFFFF";
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
  //let done = document.getElementById("done");
  //done.style.color = "#FE5B32";

  let optionA = document.getElementById("option-a");
  optionA.style.display = "block";
  let optionB = document.getElementById("option-b");
  optionB.style.display = "block";
}

// About Card
function aboutCard(type) {
  // about card
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

  // about icon
  let cell = document.getElementById("cell-index-" + (currentMove - 1));
  cell.removeChild(cell.lastChild);
  let replaceImage = document.createElement("img");
  replaceImage.src = "./img/" + player.about_icon;
  replaceImage.className = "cell-img";
  cell.appendChild(replaceImage);

  setActiveTile(currentMove);

  if ((currentMove - 1) == 1 || (currentMove - 1) == 7 || (currentMove - 1) == 13 || (currentMove - 1) == 23) {
    choices.push(player.about_icon);
    console.log(choices);
  }
}

// Smilie Counter
function smilieCounter(index, count) {
  if (index == 2 || index == 14 || index == 19 || index == 22) {
    count++;
  } else if (index == 6 || index == 9 || index == 17) {
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
  //let nav = document.getElementById("navigation-bar");
  //nav.style.display = "none";

  let bottom = document.getElementById("sticker-bottom");
  bottom.style.display = "block";

  const page = document.getElementById("sticker-container");
  const numRows = 2;
  const numCols = 5;
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      let i = row * numCols + col;

      let stickerImage = document.createElement("img");
      stickerImage.src = "./img/" + choices[i];
      stickerImage.className = "sticker-img";
      if (i == 0) {
        stickerImage.style.left = "0px";
        stickerImage.style.top = "100px";
      }
      else if (i == 1) {
        stickerImage.style.left = "250px";
        stickerImage.style.top = "200px";
      }
      else if (i == 2) {
        stickerImage.style.left = "550px";
        stickerImage.style.top = "120px";
      }
      else if (i == 3) {
        stickerImage.style.left = "800px";
        stickerImage.style.top = "200px";
      }
      else if (i == 4) {
        stickerImage.style.left = "1050px";
        stickerImage.style.top = "100px";
      }
      else if (i == 5) {
        stickerImage.style.left = "50px";
        stickerImage.style.top = "400px";
      }
      else if (i == 6) {
        stickerImage.style.left = "350px";
        stickerImage.style.top = "400px";
      }
      else if (i == 7) {
        stickerImage.style.left = "600px";
        stickerImage.style.top = "450px";
      }
      else if (i == 8) {
        stickerImage.style.left = "850px";
        stickerImage.style.top = "400px";
      }
      else if (i == 9) {
        stickerImage.style.left = "1100px";
        stickerImage.style.top = "400px";
      }
      if (i % 2 == 0) {
        stickerImage.style.transform = "rotate(350deg)";
      } else {
        stickerImage.style.transform = "rotate(10deg)";
      }
      console.log(stickerImage);
      page.appendChild(stickerImage);
    }
  }
}

function goAway() {
  let popOne = document.getElementById("pop-up-1");
  let popTwo = document.getElementById("pop-up-2");
  let popThree = document.getElementById("pop-up-3");
  popOne.style.display = "none";
  popTwo.style.display = "none";
  popThree.style.display = "none";
}

function hoverData() {
  //let one = document.getElementById("one");
  //one.style.visibility = "visible";
  console.log("hover");
}

// On Load
initGrid();
initBtns();
updatePage();
