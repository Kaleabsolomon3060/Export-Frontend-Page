import AuthNavbar from '../components/AuthNavbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0c141c]">
      <AuthNavbar />
      <main className="flex-grow max-w-7xl mx-auto w-full py-6 sm:px-6 lg:px-8">
        {children}
      </main>
      <footer className="border-t border-[#44bcd8]/10">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-full bg-[#44bcd8]/10 flex items-center justify-center">
                <span className="text-[#44bcd8] text-sm font-bold">N</span>
              </div>
              <span className="text-[#44bcd8]/70 text-sm font-medium">
                Nefas Silk Paints Factory Plc
              </span>
            </div>
            <p className="text-[#44bcd8]/40 text-xs">
              © {new Date().getFullYear()} All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
} 