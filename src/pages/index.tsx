import Head from 'next/head';
import { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.scss';
import { Board } from '@/components/Board/Board';
import { getRandomWords } from '@/components/Board/helperFunctions';
import { DifficultyLevelContext } from '@/context/context';

export default function Home() {
  const [words, setWords] = useState<string[]>([]);
  const [currentWords, setCurrentWords] = useState<string[]>([]);
  const [difficultyLevel, setDifficultyLevel] = useState(8);

  useEffect(() => {
    const loadWords = async () => {
      const response = await fetch('/wordlist.txt');
      const contents = await response.text();
      setWords(contents.split('\n'));
    };

    loadWords();
  }, []);

  useEffect(() => {
    if (words.length > 0)
      setCurrentWords(getRandomWords(words, difficultyLevel));
  }, [words, difficultyLevel]);

  return (
    <>
      <Head>
        <title>Word Game</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='' />
      </Head>
      <main>
        <DifficultyLevelContext.Provider value={difficultyLevel}>
          <Board words={currentWords} />
        </DifficultyLevelContext.Provider>
      </main>
    </>
  );
}
