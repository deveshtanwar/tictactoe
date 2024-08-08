import React from 'react';
import Square from './Square';
import styles from './board.module.css';

const Board = ({ xIsNext, squares, onPlay, reset, move }) => {

    const clickHandler = (i) => {
        if (squares[i] || calculateWinner()) {
            console.log("winner found || cannot move on the given box");
            return;
        }

        const newSquares = squares.slice();
        xIsNext ? newSquares[i] = "x" : newSquares[i] = '0';

        onPlay(newSquares);
    }

    const winnerSquares = [];

    const calculateWinner = () => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];

            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                winnerSquares.push(a, b, c);
                return squares[a] // winner found
            }
        }

        return null; // no winner found
    }

    const winner = calculateWinner();

    let status;
    winner ? status = `winner : ${winner}` : move === 9 ? status = `Game Draw` : status = `Next move : ${xIsNext ? 'X' : '0'}`;

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>
            <div className={winner ? styles.winner : move === 9 ? styles.draw : styles.status}>{status}</div>
            <div className={styles.status}><button style={{ padding: '6px 10px', backgroundColor: "coral", border: 'none', color: "white", fontWeight: "600" , borderRadius: '5px'}} onClick={reset}>Reset</button></div>
            <div className={styles.game_box}>
                {squares.map((value, i) =>
                    <Square key={i} value={value} onclick={() => { clickHandler(i) }} winner={winnerSquares} index={i}/>
                )}
            </div>
        </div>
    )
}

export default Board;