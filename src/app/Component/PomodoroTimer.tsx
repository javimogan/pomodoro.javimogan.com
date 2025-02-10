import moment from 'moment';
import React from 'react';
import { useCountUp } from 'use-count-up';
import { ITime } from '../page';


export interface IPomodoroTimerProps {
    timer?: ITime & { type: "cycle" | "shortBreak" | "longBreak" };
    onEnd: () => void;
    isCounting: boolean;
}

export interface IPomodoroTimerRef {
    reset: () => void;
}

const strokeWidth = 2;
const radius = 50 - strokeWidth / 2;
const circumference = 2 * Math.PI * radius;

export const PomodoroTimer = React.forwardRef<IPomodoroTimerRef, IPomodoroTimerProps>(({ timer, onEnd, isCounting }, ref) => {
    const { value: smooth, reset: _r } = useCountUp({
        isCounting: isCounting,
        duration: timer?.duration,
        start: timer?.duration,
        easing: 'linear',
        end: 0,
        onComplete: ()=>{_r();onEnd()},
        formatter: (value) =>timer?.duration?[value as number, 100 - ((value as number * 100) / (timer.duration))]:[0, 0],
    });
    
    React.useImperativeHandle(ref, () => ({
        reset: () => _r(),
    }));

    const [timeLeft, porcentage] = React.useMemo(() => smooth as unknown as [number, number], [smooth]);

    const timeLeftFormatted = React.useMemo(() => 
        moment.utc(Math.ceil(timeLeft) * 1000).format(
            timeLeft <= 59 ? "s"
            : timeLeft < 3600 ? 'mm:ss' 
            : 'HH:mm:ss'
        ), 
        [timeLeft]
      );
          const endBlockTime = React.useMemo(() => {
        const end = moment().add(timeLeft, 'seconds');
        return end.format('HH:mm');
    }, [isCounting]);
    return (
        <section className='flex flex-col items-center p-4 gap-4'>
                <h1>{timer?.text}</h1>
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                    <circle
                        cx="50%"
                        cy="50%"
                        r={radius}
                        stroke="#ddd"
                        strokeWidth={strokeWidth}
                        fill="none"
                    />
                    <circle
                        cx="50%"
                        cy="50%"
                        r={radius}
                        stroke={timer?.color}
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - (porcentage / 100) * circumference}
                        strokeLinecap="round"
                        transform="rotate(-90, 50, 50)"
                    />
                    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="15" fill={timer?.color}>
                        {timeLeftFormatted}
                    </text>
                    {isCounting && (
                    <text x="50%" y="90%" dominantBaseline="middle" textAnchor="middle" fontSize="5" fill={'white'}>
                        End: {endBlockTime}
                    </text>
                    )}
                </svg>
        </section>
    );
});