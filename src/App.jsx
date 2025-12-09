import { useState } from 'react'
import CookieClicker from './components/CookieClicker/CookieClicker'
import CatFacts from './components/CatFacts/CatFacts'
import UserList from './components/UserList/UserList'
import './App.css'

function App() {
  const [clickCount, setClickCount] = useState(0)

  return (
    <div className="app">
      <div className="app-container">
        <CookieClicker onCountChange={setClickCount} />
        <CatFacts clickCount={clickCount} />
        <UserList />
      </div>
    </div>
  )
}

export default App