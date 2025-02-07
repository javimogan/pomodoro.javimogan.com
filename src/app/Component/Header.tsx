import React from 'react'
import moment from 'moment';
export default function Header() {
    return (
        <header className='flex flex-col text-center p-4'
        >
            <h1>
                POMODORO
            </h1>
            <span>
                {moment().format('HH:mm')}
            </span>
        </header>
    )
}
