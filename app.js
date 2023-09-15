const gameBoard = (() => {
  //   const gBoardArr = ["X", "X", "O", "O", "O", "X", "X", "O", "X"];
  const gBoardArr = ["", "", "", "", "", "", "", "", ""];
  const main = document.querySelector(".main");
  const grid = document.createElement("div");

  const manageGrid = () => {
    grid.classList.add("grid");

    const createGrid = (gridArr) => {
      for (let object in gridArr) {
        const item = document.createElement(`div`);
        item.classList.add(`item`);
        item.setAttribute("data-index", object);
        item.innerHTML = gridArr[object];
        grid.appendChild(item);
      }
      main.appendChild(grid);
    };

    return { createGrid };
  };

  const addToArray = (index, value) => {
    console.log(`Added ${value} to the index of ${index} in array!`);
    gBoardArr.splice(index, 1, value);
  };

  return { gBoardArr, manageGrid, addToArray };
})();

const Player = (status) => {
  const itemsEventListener = () => {
    const start = () => {
      const item = document.querySelectorAll(".item");

      item.forEach((element) => {
        element.addEventListener("click", () => {
          const index = element.getAttribute("data-index");
          element.innerHTML = status;
          gameBoard.addToArray(index, status);
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
