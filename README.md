# TicTacToe
Experience the game live at: [tictactoe](https://tictactoebattlearena.netlify.app/)
<img width="1470" alt="Screenshot 2024-12-04 at 5 27 38 PM" src="https://github.com/user-attachments/assets/795fed6f-c3e1-4bf5-a8f6-5e2cb03acf00">

## Tic-Tac-Toe with AI-Powered Move Suggestion

This project is an interactive Tic-Tac-Toe game enhanced with AI capabilities to suggest the best possible moves. The AI, powered by Google Generative AI, ensures an engaging and competitive gameplay experience.




## Features

* **AI-Powered Move Suggestion**:  
  The AI evaluates the current state of the board and determines the optimal move for the player, maximizing the chances of winning.

* **Opponent Block Functionality**:  
  A robust algorithm detects potential winning moves for the opponent and blocks them strategically.

* **Dynamic Board Representation**:  
  The 3x3 grid is represented as an array, making it easy to process and update the board's state.

### Hosting:
* Deployed live at [tictactoe](https://tictactoebattlearena.netlify.app/).

### Opponent Block Functionality (`blockOpponentMove` Function)
* Identifies potential winning combinations for the opponent based on their recent move.  
* Blocks the opponent by playing in the empty cell of their imminent winning line.  
* Defaults to the first available empty cell if no threat is detected.


#### Clone repository 
````
git clone https://github.com/NeerajKumar-1044/TicTacToe.git
````
#### Install dependencies: 
```
npm install
```
#### Add your API key: Create a .env file and add your Google Generative AI key: 
```
VITE_GEMINI_API_KEY=your_api_key_here
```
#### Run Code
```
npm run dev
```
Open the game in your browser at http://localhost:5173.
