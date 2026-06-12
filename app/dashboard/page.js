import { auth } from '@clerk/nextjs/server'
import { createClient } from '@/lib/supabase/server'
import { UserButton } from '@clerk/nextjs'

export default async function DashboardPage() {
  const { userId } = auth()
  const supabase = await createClient()

  const { data: enquiries } = await supabase
    .from('enquiries')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <UserButton afterSignOutUrl="/" />
      </div>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Enquiries</h3>
          <p className="stat-number">{enquiries?.length || 0}</p>
        </div>
      </div>
      <section>
        <h3>Your Enquiries</h3>
        {enquiries?.length === 0 ? (
          <p>No enquiries yet. Browse our services to get started!</p>
        ) : (
          <div className="enquiries-list">
            {enquiries?.map((enquiry) => (
              <div key={enquiry.id} className="enquiry-card">
                <h4>{enquiry.service_slug}</h4>
                <p>{enquiry.message}</p>
                <span className={`status status-${enquiry.status}`}>{enquiry.status}</span>
                <small>{new Date(enquiry.created_at).toLocaleDateString()}</small>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
