'use client'

export default function Loading() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#0F1117',
      gap: 24,
    }}>
      <div style={{
        width: 40,
        height: 40,
        border: '3px solid rgba(212, 168, 83, 0.15)',
        borderTopColor: '#D4A853',
        borderRadius: '50%',
        animation: 'fs-spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes fs-spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
