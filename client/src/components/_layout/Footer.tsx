export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 px-16 font-sans tracking-wide">
    <div className="flex justify-between items-center max-lg:flex-col text-center flex-wrap gap-4">
      <p className="text-[15px] leading-loose">CSSE HMS.  All rights reserved.</p>

      <ul className="flex space-x-6 gap-y-2 max-lg:justify-center flex-wrap">
        <li><a href="#" className="text-[15px] hover:text-white">Terms of Service</a></li>
        <li><a href="#" className="text-[15px] hover:text-white">Privacy Policy</a></li>
        <li><a href="#" className="text-[15px] hover:text-white">Contact</a></li>
      </ul>
    </div>
  </footer>
  )
}
