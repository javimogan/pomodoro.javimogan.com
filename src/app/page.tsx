"use client"
import React from "react";
import { IPomodoroTimerRef, PomodoroTimer } from "./Component/PomodoroTimer";
import ProgressBalls from "./Component/ProgressBall";
import moment from "moment";
import { blocks } from "@/BLOCKS";

export interface ITime {
  color: string;
  text: string;
  duration: number;
}

export interface IBlock {
  start?: string;
  name: string;
  blocks: {
    cycles: number;
    pomodoro: ITime;
    shortBreak: ITime;
    longBreak: ITime;
  }[];
}




function flow2Timers(flow: IBlock['blocks']) {
  const blocks: ITime[] = [];
  flow.forEach((block) => {
    for (let i = 0; i < block.cycles; i++) {
      blocks.push({ ...block.pomodoro, duration: block.pomodoro.duration * 60 });
      if (i < block.cycles - 1) {
        blocks.push({ ...block.shortBreak, duration: block.shortBreak.duration * 60 });
      }
    }
    blocks.push({ ...block.longBreak, duration: block.longBreak.duration * 60 });
  });
  //Elimina el ultimo break
  blocks.pop();
  return blocks;
}


export default function Home() {
  //Timer de 10 minutos
  const [realStartTime, setRealStartTime] = React.useState<string | undefined>();
  const [realStopTime, setRealStopTime] = React.useState<string | undefined>();
  const [block, setBlock] = React.useState<IBlock>(blocks[0]);
  const [timers, setTimers] = React.useState<ITime[]>([]);
  const [currentTimer, setCurrentTimer] = React.useState<number>(0);
  const [isCounting, setIsCounting] = React.useState(false);
  const timer = React.useRef<IPomodoroTimerRef | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);


  React.useEffect(() => {
    setTimers(flow2Timers(block.blocks));
    setCurrentTimer(0);
    setIsCounting(false);
    timer.current?.reset();
  }, [block]);
  const [startBlock, endBlock, stepsBlock] = React.useMemo(() => {
    const timers = flow2Timers(block.blocks);
    const _start = moment(block.start, 'HH:mm');
    const _end = _start.clone();
    const steps: { start: string, end: string }[] = [];
    timers.forEach((t) => {
      steps.push({
        start: _start.format('HH:mm'),
        end: _start.add(t.duration, 'seconds').format('HH:mm')
      });
      _end.add(t.duration, 'seconds');
    });
    console.log(steps);
    return [block.start && moment(block.start, 'HH:mm').format("HH:mm"), block.start &&  _end.format('HH:mm'), steps];
  }, [block]);
  const next = React.useCallback((sound: boolean = true) => {
    //Sonar cancion
    if (sound && audioRef.current) {
      audioRef.current.play();
    }
    setCurrentTimer(currentTimer + 1);
    timer.current?.reset(); setIsCounting(true)
  }, [currentTimer, timer, audioRef]);
  return (

    <main className="flex flex-col items-center my-8 gap-4">
      <section className="flex flex-row items-center gap-2">
        {blocks.map((b) => (
          <button key={`block-${b.name}`} onClick={() => setBlock(b)} type="button" className={`text-white ${block.name === b.name ? 'bg-[#B91724] hover:bg-[#CA1724]' : 'bg-[#814652] hover:bg-[#B91724BB]'}  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}>{b.name}</button>
        ))}
      </section>
      <audio ref={audioRef} src="/audio/sound_1.mp3" />
      <div className="flex flex-row items-center gap-2">
        <span className='text-1xl font-bold'>{block.name}</span>
        {startBlock && endBlock && (
          <span>{startBlock} ~ {endBlock}</span>
        )}
        {realStartTime && realStopTime && (
          <>
            <span>//</span>
            <span>{realStartTime} ~ {realStopTime}</span>
          </>
        )}
      </div>
      <ProgressBalls currentIndex={currentTimer} balls={timers.map((t) => t.color)} />
      <PomodoroTimer
        ref={timer}
        timer={timers[currentTimer]}
        onEnd={next}
        isCounting={isCounting}
      />
      <div className='flex gap-8'>
        {isCounting ? (
          <button
            className="text-white bg-[#B91724] hover:bg-[#CA1724]  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            onClick={() => { setIsCounting(false) }}>Pause</button>) :
          (
            <button
              className="text-white bg-[#166534] hover:bg-[#166534]  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              onClick={() => {
                if (!realStartTime) {
                  setRealStartTime(moment().format('HH:mm'));
                }
                setRealStopTime(moment().add(timers.slice(currentTimer+1, timers.length).reduce((acc, t) => acc + t.duration, 0), 'seconds').format('HH:mm'));
                setIsCounting(true)
              }}>
              Start
            </button>
          )
        }
        {/* <button onClick={() => {timer.current?.reset()}}>Reset</button> */}
        <button onClick={() => { setRealStopTime(moment().add(timers.slice(currentTimer+1, timers.length).reduce((acc, t) => acc + t.duration, 0), 'seconds').format('HH:mm')); next(false) }}>Skip</button>
      </div>
    </main>

  );
}

