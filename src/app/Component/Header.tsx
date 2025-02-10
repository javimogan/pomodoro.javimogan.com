"use client";
import React from 'react'
import moment from 'moment';
export default function Header() {
    const [time, setTime] = React.useState(moment().format("HH:mm")); // Estado para forzar el re-render

    setInterval(() => {
        setTime(moment().format("HH:mm"));
    }, 1000);
    return (
        <header className='flex flex-col text-center p-4'
        >
            <div className='flex items-center justify-center gap-2'>
                <img src='/images/pomodoro.svg' width={40} alt='Tomato' className='inline-block' />
                <h1 className='text-4xl'>
                    POMODORO
                </h1>
                {process.env.NODE_ENV === 'development' && (
                    <span className='text-xs bg-red-500 text-white rounded-md p-1'>
                        {process.env.NODE_ENV}
                    </span>
                )}
            </div>
            <span className='text-s'>
                Now is {time}
            </span>
        </header>
    )
}
