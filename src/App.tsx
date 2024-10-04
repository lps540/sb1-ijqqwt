import React, { useState, useEffect } from 'react'
import { Timer, Pause, Play, RotateCcw } from 'lucide-react'

function App() {
  const [time, setTime] = useState(25 * 60)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval: number | undefined

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (time === 0) {
      setIsActive(false)
    }

    return () => clearInterval(interval)
  }, [isActive, time])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setTime(25 * 60)
    setIsActive(false)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-red-600">Pomodoro Timer</h1>
        <div className="text-6xl font-bold mb-8 text-red-500">{formatTime(time)}</div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={toggleTimer}
            className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors"
          >
            {isActive ? <Pause className="inline" /> : <Play className="inline" />}
          </button>
          <button
            onClick={resetTimer}
            className="bg-red-200 text-red-800 px-6 py-2 rounded-full hover:bg-red-300 transition-colors"
          >
            <RotateCcw className="inline" />
          </button>
        </div>
        <div className="mt-8 text-red-700">
          <Timer className="inline mr-2" />
          Focus on your task!
        </div>
      </div>
    </div>
  )
}

export default App