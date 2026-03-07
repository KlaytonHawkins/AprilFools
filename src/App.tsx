import { useState } from 'react'
import './App.css'
import { RunawayButton } from './runawayButtons'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="card">
        <RunawayButton onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </RunawayButton>
      </div>
    </>
  )
}

export default App
