// Display Name
function addName(val) {
  localStorage.setItem("playerName", val);
  updatePage();
  console.log("Added player name: ", val);
}

updatePage();
