import { chars } from 'public/chars';

export const getRandomWords = (words: string[]): string[] => {
  const randomWords = [];
  const selectedIndexes = new Set<number>();

  while (randomWords.length < 5) {
    const randomIndex = Math.floor(Math.random() * words.length);

    if (!selectedIndexes.has(randomIndex) && words[randomIndex].length < 8) {
      selectedIndexes.add(randomIndex);
      randomWords.push(words[randomIndex]);
    }
  }

  return randomWords;
};

export const createGameGrid = (
  words: string[],
  setGrid: React.Dispatch<React.SetStateAction<string[][]>>
) => {
  const numOfRows = 8;
  const numOfColumns = 8;
  let grid: string[][] = [];

  for (let i = 0; i < numOfRows; i++) {
    let row: string[] = [];
    for (let j = 0; j < numOfColumns; j++) {
      row.push('');
    }
    grid.push(row);
  }

  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  const insertWord = (
    grid: string[][],
    word: string,
    x: number,
    y: number,
    dx: number,
    dy: number
  ) => {
    for (let i = 0; i < word.length; i++) {
      if (x >= 0 && x < numOfRows && y >= 0 && y < numOfColumns) {
        grid[x][y] = word[i];
      } else {
        return false;
      }
      x += dx;
      y += dy;
    }
    return true;
  };

  const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  words.forEach((word) => {
    let x = randomInt(0, numOfRows - 1);
    let y = randomInt(0, numOfColumns - 1);
    let dx = directions[randomInt(0, directions.length - 1)][0];
    let dy = directions[randomInt(0, directions.length - 1)][1];
    let attempts = 0;
    let success = false;

    while (!success && attempts < 1000) {
      success = insertWord(grid, word, x, y, dx, dy);
      x = randomInt(0, numOfRows - 1);
      y = randomInt(0, numOfColumns - 1);
      dx = directions[randomInt(0, directions.length - 1)][0];
      dy = directions[randomInt(0, directions.length - 1)][1];
      attempts++;
    }
  });

  setGrid(grid);
};

export const fillEmptyGrid = (
  grid: string[][],
  setGrid: React.Dispatch<React.SetStateAction<string[][]>>
) => {
  const filledGrid = grid.map((row, rowIndex) =>
    row.map((cell, cellIndex) => {
      if (!cell) {
        return chars[Math.floor(Math.random() * chars.length)];
      }
      return cell;
    })
  );
  setGrid(filledGrid);
};
