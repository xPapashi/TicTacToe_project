const gameBoard = (() => {
    const gBoardArr = [
        "X", "X", "O",
        "O", "O", "X",
        "X", "O", "X"
    ];
    const init = () => {};
    return {gBoardArr, init};
})();

const Player = () => {

};

const createGrid = () => {
    const {gBoardArr} = gameBoard;
    const main = document.querySelector(".main");
    const grid = document.createElement('div');
    grid.classList.add('grid');

    for (let object in gBoardArr) {
        console.log(gBoardArr[object]);
        const item = document.createElement(`div`);
        item.classList.add(`item`);
        item.innerHTML = gBoardArr[object];
        grid.appendChild(item);

    }

    console.log(gBoardArr);
    

    main.appendChild(grid);
}

createGrid();