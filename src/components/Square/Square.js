import React from 'react';
import './Square.css';

export default function Square(props) {
    let classNames = "square ";

    if (props.isSelected) {
        classNames += "square-selected ";
    }
    if (props.inWinLine) {
        classNames += "win-square";

    }

    return (
        <button className={classNames} onClick={() => { props.onClick() }}>
            {props.value}
        </button>
    )
}
