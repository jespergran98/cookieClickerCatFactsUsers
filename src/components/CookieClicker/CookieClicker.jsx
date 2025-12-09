import { useState } from 'react'
import './CookieClicker.css'

const CookieClicker = ({ onCountChange }) => {
  const [count, setCount] = useState(0)

  const handleCookieClick = () => {
    const newCount = count + 1
    setCount(newCount)
    if (onCountChange) {
      onCountChange(newCount)
    }
  }

  return (
    <div className="cookie-card">
      <div className="counter">
        <span className="counter-number">{count.toLocaleString()}</span>
      </div>
      
      <button 
        className="cookie-button"
        onClick={handleCookieClick}
        aria-label="Click cookie"
      >
        <img 
          src="/assets/cookie.png" 
          alt="Cookie" 
          className="cookie-image"
        />
      </button>
      
      <p className="instruction">Click the cookie!</p>
    </div>
  )
}

export default CookieClicker