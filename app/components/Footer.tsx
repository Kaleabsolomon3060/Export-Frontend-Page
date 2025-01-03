export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-400 text-sm">
          © {currentYear} Nefas Silk Paints Factory Plc. All rights reserved.
        </p>
      </div>
    </footer>
  )
} 