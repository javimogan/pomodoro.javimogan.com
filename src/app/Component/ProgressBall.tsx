interface IProps {
    currentIndex: number;
    balls: string[];
}
export default function ProgressBalls(props: IProps) {
    return (
        <div className="flex gap-2 w-full justify-center">
            {Array.from({ length: props.balls.length }, (_, i) => (
                <div
                    key={i}
                    style={{
                        backgroundColor: props.balls[i],
                        opacity: i > props.currentIndex ? 0.5 : 1,
                        filter: i > props.currentIndex ? 'grayscale(80%)' : 'none',
                    }}
                    className={`w-6 h-6 rounded-full`}
                ></div>
            ))}
        </div>
    );
};