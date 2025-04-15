// Számláló alkalmazás
function CounterApp() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <p>Számláló értéke: {count}</p>
      <button onClick={() => setCount(count + 1)}>Növelés</button>
      <button onClick={() => setCount(count - 1)}>Csökkentés</button>
      <button onClick={() => setCount(0)}>Visszaállítás</button>
    </div>
  );
}

// Tic-Tac-Toe alkalmazás
function TicTacToe() {
  const [board, setBoard] = React.useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = React.useState(true);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const renderSquare = (index) => {
    return (
      <button
        key={index}
        className="square"
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Győztes: ${winner}`
    : `Következő játékos: ${isXNext ? "X" : "O"}`;

  return (
    <div>
      <p>{status}</p>
      <div className="board">
        {[0, 1, 2].map((row) => (
          <div key={row} className="board-row">
            {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [selectedApp, setSelectedApp] = React.useState("counter");

  return (
    <div>
      <nav>
        <button onClick={() => setSelectedApp("counter")}>Számláló</button>
        <button onClick={() => setSelectedApp("tic-tac-toe")}>Tic-Tac-Toe</button>
      </nav>

      <div style={{ marginTop: "20px" }}>
        {selectedApp === "counter" && <CounterApp />}
        {selectedApp === "tic-tac-toe" && <TicTacToe />}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);