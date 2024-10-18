export const Header = () => {
  return (
    <nav className="bg-blue-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <a href="/">
              <img src="./logo.png" alt="HLink" className="h-8" />
            </a>
          </div>
          <div className="flex space-x-8">
            <a href="/digital-card-issuance" className="text-gray-500 hover:text-blue-600 flex items-center">
              <span className="inline-block ml-1">My Profile</span>
            </a>
            <a href="/appointment-management" className="text-gray-500 hover:text-blue-600 flex items-center">
              <span className="inline-block ml-1">Appointments</span>
            </a>
            <a href="/recode-management" className="text-gray-500 hover:text-blue-600 flex items-center">
              <span className="inline-block ml-1">My Medical Records</span>
            </a>
            <a href="/payment-management" className="text-gray-500 hover:text-blue-600 flex items-center">
              <span className="inline-block ml-1">My Payment History</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
