import { IBlock } from "./app/page"

export const blocks: IBlock[] = [
  {
    start: '07:30',
    name: 'Morning',
    blocks: [
      {
        cycles: 3,
        pomodoro: { color: '#166534', text: 'Work time', duration: 45 },
        shortBreak: { color: '#614236', text: 'Short Break', duration: 10 },
        longBreak: { color: '#B91724', text: 'Long Break', duration: 25 },
      },
      {
        cycles: 2,
        pomodoro: { color: '#166534', text: 'Work time', duration: 45 },
        shortBreak: { color: '#614236', text: 'Short Break', duration: 10 },
        longBreak: { color: '#B91724', text: 'Long Break', duration: 15 },
      }],
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
    blocks: [
      {
        cycles: 4,
        pomodoro: { color: '#166534', text: 'Work time', duration: 20 },
        shortBreak: { color: '#614236', text: 'Short Break', duration: 5 },
        longBreak: { color: '#B91724', text: 'Long Break', duration: 10 },
      }
    ],
  }
];