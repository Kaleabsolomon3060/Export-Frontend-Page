import AuthNavbar from '../components/AuthNavbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <AuthNavbar />
      <main className="flex-grow max-w-7xl mx-auto w-full py-6 sm:px-6 lg:px-8">
        {children}
      </main>
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 shadow-inner">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-100 to-purple-50 
                flex items-center justify-center shadow-inner">
                <span className="text-purple-600 text-sm font-bold">N</span>
              </div>
              <span className="text-gray-600 text-sm font-medium">
                Nefas Silk Paints Factory Plc
              </span>
            </div>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
              <span>•</span>
              <span>Contact</span>
            </div>
            <p className="text-gray-400 text-xs">
              © {new Date().getFullYear()} All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
} 