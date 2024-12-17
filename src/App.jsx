import { useState, useEffect } from 'react';
import { blockOpponentMove, AI_Turn } from './Logic/TicTacToe_Ai';

function App() {
  const [grid, setGrid] = useState(['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E']);
  const [player, setPlayer] = useState('X');
  const [winner, setWinner] = useState('');

  const handelDraw = (currentGrid) => {
    if (!currentGrid.includes('E')) {
      setWinner('Draw');
    }
  };

  const CheckWinner = (currentGrid) => {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];

    for (const condition of winConditions) {
      const [a, b, c] = condition;
      if (currentGrid[a] === currentGrid[b] && currentGrid[b] === currentGrid[c] && currentGrid[a] !== 'E') {
        setWinner(currentGrid[a]);
        return;
      }
    }
    handelDraw(currentGrid);
    return;
  };


  const ApplyTurn = (index, player) => {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[index] = player;
      return newGrid;
    });

  };

  const ValidTurn = (index) => grid[index] === 'E';

  const AiTurn = async (currentGrid) => {
    const mapping = {
      'A1': 0, 'A2': 1, 'A3': 2,
      'B1': 3, 'B2': 4, 'B3': 5,
      'C1': 6, 'C2': 7, 'C3': 8,
    };
    const reverseMapping = {
      0: 'A1', 1: 'A2', 2: 'A3',
      3: 'B1', 4: 'B2', 5: 'B3',
      6: 'C1', 7: 'C2', 8: 'C3',
    };

    const coordinate = await blockOpponentMove(currentGrid, 'O');
    // const coordinate = await AI_Turn(currentGrid);
    const index = mapping[coordinate];
    // console.log("AI index: ", index);
    

    if (index !== undefined && ValidTurn(index)) {
      // console.log("AI index: ", index);
      
      ApplyTurn(index, 'O');
      setPlayer('X');
      CheckWinner(grid);
    }
  };

  useEffect(() => {
    CheckWinner(grid);

    if (player === 'O' && !winner) {
      AiTurn(grid);

    }
  }, [grid, player, winner]);

  const HandleClick = (index) => {
    if (!ValidTurn(index) || winner) return;

    if (player === 'X') {
      ApplyTurn(index, 'X');
      setPlayer('O');
      CheckWinner(grid);
    }
  };



  return (
    <>
  <div className="bg-[url('https://t3.ftcdn.net/jpg/03/23/88/08/360_F_323880864_TPsH5ropjEBo1ViILJmcFHJqsBzorxUB.jpg')] bg-cover bg-center">
    <div className="grid place-content-center h-screen bg-black/70">
      <div className="border-2 border-gray-700 grid grid-cols-3 gap-3 bg-gray-800 p-5 rounded-lg shadow-lg">
        {grid.map((cell, index) => (
          <div
            key={index}
            className="border-2 border-gray-600 w-20 sm:w-32 h-20 sm:h-32 flex items-center justify-center text-6xl cursor-pointer bg-gray-900 text-teal-400 hover:bg-gray-700 transition"
            onClick={() => HandleClick(index)}
          >
            {cell !== 'E' ? cell : ""}
          </div>
        ))}
      </div>
      {winner && (
        <div className="mt-5 text-center">
          <h2 className="text-3xl font-bold text-teal-300">
            {winner === 'Draw' ? 'Match Draw' : `Winner: ${winner}`}
          </h2>
        </div>
      )}
      <button
        className="border-2 border-teal-500 px-4 py-2 rounded-md text-white font-semibold mt-3 bg-teal-600 hover:bg-teal-500 transition"
        onClick={() => {
          setGrid(['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E']);
          setPlayer('X');
          setWinner('');
        }}
      >
        Reset
      </button>
    </div>
  </div>
</>

  );
}

export default App;
