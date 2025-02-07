import { CircularProgress, CircularProgressPropsColorOverrides, ColorPaletteProp } from '@mui/joy'
import moment from 'moment';
import React from 'react'


interface IPomodoroTimerProps {
    initialSecons: number;
    color: string;

}
export default function PomodoroTimer(props: IPomodoroTimerProps) {

    const [timeLeft, setTimeLeft] = React.useState(props.initialSecons);
  
    React.useEffect(() => {
      //Implementing the setInterval method
      const interval = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        } else if (timeLeft <= 0) {
            setTimeLeft(props.initialSecons);
        }
      }, 1000);
      //Clearing the interval
      return () => clearInterval(interval);
    }, [timeLeft]);

    const percentage = React.useMemo(() => {
        return 100 - (timeLeft / (props.initialSecons)) * 100
    }, [timeLeft, props.initialSecons])

    const timeFormat = React.useMemo(() => {
        if (timeLeft < 60) {
            return moment.utc(timeLeft * 1000).format('ss')
        } else if (timeLeft < 3600) {
            return moment.utc(timeLeft * 1000).format('mm:ss')
        } else {
            return moment.utc(timeLeft * 1000).format('HH:mm:ss')
        }
    }, [timeLeft])

    return (
        <section className='flex flex-col items-center border p-4'>
            <CircularProgress  sx={{ color: 'red' }} size="lg" determinate value={percentage}>
                {timeFormat}
            </CircularProgress>
        </section>
    )
}
