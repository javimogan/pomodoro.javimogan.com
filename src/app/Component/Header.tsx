import React from 'react'
import moment from 'moment';
export default function Header() {
    return (
        <header className='flex flex-col text-center p-4'
        >
            <div className='flex items-center justify-center gap-2'>
                <img src='/images/pomodoro.svg' width={40} alt='Tomato' className='inline-block' />
            <h1 className='text-4xl'>
                POMODORO
            </h1>
            </div>
            <span className='text-s'>
                Now is {moment().format('HH:mm')}
            </span>
        </header>
    )
}
