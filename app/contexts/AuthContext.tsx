'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

interface User {
  email: string
  name: string
  avatar?: string
  role: 'admin' | 'user'
  password?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        setUser(userData)
        setIsAuthenticated(true)
      } catch (error) {
        localStorage.removeItem('user')
      }
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      const publicPaths = ['/', '/login', '/signup']
      const adminPaths = ['/admin', '/admin/dashboard']
      
      if (!isAuthenticated && !publicPaths.includes(pathname)) {
        router.push('/login')
      } else if (isAuthenticated) {
        const userRole = user?.role
        
        // Check if user is admin and on a non-admin path
        if (userRole === 'admin' && !adminPaths.some(path => pathname.startsWith(path))) {
          router.push('/admin/dashboard')
        } else if (userRole === 'user' && adminPaths.some(path => pathname.startsWith(path))) {
          router.push('/dashboard')
        }
      }
    }
  }, [isAuthenticated, pathname, isLoading, router, user])

  const login = async (email: string, password: string): Promise<void> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Check for admin credentials first
      if (email === 'kaleab1621@gmail.com' && password === 'kbholic1621') {
        const userData = {
          email,
          name: 'Kaleab',
          role: 'admin' as const
        }
        setUser(userData)
        setIsAuthenticated(true)
        localStorage.setItem('user', JSON.stringify(userData))
        document.cookie = `user=${JSON.stringify(userData)}; path=/; max-age=86400`
        await router.push('/admin/dashboard')
        return
      }

      // Check for registered users
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
      const matchedUser = registeredUsers.find((u: any) => u.email === email && u.password === password)
      
      if (matchedUser) {
        const userData: User = {
          email: matchedUser.email,
          name: matchedUser.name,
          role: matchedUser.role
        }
        setUser(userData)
        setIsAuthenticated(true)
        localStorage.setItem('user', JSON.stringify(userData))
        document.cookie = `user=${JSON.stringify(userData)}; path=/`
        await router.push(userData.role === 'admin' ? '/admin/dashboard' : '/dashboard')
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      console.error('Login error:', error)
      throw new Error('Login failed')
    }
  }

  const logout = () => {
    try {
      localStorage.removeItem('user')
      document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
      setUser(null)
      setIsAuthenticated(false)
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 