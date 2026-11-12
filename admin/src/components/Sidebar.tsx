import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, FileText, Award, Briefcase, Settings, LogOut } from 'lucide-react'

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    navigate('/login')
  }

  const isActive = (path: string) => location.pathname.includes(path)

  const NavLink = ({ to, icon: Icon, label }: { to: string; icon: React.ReactNode; label: string }) => (
    <Link
      to={to}
      className={`flex items-center gap-3 px-6 py-3 transition ${
        isActive(to)
          ? 'bg-blue-600 text-white border-r-4 border-blue-800'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {Icon}
      <span>{label}</span>
    </Link>
  )

  return (
    <div className="w-64 bg-white shadow-lg flex flex-col h-full">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-800">Portfolio Admin</h2>
        <p className="text-xs text-gray-500">Management Dashboard</p>
      </div>

      <nav className="flex-1">
        <NavLink to="/admin" icon={<LayoutDashboard size={20} />} label="Dashboard" />
        <NavLink to="/admin/profile" icon={<FileText size={20} />} label="Profile" />
        <NavLink to="/admin/projects" icon={<Briefcase size={20} />} label="Projects" />
        <NavLink to="/admin/skills" icon={<Award size={20} />} label="Skills" />
        <NavLink to="/admin/experience" icon={<Briefcase size={20} />} label="Experience" />
        <NavLink to="/admin/education" icon={<FileText size={20} />} label="Education" />
      </nav>

      <div className="border-t p-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-gray-700 hover:text-red-600 w-full px-4 py-2 transition"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}
