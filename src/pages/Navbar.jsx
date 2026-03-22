function Navbar({ userName = "Admin" }) {
  const companyName = "FashionHub"; // Hardcoded name

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-500 shadow-lg flex items-center px-6 z-50">
      {/* Empty space to balance center alignment */}
      <div className="w-24 md:w-32"></div>

      {/* Company Name - Centered */}
      <div className="flex-1 text-center">
        <h1 className="text-white font-extrabold text-2xl md:text-3xl tracking-wider drop-shadow-lg">
          {companyName} Admin
        </h1>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3 w-24 md:w-32 justify-end">
        <span className="hidden md:inline text-white font-medium">
          Hello, {userName}
        </span>
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-purple-700 font-bold shadow">
          {userName.charAt(0).toUpperCase()}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
