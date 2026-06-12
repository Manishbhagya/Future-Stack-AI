'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function EnquiryForm({ serviceSlug, serviceTitle }) {
  const { isSignedIn, user } = useUser()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  if (!isSignedIn) {
    return (
      <p>Please <a href="/sign-in">sign in</a> to enquire about this service.</p>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceSlug,
          name: formData.name || `${user.firstName} ${user.lastName}`,
          email: formData.email || user.emailAddresses[0].emailAddress,
          message: formData.message
        })
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to submit enquiry')
      }

      setSuccess(true)
      setTimeout(() => router.push('/dashboard'), 2000)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return <div className="enquiry-success">Enquiry submitted! Redirecting to dashboard...</div>
  }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder={user ? `${user.firstName} ${user.lastName}` : 'Your name'}
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder={user?.emailAddresses[0]?.emailAddress || 'Your email'}
        />
      </div>
      <div className="form-group">
        <label>Message</label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={5}
          placeholder={`Tell us about your ${serviceTitle} requirements...`}
          required
        />
      </div>
      {error && <div className="enquiry-error">{error}</div>}
      <button type="submit" className="btn-primary" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit Enquiry'}
      </button>
    </form>
  )
}
