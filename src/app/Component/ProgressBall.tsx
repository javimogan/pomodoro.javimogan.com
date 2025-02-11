"use client"
import moment from "moment";
import { IDurationTime, ITime } from "../page";
import React from "react";

interface IProps {
    currentIndex: number;
    durationTime: IDurationTime[]|undefined;
    balls: (ITime & { type: "cycle" | "shortBreak" | "longBreak"})[];
}
export default function ProgressBalls(props: IProps) {
    // const balls = React.useMemo(() => {
    //     if (!props.startBlock) return props.balls;
    //     let start = props.startBlock;
    //     return props.balls.map((ball) => {
    //         let _end = moment(start, 'HH:mm').add(ball.duration, 'seconds').format('HH:mm');
    //         let aux = { ...ball, start: start, end: _end };
    //         start = _end;
    //         return aux
    //     });

    // }, [props])
    return (
        <div className="flex gap-2 w-full justify-center">
            {props.balls.map((_, i) => (
                <div
                    key={i}
                    title={(props.durationTime && props.durationTime[i].start && props.durationTime[i].end) && props.durationTime[i].start + ' ~ ' + props.durationTime[i].end}
                    style={{
                        backgroundColor: props.balls[i].color,
                        opacity: i > props.currentIndex ? 0.6 : 1,
                        filter: i > props.currentIndex ? 'grayscale(10%)' : 'none',
                        
                    }}
                    className={`w-6 h-6 rounded-full ${i === props.currentIndex && `animate-pulse duration-1000`} ease-in-out`}
                ></div>
            ))}
        </div>
    );
};