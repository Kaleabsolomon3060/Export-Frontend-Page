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
      if (!isAuthenticated && !publicPaths.includes(pathname)) {
        router.push('/login')
      } else if (isAuthenticated && publicPaths.includes(pathname)) {
        router.push('/dashboard')
      }
    }
  }, [isAuthenticated, pathname, isLoading, router])

  const login = async (email: string, password: string): Promise<void> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock successful login
      const userData = {
        email,
        name: email.split('@')[0],
      }
      
      // Store user data
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      setIsAuthenticated(true)

      // Set a cookie for middleware auth check
      document.cookie = `user=${JSON.stringify(userData)}; path=/`
      
      // Redirect to dashboard after login
      router.push('/dashboard')
      
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