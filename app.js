const gameBoard = (() => {
  const gBoardArr = ["X", "X", "O", "O", "O", "X", "X", "O", "X"];
  return { gBoardArr };
})();

const Player = () => {};

const manageGrid = () => {
  // const {gBoardArr} = gameBoard;
  const main = document.querySelector(".main");
  const grid = document.createElement("div");
  grid.classList.add("grid");

  const createGrid = (gridArr) => {
    for (let object in gridArr) {
      const item = document.createElement(`div`);
      item.classList.add(`item`);
      item.innerHTML = gridArr[object];
      grid.appendChild(item);
    }
    main.appendChild(grid);
  };

  return { createGrid };
};

const displayController = (() => {
  const game = manageGrid();
  game.createGrid(gameBoard.gBoardArr);
})();