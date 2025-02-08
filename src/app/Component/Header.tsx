import React from 'react'
import moment from 'moment';
export default function Header() {
    return (
        <header className='flex flex-col text-center p-4'
        >
            <h1 className='text-2xl'>
                POMODORO
            </h1>
            <span className='text-xs'>
                Now is {moment().format('HH:mm')}
            </span>
        </header>
    )
}
