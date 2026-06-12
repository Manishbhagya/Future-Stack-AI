'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'

export default function Chat() {
  const { messages, sendMessage, status, error } = useChat({
    api: '/api/chat',
  })
  const isLoading = status === 'submitted' || status === 'streaming'

  const [input, setInput] = useState('')
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e) => {
    e?.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput('')
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <span className="chat-header-icon">🤖</span>
        <div>
          <strong>AI Chatbot Assistant</strong>
          <span className="chat-status">Online</span>
        </div>
      </div>

      <div className="chat-messages">
        {messages.length === 0 && !isLoading && (
          <div className="chat-welcome">
            <span className="chat-welcome-icon">👋</span>
            <h3>Hello! How can I help you today?</h3>
            <p>Ask me about AI chatbots, machine learning, web development, or any of our services.</p>
            <div className="chat-suggestions">
              {[
                'What services do you offer?',
                'How can AI chatbots help my business?',
                'Tell me about your pricing',
                'How do I get started?',
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  className="chat-suggestion-btn"
                  onClick={() => {
                    sendMessage({ text: suggestion })
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => (
          <div key={m.id} className={`chat-message ${m.role}`}>
            <div className="chat-avatar">
              {m.role === 'user' ? 'U' : 'AI'}
            </div>
            <div className="chat-bubble">
              {m.content || m.parts?.map((p) => p.text || '').join('')}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="chat-message assistant">
            <div className="chat-avatar">AI</div>
            <div className="chat-bubble">
              <span className="chat-typing">Thinking</span>
            </div>
          </div>
        )}

        {error && (
          <div className="chat-error">
            {error.message || 'Something went wrong. Please try again.'}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="chat-input-wrap">
        <label htmlFor="chat-input" className="sr-only">Type your message</label>
        <input
          id="chat-input"
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
          className="chat-input"
        />
        <button type="submit" disabled={isLoading || !input.trim()} className="chat-send-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </form>
    </div>
  )
}
