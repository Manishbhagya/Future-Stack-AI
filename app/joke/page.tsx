'use client'

import { useState } from 'react'
import './joke.css'

export default function JokeGenerator() {
  const [joke, setJoke] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchJoke = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('https://v2.jokeapi.dev/joke/Any')
      const data = await response.json()

      if (data.type === 'single') {
        setJoke(data.joke)
      } else if (data.type === 'twopart') {
        setJoke(`${data.setup} - ${data.delivery}`)
      }
    } catch (err) {
      setError('Failed to fetch joke. Try again!')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="joke-container">
      <div className="joke-card">
        <h1>😂 Random Joke Generator</h1>
        <p className="subtitle">Click the button to get a random joke!</p>

        <button
          onClick={fetchJoke}
          disabled={loading}
          className="joke-button"
        >
          {loading ? 'Loading...' : 'Get Random Joke'}
        </button>

        {error && <div className="error-message">{error}</div>}

        {joke && (
          <div className="joke-display">
            <p className="joke-text">{joke}</p>
          </div>
        )}

        <p className="powered-by">
          Powered by <a href="https://jokeapi.dev" target="_blank" rel="noopener noreferrer">JokeAPI</a>
        </p>
      </div>
    </div>
  )
}