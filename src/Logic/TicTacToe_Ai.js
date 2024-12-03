import { GoogleGenerativeAI } from "@google/generative-ai";


const API_KEY = String(import.meta.env.VITE_GEMINI_API_KEY);

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });



export const AI_Turn = async (arr) => {
  try {
    const prompt = `You are given an array of size 9 representing a 3x3 TicTacToe grid. 
- The array elements can be:
  - 'O' for your moves (player O),
  - 'X' for the opponent's moves (player X),
  - 'E' for an empty cell.
- Your goal is to play as 'O' in one of the empty cells (marked 'E') to maximize your chances of winning. 
- The current state of the grid is represented as: 
  { ${arr[0]}, ${arr[1]}, ${arr[2]}, ${arr[3]}, ${arr[4]}, ${arr[5]}, ${arr[6]}, ${arr[7]}, ${arr[8]} }.
- Each cell is identified by an index as follows:
  - A1, A2, A3 (top row)
  - B1, B2, B3 (middle row)
  - C1, C2, C3 (bottom row)

Based on the current state of the grid, decide the best empty cell ('E') to play your move and provide the index of that cell.
You must play the best winnig move. Return only the index (e.g., A1, B3, etc.), nothing else.`;

    const result = await model.generateContent(prompt);
    const index = result.response.text().trim();
    console.log("Full response from API:", index);
    return index;
  } catch (error) {
    console.error("Error in AI_Turn function:", error);
    throw error;
  }
};


export function blockOpponentMove(grid, opponentMove) {
  const mapping = {
    'A1': 0, 'A2': 1, 'A3': 2,
    'B1': 3, 'B2': 4, 'B3': 5,
    'C1': 6, 'C2': 7, 'C3': 8,
  };

  const reverseMapping = {
    0: 'A1', 1: 'A2', 2: 'A3',
    3: 'B1', 4: 'B2', 5: 'B3',
    6: 'C1', 7: 'C2', 8: 'C3',
  }

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8], 
    [0, 4, 8],
    [2, 4, 6], 
  ];

  const opponentIndex = mapping[opponentMove];
  // console.log("grid: ", grid);
  
  for (const combo of winningCombos) {
    const opponentCount = combo.filter(index => grid[index] === 'X').length;
    const emptyCount = combo.filter(index => grid[index] === 'E').length;
    
    if (opponentCount === 2 && emptyCount === 1) {
      const emptyIndex = combo.find(index => grid[index] === 'E');
      // console.log("Opponent count: ", opponentCount, "Empty count: ", emptyCount);
      // console.log("Block opponent move:", reverseMapping[emptyIndex], "recent move: ", opponentMove);
      return reverseMapping[emptyIndex];
    }
  }
  // console.log("No need to block opponent move. Recent move: ", opponentMove);
  
  const firstEmptyIndex = grid.findIndex(cell => cell === 'E');
  return firstEmptyIndex !== -1 ? reverseMapping[firstEmptyIndex] : null;
}




  

