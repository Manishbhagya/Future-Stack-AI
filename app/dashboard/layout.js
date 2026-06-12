import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default function DashboardLayout({ children }) {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <nav>
          <a href="/dashboard">Overview</a>
          <a href="/dashboard/profile">Profile</a>
        </nav>
      </aside>
      <main className="dashboard-content">{children}</main>
    </div>
  )
}
