"use client"
import React from "react";
import { IPomodoroTimerRef, PomodoroTimer } from "./Component/PomodoroTimer";
import ProgressBalls from "./Component/ProgressBall";
import moment from "moment";
import { blockAfternoon, blockMorning } from "@/BLOCKS";

export interface ITime {
  color: string;
  text: string;
  duration: number;
}

export interface IBlock {
  start: string;
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
  const [block, setBlock] = React.useState<IBlock>(blockMorning);
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
  const [startBlock, endBlock] = React.useMemo(() => {
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
    return [moment(block.start, 'HH:mm').format("HH:mm"), _end.format('HH:mm'), steps];
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
        <button onClick={() => setBlock(blockMorning)} type="button" className={`text-white bg-${block.name==='Morning'?'slate':'gray'}-800 hover:bg-${block.name==='Morning'?'slate':'gray'}-900  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}>{blockMorning.name}</button>
        <button onClick={() => setBlock(blockAfternoon)} type="button" className={`text-white bg-${block.name==='Afternoon'?'slate':'gray'}-800 hover:bg-${block.name==='Afternoon'?'slate':'gray'}-900  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}>{blockAfternoon.name}</button>
      </section>
      <audio ref={audioRef} src="/audio/sound_1.mp3" />
      <div className="flex flex-row items-center gap-2">
        <span className='text-1xl font-bold'>{block.name}</span>
        <span>{startBlock} ~ {endBlock}</span>
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
            className="text-white bg-red-800 hover:bg-red-900  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            onClick={() => { setIsCounting(false) }}>Pause</button>) :
          (
            <button
              className="text-white bg-green-800 hover:bg-green-900  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              onClick={() => { setIsCounting(true) }}>
              Start
            </button>
          )
        }
        {/* <button onClick={() => {timer.current?.reset()}}>Reset</button> */}
        <button onClick={() => { next(false) }}>Skip</button>
      </div>
    </main>

  );
}

