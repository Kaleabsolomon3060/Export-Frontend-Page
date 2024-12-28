'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import UserManagement from '../../components/UserManagement'

export default function AdminDashboardPage() {
  const { user, logout } = useAuth()
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalRegularUsers: 0
  })

  useEffect(() => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
    setStats({
      totalUsers: registeredUsers.length,
      totalAdmins: registeredUsers.filter((user: any) => user.role === 'admin').length,
      totalRegularUsers: registeredUsers.filter((user: any) => user.role === 'user').length
    })
  }, [])

  return (
    <div className="min-h-screen bg-[#0c141c] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header with Logout */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-[#44bcd8]">Admin Dashboard</h1>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20"
          >
            Logout
          </button>
        </div>

        {/* Welcome Section */}
        <div className="bg-[#1a2633] shadow-[0_0_15px_rgba(68,188,216,0.15)] border border-[#44bcd8]/30 rounded-lg p-6">
          <p className="text-gray-400 mb-2">
            Welcome back, <span className="text-[#2ecc71] font-medium">{user?.name}</span>!
          </p>
          <p className="text-gray-400">
            Manage your system settings and user permissions.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-[#1a2633] border border-[#44bcd8]/30 rounded-lg p-6">
            <h3 className="text-[#44bcd8] font-medium mb-2">Total Users</h3>
            <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
          </div>
          <div className="bg-[#1a2633] border border-[#44bcd8]/30 rounded-lg p-6">
            <h3 className="text-[#44bcd8] font-medium mb-2">Admin Users</h3>
            <p className="text-2xl font-bold text-white">{stats.totalAdmins}</p>
          </div>
          <div className="bg-[#1a2633] border border-[#44bcd8]/30 rounded-lg p-6">
            <h3 className="text-[#44bcd8] font-medium mb-2">Regular Users</h3>
            <p className="text-2xl font-bold text-white">{stats.totalRegularUsers}</p>
          </div>
          <div className="bg-[#1a2633] border border-[#44bcd8]/30 rounded-lg p-6">
            <h3 className="text-[#44bcd8] font-medium mb-2">System Status</h3>
            <p className="text-2xl font-bold text-[#2ecc71]">Online</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#1a2633] border border-[#44bcd8]/30 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-[#44bcd8] mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-[#44bcd8]/10 hover:bg-[#44bcd8]/20 rounded-lg transition-colors">
              <span className="block text-[#44bcd8]">Manage Users</span>
            </button>
            <button className="p-4 bg-[#44bcd8]/10 hover:bg-[#44bcd8]/20 rounded-lg transition-colors">
              <span className="block text-[#44bcd8]">System Settings</span>
            </button>
            <button className="p-4 bg-[#44bcd8]/10 hover:bg-[#44bcd8]/20 rounded-lg transition-colors">
              <span className="block text-[#44bcd8]">View Logs</span>
            </button>
            <button className="p-4 bg-[#44bcd8]/10 hover:bg-[#44bcd8]/20 rounded-lg transition-colors">
              <span className="block text-[#44bcd8]">Reports</span>
            </button>
          </div>
        </div>

        {/* User Management Section */}
        <UserManagement />
      </div>
    </div>
  )
} 