import { IBlock } from "./app/page"

export const blocks: IBlock[] = [
  // {
  //   start: '07:30',
  //   name: 'Morning',
  //   blocks: [
  //     {
  //       cycles: 3,
  //       pomodoro: { color: '#166534', text: 'Work time', duration: 45 },
  //       shortBreak: { color: '#614236', text: 'Short Break', duration: 8 },
  //       longBreak: { color: '#B91724', text: 'Short Break', duration: 25 },
  //     },
  //     {
  //       cycles: 2,
  //       pomodoro: { color: '#166534', text: 'Work time', duration: 45 },
  //       shortBreak: { color: '#614236', text: 'Short Break', duration: 8 },
  //       longBreak: { color: '#B91724', text: 'Long Break', duration: 15 },
  //     }],
  // },
  {
    start: '07:30',
    name: 'Morning',
    blocks: [
      {
        cycles: 3,
        pomodoro: { color: '#166534', text: 'Work time', duration: 60 },
        shortBreak: { color: '#614236', text: 'Short Break', duration: 10 },
        longBreak: { color: '#B91724', text: 'Short Break', duration: 30 },
      },
      {
        cycles: 1,
        pomodoro: { color: '#CFA940', text: 'Work time', duration: 45 },
        shortBreak: { color: '#614236', text: 'Short Break', duration: 10 },
        longBreak: { color: '#B91724', text: 'Long Break', duration: 30 },
      }
    ],
  },
  {
    start: '15:00',
    name: 'Afternoon',
    blocks: [
      {
        cycles: 4,
        pomodoro: { color: '#166534', text: 'Work time', duration: 25 },
        shortBreak: { color: '#614236', text: 'Short Break', duration: 5 },
        longBreak: { color: '#B91724', text: 'Long Break', duration: 15 },
      },
      {
        cycles: 2,
        pomodoro: { color: '#166534', text: 'Work time', duration: 25 },
        shortBreak: { color: '#614236', text: 'Short Break', duration: 5 },
        longBreak: { color: '#B91724', text: 'Long Break', duration: 15 },
      }],
  },
  {
    name: 'Pomodoro',
    infinite: true,
    blocks: [
      {
        cycles: 4,
        pomodoro: { color: '#166534', text: 'Work time', duration: 25 },
        shortBreak: { color: '#614236', text: 'Short Break', duration: 5 },
        longBreak: { color: '#B91724', text: 'Long Break', duration: 15 },
      }
    ],
  }
];

//If dev wants to add more blocks, they can add them here
if (process.env.NODE_ENV === 'development') {
  blocks.push({
    name: 'Test 1',
    start: '09:00',
    blocks: [
      {
        cycles: 3,
        pomodoro: { color: '#166534', text: 'Work time', duration: 60 },
        shortBreak: { color: '#614236', text: 'Short Break', duration: 30 },
        longBreak: { color: '#B91724', text: 'Long Break', duration: 30 },
      },
      {
        cycles: 2,
        pomodoro: { color: '#166534', text: 'Work time', duration: 60 },
        shortBreak: { color: '#614236', text: 'Short Break', duration: 30 },
        longBreak: { color: '#B91724', text: 'Long Break', duration: 30 },
      }
    ],
  });
  blocks.push({
    name: 'Test',
    infinite: true,
    blocks: [
      {
        cycles: 2,
        pomodoro: { color: '#166534', text: 'Work time', duration: 1/60 },
        shortBreak: { color: '#614236', text: 'Short Break', duration: 1/60 },
        longBreak: { color: '#B91724', text: 'Long Break', duration: 1/60 },
      }
    ],
  });
}