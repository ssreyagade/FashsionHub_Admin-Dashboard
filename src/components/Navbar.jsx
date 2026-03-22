function Navbar({ userName = "Admin", companyName = "MyCompany" }) {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-500 shadow-lg flex justify-between items-center px-6 z-50">
      {/* Company / Logo */}
      <div className="text-white font-extrabold text-xl tracking-wide">
        {companyName} Admin
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3">
        <span className="hidden md:inline text-white font-medium">
          Hello, {userName}
        </span>
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-purple-700 font-bold">
          {userName.charAt(0).toUpperCase()}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
