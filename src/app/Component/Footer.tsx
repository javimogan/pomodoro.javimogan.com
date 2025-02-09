import React from 'react'

export default function Footer() {
    return (
        <footer className="flex flex-wrap items-center justify-center">
            Pomodoro by
            <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4 italic"
                href="https://javimogan.com"
                target="_blank"
                rel="noopener noreferrer"
            >
                @javimogan
            </a>
        </footer>
    )
}
