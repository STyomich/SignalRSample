// create connection
var connectionDeathlyHallows = new signalR.HubConnectionBuilder()
  //.configureLogging(signalR.LogLevel.Information)
  .withUrl("/hubs/deathlyhallows")
  .build();

// connect to methods that hub invokes aka receive notifications from hub
connectionDeathlyHallows.on(
  "updateDeathlyHallowCount",
  (cloak, stone, wand) => {
    var cloakSpan = document.getElementById("cloakCounter");
    var stoneCounter = document.getElementById("stoneCounter");
    var wandCounter = document.getElementById("wandCounter");
    cloakSpan.innerText = cloak.toString();
    stoneCounter.innerText = stone.toString();
    wandCounter.innerText = wand.toString();
  }
);

// invoke hub methods aka send notification to hub

// start connection
function fulfilled() {
  connectionDeathlyHallows.invoke("GetRaceStatus").then((raceCounter) => {
    var cloakSpan = document.getElementById("cloakCounter");
    var stoneCounter = document.getElementById("stoneCounter");
    var wandCounter = document.getElementById("wandCounter");
    cloakSpan.innerText = raceCounter.cloak.toString();
    stoneCounter.innerText = raceCounter.stone.toString();
    wandCounter.innerText = raceCounter.wand.toString();
  });
  //do something on start
  console.log("Connection to User Hub Successful");
}
function rejected() {
  //rejected logs
}

connectionDeathlyHallows.start().then(fulfilled, rejected);
