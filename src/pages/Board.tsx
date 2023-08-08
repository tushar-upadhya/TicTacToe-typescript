import { useEffect, useState } from "react";

import { Grid } from "semantic-ui-react";

import Square from "../components/Square";

// TYPE
type TPlayer = "X" | "O" | null;

const Board: React.FC = () => {
    const activePLayer = Math.random() + 1 === 1 ? "X" : "O";

    const [square, setSquare] = useState<TPlayer[]>(Array(9).fill(null));

    const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">(activePLayer);

    const [winner, setWinner] = useState<string | null>(null);

    const setSquareValue = (index: number) => {
        const data = square.map((value, i) => {
            if (index === i) {
                return currentPlayer;
            }
            return value;
        });
        setSquare(data);
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    };

    const calWinner = (square: TPlayer[]) => {
        const possibleWinnerComb = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return possibleWinnerComb
            .map((combo) => {
                const [a, b, c] = combo;

                if (
                    square[a] &&
                    square[a] === square[b] &&
                    square[a] === square[c]
                ) {
                    return square[a];
                }
                return null;
            })
            .filter((data) => data)[0];
    };

    useEffect(() => {
        const winnerPlayer = calWinner(square);

        if (winnerPlayer) {
            setWinner(`${winnerPlayer} is the winner `);
        } else if (
            !winnerPlayer &&
            !square.filter((square) => !square).length
        ) {
            setWinner("Both player won,Reload for new game");
        }
    });

    return (
        <div className="board-wrapper">
            {winner ? (
                <p>{winner}</p>
            ) : (
                <p>Hey {currentPlayer}, It's your turn</p>
            )}
            <Grid columns={3} centered>
                {Array(9)
                    .fill(null)
                    .map((value, index) => {
                        return (
                            <Grid.Column className="board-column" key={index}>
                                <Square
                                    key={index}
                                    onClick={() => setSquareValue(index)}
                                    value={square[index]}
                                    winner={winner}
                                />
                            </Grid.Column>
                        );
                    })}
            </Grid>
        </div>
    );
};

export default Board;
