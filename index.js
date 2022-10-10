var cancel = document.getElementById("cancel");
var play = document.getElementById("play-again");

var gameBox;
var playerO = "O";
var playerX = "X";
var currPlayer = playerO;
var gameOver = false;
let moves = 0;
// apis variables
let fullPostApiLink = "";
const getApiLink = "https://localhost:7268/api/ManVsComputer/get";
let postBaseApiLink = "https://localhost:7268/api/ManVsComputer/set?location=";
window.onload = function () {
  setGame();
};

function setGame() {
  gameOver = false;
  currPlayer = playerO;
  gameBox = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      if (r == 0 || r == 1) {
        tile.classList.add("horizontal-line");
      }
      if (c == 0 || c == 1) {
        tile.classList.add("vertical-line");
      }
      tile.innerText = "";
      tile.addEventListener("click", setTile);
      document.getElementById("game-box").appendChild(tile);
    }
  }
}

async function setTile() {
  if (gameOver) {
    return;
  }

  let coords = this.id.split("-"); //ex) "1-2" -> ["1", "2'"]
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);

  if (gameBox[r][c] != " ") {
    //already taken spot
    return;
  }

  let postApiSuffix =''+ r + c;
  fullPostApiLink = postBaseApiLink + postApiSuffix;
  

  await fetch(fullPostApiLink, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }).catch(error => console.error('Unable to add item.', error));



  gameBox[r][c] = playerO; //mark the gameBox
  this.innerText = playerO; //mark the gameBox on html
  moves++;
  // //change players
  // if (currPlayer == playerO) {
  //   currPlayer = playerX;
  // } else {
  //   currPlayer = playerO;
  // }
  console.log("calling get Api");
  //check winner
  if(moves<5){
  await fetch(getApiLink)
.then(data => {
  console.log(data);
return data.json();
})
.then(index => {
console.log(index.Id);
let tileId = index.Id.split('').join('-');
console.log(tileId);
let div = document.getElementById(tileId);
div.innerText = playerX;
gameBox[index.Id[0]][index.Id[1]] = playerX;
return index.Id;
})
.catch((error) => {
  console.error("Error:", error);
});
}
  checkWinner();
}







function checkWinner() {
  //horizontally, check 3 rows
  for (let r = 0; r < 3; r++) {
    if (
      gameBox[r][0] == gameBox[r][1] &&
      gameBox[r][1] == gameBox[r][2] &&
      gameBox[r][0] != " "
    ) {
      //if we found the winning row
      //apply the winner style to that row
      for (let i = 0; i < 3; i++) {
        let tile = document.getElementById(r.toString() + "-" + i.toString());
        tile.classList.add("winner");
      }
      gameOver = true;
      document.getElementById("cont").style.display = "block";
      return;
    }
  }

  //vertically, check 3 columns
  for (let c = 0; c < 3; c++) {
    if (
      gameBox[0][c] == gameBox[1][c] &&
      gameBox[1][c] == gameBox[2][c] &&
      gameBox[0][c] != " "
    ) {
      //if we found the winning col
      //apply the winner style to that col
      for (let i = 0; i < 3; i++) {
        let tile = document.getElementById(i.toString() + "-" + c.toString());
        tile.classList.add("winner");
      }
      gameOver = true;
      document.getElementById("cont").style.display = "block";
      return;
    }
  }

  //diagonally
  if (
    gameBox[0][0] == gameBox[1][1] &&
    gameBox[1][1] == gameBox[2][2] &&
    gameBox[0][0] != " "
  ) {
    for (let i = 0; i < 3; i++) {
      let tile = document.getElementById(i.toString() + "-" + i.toString());
      tile.classList.add("winner");
    }
    gameOver = true;
    document.getElementById("cont").style.display = "block";
    return;
  }

  //anti-diagonally
  if (
    gameBox[0][2] == gameBox[1][1] &&
    gameBox[1][1] == gameBox[2][0] &&
    gameBox[0][2] != " "
  ) {
    //0-2
    let tile = document.getElementById("0-2");
    tile.classList.add("winner");

    //1-1
    tile = document.getElementById("1-1");
    tile.classList.add("winner");

    //2-0
    tile = document.getElementById("2-0");
    tile.classList.add("winner");
    gameOver = true;

    document.getElementById("cont").style.display = "block";
    return;
  }
}

cancel.addEventListener("click", (e) => {
  document.getElementById("cont").style.display = "none";
});
play.addEventListener("click", (e) => {
  document.getElementById("cont").style.display = "none";
  const myNode = document.getElementById("game-box");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
  }
  moves=0;
  setGame();
});
