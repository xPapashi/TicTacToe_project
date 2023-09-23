const gameBoard = (() => {
  const gBoardArr = ["", "", "", "", "", "", "", "", ""];
  const main = document.querySelector(".main");
  const grid = document.createElement("div");
  const warning = document.createElement("div");

  const manageGrid = () => {
    grid.classList.add("grid");
    warning.classList.add("warning");

    const createGrid = (gridArr) => {
      for (let object in gridArr) {
        const item = document.createElement(`div`);
        item.classList.add(`item`);
        item.setAttribute("data-index", object);
        item.innerHTML = gridArr[object];
        grid.appendChild(item);
      }
      main.appendChild(grid);
      main.appendChild(warning);
    };

    return { createGrid };
  };

  const displayMessage = (message, error) => {
    if (error) {
      warning.classList.add("error");
      warning.innerHTML = message;
    } else {
      warning.classList.remove("error");
      warning.innerHTML = message;
    }
  };

  const isEmptyArray = (index) => {
    if (gBoardArr[index] === "") {
      return true;
    } else {
      return false;
    }
  };

  const addToArray = (index, value) => {
    if (isEmptyArray(index)) {
      gBoardArr.splice(index, 1, value);
      displayMessage(`Added ${value} to the index of ${index} in array!`, 0);
    }
  };

  let currentPlayer = null;
  let player1 = null;
  let player2 = null;
  let isGameOver = false;

  const setGameOver = (status) => {
    isGameOver = status;
  }

  const initializePlayer = (p1, p2) => {
    player1 = p1;
    player2 = p2;
    currentPlayer = player1;
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const playerTurn = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;

    return currentPlayer.itemsEventListener().start();
  };

  return {
    gBoardArr,
    manageGrid,
    addToArray,
    isEmptyArray,
    displayMessage,
    switchPlayer,
    playerTurn,
    initializePlayer,
    player1,
    player2,
    isGameOver,
  };
})();

const Player = (status) => {
  const checkForWinner = () => {
    const { gBoardArr } = gameBoard;

    //Check for rows horizontally
    for (let row = 0; row < 9; row += 3) {
      if (
        gBoardArr[row] !== "" &&
        gBoardArr[row] === gBoardArr[row + 1] &&
        gBoardArr[row] === gBoardArr[row + 2]
      ) {
        gameBoard.displayMessage(`${gBoardArr[row]} wins!`, false);
        gameBoard.isGameOver = true;
      }
    }

    //Check columns vertically
    for (let col = 0; col < 9; col += 1) {
      if (
        gBoardArr[col] !== "" &&
        gBoardArr[col] === gBoardArr[col + 3] &&
        gBoardArr[col] === gBoardArr[col + 6]
      ) {
        gameBoard.displayMessage(`${gBoardArr[col]} wins!`, false);

        gameBoard.isGameOver = true;
      }
    }

    //Check rows + columns diagonally
    if (
      gBoardArr[0] !== "" &&
      gBoardArr[0] === gBoardArr[4] &&
      gBoardArr[0] === gBoardArr[8]
    ) {
      gameBoard.displayMessage(`${gBoardArr[0]} wins!`, false);

      gameBoard.isGameOver = true;
    }

    if (
      gBoardArr[2] !== "" &&
      gBoardArr[2] === gBoardArr[4] &&
      gBoardArr[2] === gBoardArr[6]
    ) {
      gameBoard.displayMessage(`${gBoardArr[2]} wins!`, false);

      gameBoard.isGameOver = true;
    }

    if (!gBoardArr.includes("")) {
      gameBoard.displayMessage(`Draw`, false);

      gameBoard.isGameOver = true;
    }
  };

  const handleItemClick = (element) => {
    const index = element.getAttribute("data-index");
    const { gBoardArr } = gameBoard;
    console.log(`Array is  ${gBoardArr}`);

    if (gameBoard.isEmptyArray(index)) {
      element.innerHTML = status;
      gameBoard.addToArray(index, status);
      return true;
    }
  };

  const updateGameState = () => {
    checkForWinner();
  };

  const handleEvent = (event) => {
    console.log(gameBoard.isGameOver);

    if (gameBoard.isGameOver) {
      removeEventListener();
      return;
    }

    if (handleItemClick(event.target, status)) {
      updateGameState();
      removeEventListener();
      gameBoard.playerTurn();
    } else {
      gameBoard.displayMessage(`This field is already occupied!`, true);
    }
  };

  const addEventListener = () => {
    const item = document.querySelectorAll(".item");
    item.forEach((element) => {
      element.addEventListener("click", handleEvent);
    });
  };

  const removeEventListener = () => {
    const item = document.querySelectorAll(".item");
    item.forEach((element) => {
      element.removeEventListener("click", handleEvent);
    });
  };

  const itemsEventListener = () => {
    const start = () => {
      addEventListener();
    };
    const end = () => {
      removeEventListener();
    };
    return { start, end };
  };
  return { status, itemsEventListener };
};

const game = (() => {
  //Setup game grid
  gameBoard.manageGrid().createGrid(gameBoard.gBoardArr);

  //Create Player
  const p1 = Player("X");
  const p2 = Player("O");

  //Initialize players in gameBoard
  gameBoard.initializePlayer(p1, p2);

  //Allow one of the players to make a turn
  gameBoard.playerTurn();
})();
