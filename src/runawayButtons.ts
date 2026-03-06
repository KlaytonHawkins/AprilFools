import { useEffect } from 'react'

type ButtonState = {
  x: number
  y: number
  disabledUntil?: number
}

const DISTANCE_THRESHOLD = 140
const MAX_STEP_PER_MOVE = 40
const VIEWPORT_MARGIN = 16
const CLICK_GRACE_MS = 200

export function useRunawayButtons() {
  useEffect(() => {
    const buttonState = new Map<HTMLButtonElement, ButtonState>()

    const getOrCreateState = (button: HTMLButtonElement): ButtonState => {
      let state = buttonState.get(button)
      if (!state) {
        state = { x: 0, y: 0 }
        buttonState.set(button, state)
      }
      return state
    }

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event
      const now = performance.now()

      const buttons = document.querySelectorAll<HTMLButtonElement>('button')
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      buttons.forEach((button) => {
        const state = getOrCreateState(button)

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
      })
    }

    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      if (!target) return

      const button = target.closest('button') as HTMLButtonElement | null
      if (!button) return

      const state = getOrCreateState(button)
      state.disabledUntil = performance.now() + CLICK_GRACE_MS
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown, { capture: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown, { capture: true })

      buttonState.forEach((_, button) => {
        button.style.transform = ''
      })
      buttonState.clear()
    }
  }, [])
}

