import { useState, useEffect } from 'react'
import './CatFacts.css'

const CatFacts = ({ clickCount }) => {
  const [facts, setFacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [animatingOut, setAnimatingOut] = useState(false)
  const [lastProcessedClick, setLastProcessedClick] = useState(0)

  // Initial fetch - runs once on mount
  useEffect(() => {
    let isMounted = true

    const fetchInitialFacts = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://catfact.ninja/facts?limit=5')
        const data = await response.json()
        if (isMounted) {
          setFacts(data.data)
          setLoading(false)
        }
      } catch {
        if (isMounted) {
          setError('Failed to load cat facts')
          setLoading(false)
        }
      }
    }

    fetchInitialFacts()

    return () => {
      isMounted = false
    }
  }, [])

  // Handle every 10th click
  useEffect(() => {
    const clicksInTens = Math.floor(clickCount / 10)
    const lastClicksInTens = Math.floor(lastProcessedClick / 10)
    
    if (clickCount > 0 && clicksInTens > lastClicksInTens) {
      let isMounted = true

      const rotateFacts = async () => {
        try {
          // Animate out the last fact
          if (isMounted) {
            setAnimatingOut(true)
          }
          
          // Wait for animation
          await new Promise(resolve => setTimeout(resolve, 500))
          
          // Fetch new fact
          const response = await fetch('https://catfact.ninja/fact')
          const data = await response.json()
          
          // Remove last fact and add new one at the top
          if (isMounted) {
            setFacts(prevFacts => [data, ...prevFacts.slice(0, 4)])
            setAnimatingOut(false)
            setLastProcessedClick(clickCount)
          }
        } catch (err) {
          console.error('Failed to fetch new fact:', err)
          if (isMounted) {
            setAnimatingOut(false)
          }
        }
      }

      rotateFacts()

      return () => {
        isMounted = false
      }
    }
  }, [clickCount, lastProcessedClick])

  if (loading) {
    return (
      <div className="cat-facts-card">
        <h2 className="cat-facts-title">Cat Facts</h2>
        <div className="loading-spinner">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="cat-facts-card">
        <h2 className="cat-facts-title">Cat Facts</h2>
        <p className="error-message">{error}</p>
      </div>
    )
  }

  return (
    <div className="cat-facts-card">
      <h2 className="cat-facts-title">Cat Facts</h2>
      <p className="cat-facts-subtitle">New fact every 10 cookie clicks!</p>
      
      <div className="facts-container">
        {facts.map((fact, index) => (
          <div 
            key={`${fact.fact}-${index}`}
            className={`fact-item ${index === 0 ? 'fact-new' : ''} ${
              index === 4 && animatingOut ? 'fact-out' : ''
            }`}
          >
            <div className="fact-number">{index + 1}</div>
            <p className="fact-text">{fact.fact}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CatFacts