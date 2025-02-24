import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'X';
const PLAYER_2 = 'O';

const generateSquares = () => {
  const squares = [];

  let currentId = 0;

  for (let row = 0; row < 3; row += 1) {
    squares.push([]);
    for (let col = 0; col < 3; col += 1) {
      squares[row].push({
        id: currentId,
        value: '',
      });
      currentId += 1;
    }
  }

  return squares;
};

const App = () => {
  const [squares, setSquares] = useState(generateSquares());
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState('');

  const updateSquare = (id) => {
    const squarePos = [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 1],
      [1, 2],
      [2, 0],
      [2, 1],
      [2, 2],
    ];

    const newBoard = [...squares];

    const clickedSquare = newBoard[squarePos[id][0]][squarePos[id][1]];

    if (winner || clickedSquare.value) return;

    clickedSquare.value = xIsNext ? 'x' : 'o';
    calculateWinner(newBoard);
    setXIsNext(!xIsNext);
    setSquares(newBoard);
  };

  const calculateWinner = (squares) => {
    const wins = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];
    for (let i = 0; i < wins.length; i++) {
      const [a, b, c] = wins[i];
      if (
        squares[a[0]][a[1]].value &&
        squares[a[0]][a[1]].value === squares[b[0]][b[1]].value &&
        squares[a[0]][a[1]].value === squares[c[0]][c[1]].value
      ) {
        // console.log(winner);
        setWinner(squares[a[0]][a[1]].value);
        return;
      }
    }

    for (const row of squares) {
      for (const elem of row) {
        if (elem.value === '') {
          // console.log(winner);
          setWinner('');
          return;
        }
      }
    }
    // console.log(winner);
    setWinner('Tie');
  };

  const resetGame = () => {
    setSquares(generateSquares());
    setWinner('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>Winner is {winner} </h2>
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={updateSquare} />
      </main>
    </div>
  );
};

export default App;
