import { useState } from 'react'
import './App.css'
import { RunawayButton } from './runawayButtons'
import { DisableOnHoverButton } from './DisableOnHoverButton'
import { MinigameButton } from './MinigameButton'
import { LoadingBar } from './LoadingBar'
import { LightsOffButton } from './LightsOffButton'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="card">
        <RunawayButton onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </RunawayButton>
        <DisableOnHoverButton>Disable</DisableOnHoverButton>
        <MinigameButton onClick={() => setCount((c) => c + 1)}>
          Minigame
        </MinigameButton>
        <LoadingBar />
        <LightsOffButton />
      </div>
    </>
  )
}

export default App
