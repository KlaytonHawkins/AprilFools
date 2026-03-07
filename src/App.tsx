import { useState } from 'react'
import './App.css'
import { RunawayButton } from './runawayButtons'
import { DisableOnHoverButton } from './DisableOnHoverButton'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="card">
        <RunawayButton onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </RunawayButton>
        <DisableOnHoverButton>Disable</DisableOnHoverButton>
      </div>
    </>
  )
}

export default App
