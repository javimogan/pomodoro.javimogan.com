import React from 'react'
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="flex gap-6 flex-wrap items-center justify-center">
            <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href="https://javimogan.com"
                target="_blank"
                rel="noopener noreferrer"
            >
                javimogan
            </a>
        </footer>
    )
}
