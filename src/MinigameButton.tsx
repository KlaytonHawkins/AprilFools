import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type MouseEventHandler,
} from 'react'
import './MinigameButton.css'

const BAR_WIDTH_PERCENT = 3
const BAR_SPEED_PER_FRAME = 1.2
const GREEN_WIDTH_MIN = 20
const GREEN_WIDTH_MAX = 50

function randomGreenZone(): { greenStart: number; greenWidth: number } {
  const greenWidth = GREEN_WIDTH_MIN + Math.random() * (GREEN_WIDTH_MAX - GREEN_WIDTH_MIN)
  const greenStart = Math.random() * (100 - greenWidth)
  return { greenStart, greenWidth }
}

function isBarInGreenZone(
  barPosition: number,
  barWidthPercent: number,
  greenStart: number,
  greenWidth: number
): boolean {
  const barLeft = barPosition
  const barRight = barPosition + barWidthPercent
  const greenEnd = greenStart + greenWidth
  return barLeft < greenEnd && barRight > greenStart
}

type MinigameButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function MinigameButton({
  onClick,
  onMouseEnter,
  onMouseLeave,
  children,
  ...rest
}: MinigameButtonProps) {
  const [isActive, setIsActive] = useState(false)
  const [barPosition, setBarPosition] = useState(0)
  const [barDirection, setBarDirection] = useState(1)
  const [greenStart, setGreenStart] = useState(0)
  const [greenWidth, setGreenWidth] = useState(30)
  const frameRef = useRef<number | null>(null)
  const stateRef = useRef({ barPosition: 0, barDirection: 1 })

  stateRef.current = { barPosition, barDirection }

  const startMinigame = useCallback(() => {
    const { greenStart: start, greenWidth: width } = randomGreenZone()
    setGreenStart(start)
    setGreenWidth(width)
    setBarPosition(0)
    setBarDirection(1)
    stateRef.current = { barPosition: 0, barDirection: 1 }
  }, [])

  useEffect(() => {
    if (!isActive) {
      if (frameRef.current != null) {
        cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }
      return
    }

    const tick = () => {
      const { barPosition: pos, barDirection: dir } = stateRef.current
      let nextPos = pos + dir * BAR_SPEED_PER_FRAME
      let nextDir = dir

      if (nextPos >= 100) {
        nextPos = 100
        nextDir = -1
      } else if (nextPos <= 0) {
        nextPos = 0
        nextDir = 1
      }

      stateRef.current = { barPosition: nextPos, barDirection: nextDir }
      setBarPosition(nextPos)
      setBarDirection(nextDir)
      frameRef.current = requestAnimationFrame(tick)
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => {
      if (frameRef.current != null) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [isActive])

  const handleMouseEnter: MouseEventHandler<HTMLButtonElement> = (event) => {
    setIsActive(true)
    startMinigame()
    onMouseEnter?.(event)
  }

  const handleMouseLeave: MouseEventHandler<HTMLButtonElement> = (event) => {
    setIsActive(false)
    onMouseLeave?.(event)
  }

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!isActive) {
      onClick?.(event)
      return
    }
    event.preventDefault()
    if (
      isBarInGreenZone(barPosition, BAR_WIDTH_PERCENT, greenStart, greenWidth)
    ) {
      setIsActive(false)
      onClick?.(event)
    } else {
      startMinigame()
    }
  }

  return (
    <button
      type="button"
      className="minigame-button"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={isActive ? 'Hit the green zone to activate' : undefined}
      {...rest}
    >
      {isActive && (
        <>
          <div
            className="minigame-button__green"
            style={{
              left: `${greenStart}%`,
              width: `${greenWidth}%`,
            }}
            aria-hidden
          />
          <div
            className="minigame-button__bar"
            style={{
              left: `${barPosition}%`,
              width: `${BAR_WIDTH_PERCENT}%`,
            }}
            aria-hidden
          />
        </>
      )}
      <span className="minigame-button__label">{children}</span>
    </button>
  )
}
