import React from 'react';
import './Board.css';
import Square from '../Square/Square';

export default class Board extends React.Component {

    renderSquare(i) {
        let isSelected = this.props.currentSelected;
        return <Square key={i} isSelected={isSelected == i} value={this.props.squares[i]} coord={i} onClick={() => { this.props.onClick(i) }} />;
    }

    renderBoard() {
        var board = [];

        for (let i = 0; i < 3; i++) {
            var row = [];
            for (let j = 0; j < 3; j++) {
                row.push(this.renderSquare(3 * i + j));
            }
            board.push(
                <div key={i} className="board-row">
                    {row}
                </div>
            );
        }

        return board;
    }

    render() {
        return (
            <div>
                {this.renderBoard()}
            </div>
        );
    }
}
