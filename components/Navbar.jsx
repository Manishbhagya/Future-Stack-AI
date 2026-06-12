'use client'

import Link from 'next/link'
import { useUser, SignOutButton } from '@clerk/nextjs'

export default function Navbar() {
  const { isSignedIn, user } = useUser()

  return (
    <header>
      <nav className="navbar">
        <div className="nav-container">
          <h1>Future Stack AI</h1>
          <ul className="nav-links">
            <li><a href="/#services">Services</a></li>
            <li><a href="/#contact">Contact</a></li>
            {isSignedIn ? (
              <>
                <li><Link href="/dashboard">Dashboard</Link></li>
                <li><SignOutButton><button className="nav-btn">Sign Out</button></SignOutButton></li>
              </>
            ) : (
              <>
                <li><Link href="/sign-in">Sign In</Link></li>
                <li><Link href="/sign-up">Sign Up</Link></li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  )
}
