'use client'
import { useState, useEffect } from 'react'

interface User {
  id: string
  name: string
  email: string
  password: string
  role: 'admin' | 'user'
  createdAt: string
}

interface UserStats {
  totalUsers: number
  totalAdmins: number
  totalRegularUsers: number
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [showAddUser, setShowAddUser] = useState(false)
  const [newUser, setNewUser] = useState<{
    name: string
    email: string
    password: string
    role: 'admin' | 'user'
  }>({
    name: '',
    email: '',
    password: '',
    role: 'user'
  })
  const [stats, setStats] = useState<UserStats>({
    totalUsers: 0,
    totalAdmins: 0,
    totalRegularUsers: 0
  })

  // Load users when component mounts
  useEffect(() => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
    setUsers(registeredUsers)
    updateStats(registeredUsers)
  }, [])

  const updateStats = (userList: User[]) => {
    setStats({
      totalUsers: userList.length,
      totalAdmins: userList.filter(user => user.role === 'admin').length,
      totalRegularUsers: userList.filter(user => user.role === 'user').length
    })
  }

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault()
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      role: newUser.role,
      createdAt: new Date().toISOString()
    }
    
    const updatedUsers = [...users, user]
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers))
    setUsers(updatedUsers)
    updateStats(updatedUsers)
    setShowAddUser(false)
    setNewUser({ name: '', email: '', password: '', role: 'user' })
  }

  const handleDeleteUser = (userId: string) => {
    const updatedUsers = users.filter(user => user.id !== userId)
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers))
    setUsers(updatedUsers)
    updateStats(updatedUsers)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#44bcd8]">User Management</h2>
        <button
          onClick={() => setShowAddUser(true)}
          className="bg-[#2ecc71] text-white px-4 py-2 rounded-lg hover:bg-[#2ecc71]/90"
        >
          Add User
        </button>
      </div>

      {/* User List */}
      <div className="bg-[#1a2633] rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-[#44bcd8]/10">
          <thead className="bg-[#44bcd8]/5">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#44bcd8]/10">
            {users.map(user => (
              <tr key={user.id}>
                <td className="px-6 py-4 text-sm text-gray-300">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-300">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-300">{user.role}</td>
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-[#1a2633] p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-medium text-[#44bcd8] mb-4">Add New User</h3>
            <form onSubmit={handleAddUser} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                className="w-full p-2 bg-[#0c141c] border border-[#44bcd8]/30 rounded text-gray-300"
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                className="w-full p-2 bg-[#0c141c] border border-[#44bcd8]/30 rounded text-gray-300"
              />
              <input
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                className="w-full p-2 bg-[#0c141c] border border-[#44bcd8]/30 rounded text-gray-300"
              />
              <select
                value={newUser.role}
                onChange={e => setNewUser({ ...newUser, role: e.target.value as 'admin' | 'user' })}
                className="w-full p-2 bg-[#0c141c] border border-[#44bcd8]/30 rounded text-gray-300"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddUser(false)}
                  className="px-4 py-2 text-gray-400 hover:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2ecc71] text-white rounded hover:bg-[#2ecc71]/90"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 