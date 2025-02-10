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
export interface IFlow extends ITime {
  type: "cycle" | "shortBreak" | "longBreak"
  start?: string;
  end?: string;
}
export interface IBlock {
  start?: string;
  name: string;
  infinite?: boolean;
  blocks: {
    autostart?: boolean;
    cycles: number;
    pomodoro: ITime;
    shortBreak: ITime;
    longBreak: ITime;
  }[];
}




function flow2Timers(flow: IBlock, startBlock:string=moment().format('HH:mm')) {
  const blocks: IFlow[] = [];
  
  let _start = startBlock;
  let _end = _start;
  flow.blocks.forEach((block) => {
    for (let i = 0; i < block.cycles; i++) {
      _end = moment(_end, 'HH:mm').add(block.pomodoro.duration, 'minutes').format('HH:mm');
      blocks.push({ ...block.pomodoro, duration: block.pomodoro.duration * 60, type: 'cycle', start: _start, end: _end });
      //_start = _end;
      if (i < block.cycles - 1) {
        _end = moment(_end, 'HH:mm').add(block.shortBreak.duration, 'minutes').format('HH:mm');
        blocks.push({ ...block.shortBreak, duration: block.shortBreak.duration * 60, type: 'shortBreak', start: _start, end: _end });
        //_start = _end;
      }
    }
    _end = moment(_end, 'HH:mm').add(block.longBreak.duration, 'minutes').format('HH:mm');
    blocks.push({ ...block.longBreak, duration: block.longBreak.duration * 60, type: 'longBreak', start: _start, end: _end });
    //_start = _end;
  });
  if (flow.infinite !== true) {
    if (blocks[blocks.length - 1].type !== 'cycle') {
      blocks.pop();
    }
  }
  return blocks;
}
function getFlowEndTime(startTime: string, flow: IFlow[]) {
  const _start = moment(startTime, 'HH:mm');
  const _end = _start.clone();
  flow.forEach((t) => _end.add(t.duration, 'seconds'));
  return _end.format('HH:mm');
}

export default function Home() {
  //Selected block
  const [block, setBlock] = React.useState<IBlock>(blocks[0]);
  //Timers for the block
  const [timers, setTimers] = React.useState<IFlow[]>([]);
  //Current timer
  const [currentTimer, setCurrentTimer] = React.useState<number>(0);
  //Number of loops for infinite block
  const [loops, setLoops] = React.useState<number>(0);
  //Is paused or counting
  const [isCounting, setIsCounting] = React.useState(false);
  //Real start and stop time for the block
  const [realTime, setRealTime] = React.useState<[string,string] | undefined>();
  //Timer and audio ref
  const timer = React.useRef<IPomodoroTimerRef | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);


  const reset = React.useCallback(() => {
    setTimers(flow2Timers(block, block.start));
    setCurrentTimer(0);
    setIsCounting(false);
    timer.current?.reset();
  }, [block, timer])
  //When change block, reset all
  React.useEffect(() => {
    reset();
  }, [block]);

  //Set theoretical data
  // const [theoricalStepsBlock] = React.useMemo(() => {
  //   if(!timers || timers.length <= 0){
  //     return [undefined,undefined,[]];
  //   }
  //   const _start = moment(block.start, 'HH:mm');
  //   const steps: { start: string, end: string, type: string }[] = [];
  //   timers.forEach((t) => {
  //     steps.push({
  //       start: _start.format('HH:mm'),
  //       end: _start.add(t.duration, 'seconds').format('HH:mm'),
  //       type: t.type
  //     });
  //   });
  //   // console.log(steps);
  //   // console.log(moment(block.start, 'HH:mm').format("HH:mm"), block.start && (getFlowEndTime(block.start,timers)))
  //   return [steps];
  // }, [timers]);

  const next = React.useCallback((sound: boolean = true, manual: boolean = false) => {
    if (timers.length <= 0) {
      return
    }
    //Sonar cancion
    if (sound && audioRef.current) {
      audioRef.current.play();
    }
    //Resetear si es infinito o si es manual y es el ultimo
    if (currentTimer === timers.length - 1 && (block.infinite || manual)) {
      setCurrentTimer(0);
      setLoops(loops + 1);
    } else {
      setCurrentTimer(currentTimer + 1);
    }
    setIsCounting(manual? false: true);
    timer.current?.reset();
  }, [currentTimer, timer, audioRef, timers, loops]);

  React.useEffect(() => {
    let auxTime:string;
    if (!isCounting) {
      setRealTime(undefined);
    } else {
      if (!realTime) {
        auxTime = moment().format('HH:mm');
        setRealTime([auxTime, getFlowEndTime(auxTime, timers)]);
      }
    }
  }, [isCounting, block])
  return (

    <main className="flex flex-col items-center my-8 gap-4">
      <section className="flex flex-row items-center gap-2">
        {blocks.map((b, i) => (
          <button key={`block-${b.name}-${i}`}
            onClick={() => setBlock(b)}
            type="button"
            className={`text-white flex flex-col items-center ${block.name === b.name ? 'bg-[#B91724] hover:bg-[#CA1724]' : 'bg-[#814652] hover:bg-[#B91724BB]'} font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}>
            {b.name}
            {block.blocks === b.blocks &&
              block.start && timers.length >0 && (
                <span>{block.start} ~ {getFlowEndTime(block.start, timers)}</span>
              )}
          </button>
        ))}
      </section>
      <audio ref={audioRef} src="/audio/sound_1.mp3" />
      <div className="flex flex-col items-center gap-2">
        {block.infinite && (
          <span className='text-1xl font-bold'>Loops: {loops}</span>
        )}

        {realTime && (
          <>
            <span>{realTime[0]} ~ {realTime[1]}</span>
          </>
        )}
      </div>
      <ProgressBalls currentIndex={currentTimer} balls={timers} />
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
              onClick={() => setIsCounting(true)}>
              Start
            </button>
          )
        }
        {/* <button onClick={() => {timer.current?.reset()}}>Reset</button> */}
        <button onClick={() => { next(false, true) }}>Skip</button>
      </div>
    </main>

  );
}

