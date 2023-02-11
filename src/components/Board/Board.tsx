import { DifficultyLevelContext } from '@/context/context';
import styles from '@/styles/Board.module.scss';
import { useContext, useEffect, useState } from 'react';
import {
  createGameGrid,
  fillEmptyGrid,
  getRandomWords,
} from './helperFunctions';
import { WordArr } from './types';

export const Board = (props: WordArr): JSX.Element => {
  const [grid, setGrid] = useState<string[][]>([]);
  const level = useContext(DifficultyLevelContext);

  useEffect(() => {
    if (props.words.length === 0) {
      return;
    }

    createGameGrid(props.words, setGrid, level);
  }, [props]);

  return (
    <div className={styles.board}>
      <div className={styles.board__container}>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.board__cell}>
            {row.map((word, colIndex) => (
              <div key={colIndex} className={styles.board__letter}>
                {word}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles['board__word-container']}>
        {props.words.map((word, wordIndex) => (
          <div key={wordIndex} className={styles.board__word}>
            <p>{word}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
