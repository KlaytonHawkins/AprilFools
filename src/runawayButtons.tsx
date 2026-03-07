import { useEffect, useRef } from 'react'
import type { ButtonHTMLAttributes, MouseEventHandler } from 'react'

type ButtonState = {
  x: number
  y: number
  disabledUntil?: number
}

const DISTANCE_THRESHOLD = 140
const MAX_STEP_PER_MOVE = 40
const VIEWPORT_MARGIN = 16
const CLICK_GRACE_MS = 200

type RunawayButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export function RunawayButton({ onClick, children, ...rest }: RunawayButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const stateRef = useRef<ButtonState>({ x: 0, y: 0 })

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const state = stateRef.current

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event
      const now = performance.now()

      if (state.disabledUntil && now < state.disabledUntil) {
        return
      }

      const rect = button.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const dx = centerX - clientX
      const dy = centerY - clientY
      const distance = Math.hypot(dx, dy) || 1

      if (distance > DISTANCE_THRESHOLD) {
        return
      }

      const strength = (DISTANCE_THRESHOLD - distance) / DISTANCE_THRESHOLD
      const step = Math.min(MAX_STEP_PER_MOVE, MAX_STEP_PER_MOVE * strength)

      const offsetX = (dx / distance) * step
      const offsetY = (dy / distance) * step

      let nextX = state.x + offsetX
      let nextY = state.y + offsetY

      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      const projectedLeft = rect.left + nextX
      const projectedTop = rect.top + nextY
      const maxLeft = viewportWidth - rect.width - VIEWPORT_MARGIN
      const maxTop = viewportHeight - rect.height - VIEWPORT_MARGIN

      if (projectedLeft < VIEWPORT_MARGIN) {
        nextX += VIEWPORT_MARGIN - projectedLeft
      } else if (projectedLeft > maxLeft) {
        nextX -= projectedLeft - maxLeft
      }

      if (projectedTop < VIEWPORT_MARGIN) {
        nextY += VIEWPORT_MARGIN - projectedTop
      } else if (projectedTop > maxTop) {
        nextY -= projectedTop - maxTop
      }

      state.x = nextX
      state.y = nextY

      button.style.transform = `translate(${state.x}px, ${state.y}px)`
    }

    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      if (!target) return

      const clickedButton = target.closest('button') as HTMLButtonElement | null
      if (!clickedButton || clickedButton !== button) return

      state.disabledUntil = performance.now() + CLICK_GRACE_MS
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown, { capture: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown, { capture: true })
      button.style.transform = ''
    }
  }, [])

  return (
    <button ref={buttonRef} onClick={onClick} {...rest}>
      {children}
    </button>
  )
}

