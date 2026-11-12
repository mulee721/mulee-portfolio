import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    experience: 0,
    education: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('authToken')
        const headers = { Authorization: `Bearer ${token}` }

        const [projects, skills, experience, education] = await Promise.all([
          axios.get('/api/projects', { headers }),
          axios.get('/api/skills', { headers }),
          axios.get('/api/experience', { headers }),
          axios.get('/api/education', { headers }),
        ])

        setStats({
          projects: projects.data.length,
          skills: skills.data.length,
          experience: experience.data.length,
          education: education.data.length,
        })
      } catch (err) {
        console.error('Failed to fetch stats:', err)
      }
    }

    fetchStats()
  }, [])

  const StatCard = ({ title, value }: { title: string; value: number }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-gray-600 font-semibold mb-2">{title}</h3>
      <p className="text-4xl font-bold text-blue-600">{value}</p>
    </div>
  )

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Projects" value={stats.projects} />
        <StatCard title="Skills" value={stats.skills} />
        <StatCard title="Experience" value={stats.experience} />
        <StatCard title="Education" value={stats.education} />
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
        <h2 className="text-xl font-semibold text-blue-900 mb-2">Welcome to Portfolio Admin</h2>
        <p className="text-blue-800">
          Use the sidebar to manage your portfolio content. You can edit, create, and publish projects, skills, experience, and more.
        </p>
      </div>
    </div>
  )
}
