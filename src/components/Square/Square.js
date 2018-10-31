import React from 'react';
import './Square.css';

export default function Square(props) {
    return (
        <button className="square" onClick={() => {props.onClick(props.coord)}}>
            {props.value}
        </button>
    )
}
