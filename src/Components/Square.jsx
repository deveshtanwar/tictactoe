import React from 'react';
import style from './square.module.css';

const Square = ({ value, onclick, winner, index }) => {

    let isWinnerSquare = false;

    if (winner) {
        const [a, b, c] = winner;
        isWinnerSquare = a === index || b === index || c === index;
    }

    return (
        <button className={isWinnerSquare ? style.winner : style.square} onClick={onclick}>
            {value}
        </button>
    )
}

export default Square;