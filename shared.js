function updatePage() {
  console.log("Updating page with player name");
  var playerName = localStorage.getItem("playerName");
  console.log("Player name: ", playerName);
  if (playerName !== null) {
    var displayName = document.getElementById("show-name");
    displayName.innerHTML = playerName;

    if (document.getElementById("placeholder")) {
      if (playerName.length === 0) {
        document.getElementById("placeholder").style.visibility = "visible";
      } else {
        document.getElementById("placeholder").style.visibility = "hidden";

        // not sure what you are doing here
        // var long = playerName.length;
        // var name = playerName[long - 1];
        // displayName.appendChild(playerName);
      }
    }
  }
}
