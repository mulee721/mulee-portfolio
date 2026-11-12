import { useState, useEffect } from 'react'
import axios from 'axios'
import { Trash2, Edit2, Plus } from 'lucide-react'

interface Project {
  _id?: string
  title: string
  description: string
  technologies: string[]
  status: 'draft' | 'published'
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Project>({
    title: '',
    description: '',
    technologies: [],
    status: 'draft',
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('authToken')
      const response = await axios.get('/api/projects/drafts/all', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setProjects(response.data)
    } catch (err) {
      console.error('Failed to fetch projects:', err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem('authToken')

    try {
      if (editingId) {
        await axios.put(`/api/projects/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
      } else {
        await axios.post('/api/projects', formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
      }

      fetchProjects()
      setShowForm(false)
      setEditingId(null)
      setFormData({ title: '', description: '', technologies: [], status: 'draft' })
    } catch (err) {
      console.error('Failed to save project:', err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure?')) return

    try {
      const token = localStorage.getItem('authToken')
      await axios.delete(`/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      fetchProjects()
    } catch (err) {
      console.error('Failed to delete project:', err)
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
        <button
          onClick={() => {
            setShowForm(!showForm)
            setEditingId(null)
            setFormData({ title: '', description: '', technologies: [], status: 'draft' })
          }}
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} /> Add Project
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8 mb-8 max-w-2xl">
          <h2 className="text-xl font-bold mb-6">{editingId ? 'Edit' : 'New'} Project</h2>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Title</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Status</th>
              <th className="px-6 py-3 text-right text-gray-700 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3 text-gray-800">{project.title}</td>
                <td className="px-6 py-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${project.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-3 text-right flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setEditingId(project._id || null)
                      setFormData(project)
                      setShowForm(true)
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => project._id && handleDelete(project._id)} className="text-red-600 hover:text-red-800">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
