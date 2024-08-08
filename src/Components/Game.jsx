import React, { useState } from 'react'
import Board from './Board';
import styles from './game.module.css';

const Game = () => {

    // const [xIsNext, setXIsNext] = useState(true);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;

    // const currentSquares = history[history.length - 1];
    const currentSquares = history[currentMove];

    const playHandler = (nextSquares) => {
        // setHistory([...history, nextSquares]);
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        // setXIsNext(!xIsNext);
    }

    const resetHandler = () => {
        setCurrentMove(0);
        setHistory([Array(9).fill(null)]);
    }

    const jumpTo = (move) => {
        setCurrentMove(move);
        // setXIsNext(!xIsNext);
    }


    const moves = history.map((squares, move) => {
        if (move === 0) return null;

        const description = `Go to move ${move}`;

        return (
            <button key={move} style={{ padding: "5px", margin: "2px", fontWeight: "500" , borderRadius: '5px'}}
                onClick={() => { jumpTo(move) }}
                disabled={currentMove == move}
            >
                {description}
            </button>
        )
    })

    return (
        <>
            <div className={styles.heading}>Tic Tac Toe</div>
            <div className={styles.game_wrapper}>
                <div>
                    <Board xIsNext={xIsNext} squares={currentSquares} onPlay={playHandler} reset={resetHandler} move={currentMove} />
                </div>
                <div className={styles.pastMovesWrapper}>
                    <p>Past Moves : </p>
                    <div style={{ marginTop: "20px", display: "flex", flexDirection: "column" }}>
                        {moves}
                    </div>
                </div>
            </div>
            <div className={styles.note}> * click on the boxes to play your turn
                <div className={styles.footer}>-<i>Devesh Tanwar</i></div>
            </div>

        </>
    )
}

export default Game;