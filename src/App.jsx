import { useState } from 'react'
import CookieClicker from './components/CookieClicker/CookieClicker'
import CatFacts from './components/CatFacts/CatFacts'
import './App.css'

function App() {
  const [clickCount, setClickCount] = useState(0)

  return (
    <div className="app">
      <div className="app-container">
        <CookieClicker onCountChange={setClickCount} />
        <CatFacts clickCount={clickCount} />
      </div>
    </div>
  )
}

export default App