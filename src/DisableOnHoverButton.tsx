import { useState, type ButtonHTMLAttributes, type MouseEventHandler } from 'react'

type DisableOnHoverButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function DisableOnHoverButton({
  onMouseEnter,
  onMouseLeave,
  disabled: disabledProp,
  ...rest
}: DisableOnHoverButtonProps) {
  const [isDisabled, setIsDisabled] = useState(false)

  const handleMouseEnter: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!isDisabled) {
      setIsDisabled(true)
    }

    if (onMouseEnter) {
      onMouseEnter(event)
    }
  }

  const handleMouseLeave: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (isDisabled) {
      setIsDisabled(false)
    }

    if (onMouseLeave) {
      onMouseLeave(event)
    }
  }

  return (
    <button
      {...rest}
      disabled={isDisabled || disabledProp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  )
}

