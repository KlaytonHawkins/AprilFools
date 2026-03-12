import { useEffect, useState } from 'react'
import './LightsOffButton.css'

const FLASHLIGHT_RADIUS_PX = 150

export function LightsOffButton() {
  const [isLightsOff, setIsLightsOff] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!isLightsOff) return

    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY })
    }

    setMouse({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    })
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isLightsOff])

  const toggle = () => setIsLightsOff((prev) => !prev)

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        aria-pressed={isLightsOff}
        aria-label={isLightsOff ? 'Dark Mode' : 'Light Mode'}
      >
        {isLightsOff ? 'Dark Mode' : 'Light Mode'}
      </button>
      {isLightsOff && (
        <div
          className="lights-off-button__overlay"
          aria-hidden
          style={{
            background: `radial-gradient(circle at ${mouse.x}px ${mouse.y}px, transparent ${FLASHLIGHT_RADIUS_PX}px, black ${FLASHLIGHT_RADIUS_PX}px)`,
          }}
        />
      )}
    </>
  )
}
