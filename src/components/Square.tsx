interface ISquareProps {
    onClick: () => void;
    value: "X" | "O" | null;
    winner: string | null;
}

const Square: React.FC<ISquareProps> = ({ onClick, value, winner }) => {
    if (!value) {
        return (
            <button
                onClick={onClick}
                disabled={Boolean(winner)}
                className="board-square"
            />
        );
    }
    return (
        <button disabled className={`board-square square_${value}`}>
            {value}
        </button>
    );
};

export default Square;
