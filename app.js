const gameBoard = (() => {
  const gBoardArr = ["X", "", "", "", "O", "X", "X", "O", "X"];
  //   const gBoardArr = ["", "", "", "", "", "", "", "", ""];
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
  const itemsEventListener = () => {
    const start = () => {
      const item = document.querySelectorAll(".item");

      item.forEach((element) => {
        element.addEventListener("click", () => {
          const index = element.getAttribute("data-index");
          if (gameBoard.isEmptyArray(index)) {
            element.innerHTML = status;
            gameBoard.addToArray(index, status);
          } else {
            gameBoard.displayMessage(`This field is already occupied!`, 1);
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
  const player = Player("X");
  player.itemsEventListener().start();
})();
