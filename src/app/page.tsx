"use client"
import React from "react";
import PomodoroTimer from "./Component/PomodoroTimer";

export default function Home() {
  //Timer de 10 minutos
  const [initialTime, setInitialTime] = React.useState(5);

  return (

    <main className="flex flex-col items-center">
      <h1>OLA</h1>
      <PomodoroTimer initialSecons={initialTime} color={'re'} />
    </main>

  );
}
