'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BUSINESS_HOURS = {
  monday:    { open: 8, close: 18 },
  tuesday:   { open: 8, close: 18 },
  wednesday: { open: 8, close: 18 },
  thursday:  { open: 8, close: 18 },
  friday:    { open: 8, close: 18 },
  saturday:  { open: 10, close: 16 },
  sunday:    { open: 0, close: 0 },
}

function getBusinessStatus() {
  const now = new Date()
  const day = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
  const hours = BUSINESS_HOURS[day]
  if (!hours || (hours.open === 0 && hours.close === 0)) return { open: false, label: 'Closed today' }
  const current = now.getHours() * 60 + now.getMinutes()
  const open = hours.open * 60
  const close = hours.close * 60
  return {
    open: current >= open && current < close,
    label: current < open ? 'Opens today at ' + hours.open + ':00' : 'Closed',
  }
}

function formatTime(date) {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
}

export default function WhatsAppChatWidget({ show, onClose, phoneNumber = '1234567890' }) {
  const timestampRef = useRef(null)
  const preFilledMessage = 'Hello! I would like to know more.'
  const status = getBusinessStatus()

  useEffect(() => {
    if (show) timestampRef.current = new Date()
  }, [show])

  const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(preFilledMessage)}`

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="wa-popup"
          initial={{ opacity: 0, y: 24, scale: 0.92, originX: 0.5, originY: 1 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.92 }}
          transition={{ type: 'spring', damping: 22, stiffness: 280 }}
        >
          <div className="wa-header">
            <div className="wa-header-left">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
              </svg>
              <span>WhatsApp</span>
            </div>
            <button className="wa-close" onClick={onClose} aria-label="Close">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="white">
                <path d="M15.678 2.018C16.119 1.545 16.106 0.808 15.649 0.351 15.192 -0.106 14.455 -0.119 13.982 0.322L8.03 6.274 2.078 0.322C1.605 -0.119 0.868 -0.106 0.411 0.351 -0.046 0.808 -0.059 1.545 0.382 2.018L6.334 7.97 0.382 13.922C0.061 14.221 -0.071 14.672 0.037 15.097 0.146 15.522 0.478 15.854 0.903 15.963 1.328 16.071 1.779 15.939 2.078 15.618L8.03 9.666 13.982 15.618C14.281 15.939 14.732 16.071 15.157 15.963 15.582 15.854 15.914 15.522 16.023 15.097 16.131 14.672 15.999 14.221 15.678 13.922L9.726 7.97Z" />
              </svg>
            </button>
          </div>

          <div className="wa-body">
            <div className="wa-bubble">
              <p className="wa-bubble-text">Hello 👋, You can place your order right here in the chat</p>
              <span className="wa-time">{timestampRef.current ? formatTime(timestampRef.current) : ''}</span>
            </div>
          </div>

          <div className="wa-footer">
            <div className="wa-status">{status.label}</div>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="wa-button"
            >
              {status.open ? 'Send message' : 'Send Offline Message'}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
