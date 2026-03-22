import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Sidebar({ children }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Dashboard", path: "/" },
    { name: "Employees", path: "/employees" },
    { name: "Inventory", path: "/inventory" },
    { name: "Orders", path: "/orders" },
    { name: "logout", path: "/logout" },
    { name: "invoice", path: "/invoice" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-[9999] bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 text-white px-4 py-2 rounded-lg shadow-lg"
      >
        Menu
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-0 left-0 w-64 
        bg-gradient-to-b from-purple-700 via-indigo-600 to-blue-500 
        text-white min-h-screen shadow-lg p-6 
        transform transition-transform duration-300 z-[9998]
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Title */}
        <h1 className="text-2xl font-bold mb-6 tracking-wide">Admin Panel</h1>

        {/* Links */}
        <ul className="space-y-3 overflow-y-auto max-h-[calc(100vh-80px)]">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                onClick={() => setOpen(false)}
                className={`block p-3 rounded-lg font-medium transition-all duration-300 ${
                  location.pathname === link.path
                    ? "bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600 shadow-lg"
                    : "hover:bg-gradient-to-r hover:from-purple-400 hover:via-indigo-400 hover:to-blue-400"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="absolute bottom-6 left-6 text-sm opacity-80">
          &copy; 2026 Fashion Hub
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 bg-black/30 md:hidden z-[9997]"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 md:ml-10 p-4 sm:p-6 pt-20 md:pt-6 overflow-auto">
        {children}
      </div>
    </div>
  );
}

export default Sidebar;
