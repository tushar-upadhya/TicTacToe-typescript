interface ISquareProps {
    onClick: () => void;
    value: "X" | "O" | null;
}

const Square: React.FC<ISquareProps> = ({ onClick, value }) => {
    if (!value) {
        return (
            <>
                <button className="board-square" onClick={onClick}>
                    {value}
                </button>
            </>
        );
    }
    return (
        <button disabled className={`board-square square_${value}`}>
            {value}
        </button>
    );
};

export default Square;
