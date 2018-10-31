import React from 'react';
import './Game.css';
import Board from '../Board/Board';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                coord: null
            }],
            xIsNext: true,
            stepNumber: 0,
            toggleMovesOrder: 1,
            winLine: []
        }
    }


    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat([
                {
                    squares: squares,
                    coord: {
                        x: i % 3,
                        y: Math.floor(i / 3) + 1,
                        i: i
                    }
                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    sortMove() {
        this.setState({
            toggleMovesOrder: -1 * this.state.toggleMovesOrder
        })
    }


    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        let moves = history.map((step, move) => {
            const desc = move ?
                'Go to move: ' + step.coord.x + ', ' + step.coord.y :
                'Go to game start';
            return (
                <li key={move}>
                    <button className={move == this.state.stepNumber ? "current-selected" : ""} onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });
        if (this.state.toggleMovesOrder) {
            moves = moves.sort(() => {
                return this.state.toggleMovesOrder;
            })
        }


        let status;
        if (winner) {
            status = "Winner: " + (winner ? winner.winner : '');
        } else {
            if (this.state.stepNumber == 9) {
                status = "DRAW";
            } else {    
                status = "Next player: " + (this.state.xIsNext ? "X" : "O");
            }

        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        currentSelected={current.coord ? current.coord.i : null}
                        onClick={i => { this.handleClick(i) }}
                        winLine={winner ? winner.line: ''}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div className="history-controller">
                        <button onClick={() => this.sortMove()}>Sort</button>
                    </div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }

}

function calculateWinner(squares) {
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
    var i;
    for (var i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                line: lines[i],
                winner: squares[a]
            };
        }
    }
    return null;
}
