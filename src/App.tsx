import { useState } from 'react'
import './App.css'
import { RunawayButton } from './runawayButtons'
import { DisableOnHoverButton } from './DisableOnHoverButton'
import { LoadingBar } from './LoadingBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="card">
        <RunawayButton onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </RunawayButton>
        <DisableOnHoverButton>Disable</DisableOnHoverButton>
        <LoadingBar />
      </div>
    </>
  )
}

export default App
