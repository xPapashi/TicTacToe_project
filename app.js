const gameBoard = (() => {
  // const gBoardArr = ["X", "X", "O", "X", "O", "X", "X", "O", "X"];
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

  return { gBoardArr, manageGrid, addToArray, isEmptyArray, displayMessage };
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
        return;
      }
    }

    //Check columns vertically
    for (let col = 0; col < 9; col += 1) {
      if (
        gBoardArr[col] !== "" &&
        gBoardArr[col] === gBoardArr[col + 3] &&
        gBoardArr[col + 6]
      ) {
        gameBoard.displayMessage(`${gBoardArr[col]} wins!`, false);
        return;
      }
    }

    //Check rows + columns diagonally
    if (
      gBoardArr[0] !== "" &&
      gBoardArr[0] === gBoardArr[4] &&
      gBoardArr[0] === gBoardArr[8]
    ) {
      gameBoard.displayMessage(`${gBoardArr[0]} wins!`, false);
      return;
    }

    if (
      gBoardArr[2] !== "" &&
      gBoardArr[2] === gBoardArr[4] &&
      gBoardArr[2] === gBoardArr[6]
    ) {
      gameBoard.displayMessage(`${gBoardArr[2]} wins!`, false);
      return;
    }

    if (!gBoardArr.includes("")) {
      gameBoard.displayMessage(`Draw`, false);
    }
  };

  const updateGameState = () => {
    checkForWinner();
  };

  const itemsEventListener = () => {
    const start = () => {
      const item = document.querySelectorAll(".item");
      status = status ? "X" : "O";

      item.forEach((element) => {
        element.addEventListener("click", () => {
          const index = element.getAttribute("data-index");
          if (gameBoard.isEmptyArray(index)) {
            element.innerHTML = status;
            gameBoard.addToArray(index, status);
            updateGameState();
          } else {
            gameBoard.displayMessage(`This field is already occupied!`, true);
          }
        });
      });
    };
    return { start };
  };
  return { status, itemsEventListener };
};

const game = (() => {
  //Setup game grid
  gameBoard.manageGrid().createGrid(gameBoard.gBoardArr);

  //Create Player
  const player = Player(1);
  player.itemsEventListener().start();
})();
