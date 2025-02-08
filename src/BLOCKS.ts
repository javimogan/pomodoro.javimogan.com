import { IBlock } from "./app/page"

export const blockMorning: IBlock = {
  start: '07:30',
  name: 'Morning',
  blocks: [
    {
      cycles: 3,
      pomodoro: { color: '#5201af', text: 'Work time', duration: 45 },
      shortBreak: { color: '#520100', text: 'Short Break', duration: 10 },
      longBreak: { color: '#faf255', text: 'Long Break', duration: 25 },
    },
    {
      cycles: 2,
      pomodoro: { color: '#5201af', text: 'Work time', duration: 45 },
      shortBreak: { color: '#520100', text: 'Short Break', duration: 10 },
      longBreak: { color: '#faf255', text: 'Long Break', duration: 15 },
    }],
}

export const blockAfternoon: IBlock = {
  start: '15:00',
  name: 'Afternoon',
  blocks: [
    {
      cycles: 4,
      pomodoro: { color: '#5201af', text: 'Work time', duration: 25 },
      shortBreak: { color: '#520100', text: 'Short Break', duration: 5 },
      longBreak: { color: '#faf255', text: 'Long Break', duration: 15 },
    },
    {
      cycles: 2,
      pomodoro: { color: '#5201af', text: 'Work time', duration: 25 },
      shortBreak: { color: '#520100', text: 'Short Break', duration: 5 },
      longBreak: { color: '#faf255', text: 'Long Break', duration: 15 },
    }],
}