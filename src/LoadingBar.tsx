import { useEffect, useRef, useState } from 'react'

const SECONDS_PER_MINUTE = 60
const SECONDS_PER_HOUR = 3600
const SECONDS_PER_DAY = 86400
const SECONDS_PER_WEEK = 604800
const TWO_WEEKS_SECONDS = 14 * 24 * 3600

const PROGRESS_INTERVAL_MS = 120
const PROGRESS_FACTOR = 0.04
const TIME_REMAINING_INTERVAL_MS = 10000

function formatTimeRemaining(seconds: number): string {
  if (seconds < SECONDS_PER_MINUTE) {
    return seconds === 1 ? '1 second' : `${seconds} seconds`
  }

  const parts: string[] = []
  let remainder = seconds

  const weeks = Math.floor(remainder / SECONDS_PER_WEEK)
  if (weeks > 0) {
    parts.push(weeks === 1 ? '1 week' : `${weeks} weeks`)
    remainder %= SECONDS_PER_WEEK
  }

  const days = Math.floor(remainder / SECONDS_PER_DAY)
  if (days > 0) {
    parts.push(days === 1 ? '1 day' : `${days} days`)
    remainder %= SECONDS_PER_DAY
  }

  const hours = Math.floor(remainder / SECONDS_PER_HOUR)
  if (hours > 0) {
    parts.push(hours === 1 ? '1 hour' : `${hours} hours`)
    remainder %= SECONDS_PER_HOUR
  }

  const minutes = Math.floor(remainder / SECONDS_PER_MINUTE)
  if (minutes > 0) {
    parts.push(minutes === 1 ? '1 minute' : `${minutes} minutes`)
  }

  return parts.join(' ')
}

function getRandomTimeRemainingSeconds(): number {
  return Math.floor(Math.random() * TWO_WEEKS_SECONDS) + 1
}

export function LoadingBar() {
  const [progress, setProgress] = useState(0)
  const [timeRemainingText, setTimeRemainingText] = useState('30 seconds')
  const progressRef = useRef(0)

  progressRef.current = progress

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => Math.min(99, p + (99 - p) * PROGRESS_FACTOR))
    }, PROGRESS_INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      if (Math.round(progressRef.current) >= 99) {
        setTimeRemainingText(formatTimeRemaining(getRandomTimeRemainingSeconds()))
      }
    }, TIME_REMAINING_INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="loading-bar">
      <div className="loading-bar__row">
        <div className="loading-bar__track">
          <div
            className="loading-bar__fill"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <span className="loading-bar__percent" aria-hidden="true">
          {Math.round(progress)}%
        </span>
      </div>
      <p className="loading-bar__label">
        Estimated time remaining: <span className="loading-bar__time">{Math.round(progress) >= 99 ? timeRemainingText : '30 seconds'}</span>
      </p>
    </div>
  )
}
