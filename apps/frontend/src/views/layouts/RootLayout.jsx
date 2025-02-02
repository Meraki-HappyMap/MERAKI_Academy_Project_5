import { Outlet, NavLink } from "react-router";

// TODO:Implement Guard System and AuthGuard Provider

const RootLayout = () => {
  return (
    // <AuthGuard>
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-3">
          <ul className="flex gap-6">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "text-gray-600 hover:text-blue-600"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/explore"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "text-gray-600 hover:text-blue-600"
                }
              >
                Explore
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "text-gray-600 hover:text-blue-600"
                }
              >
                Profile
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-100">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          <p>© 2024 HappyMap. All rights reserved.</p>
        </div>
      </footer>
    </div>
    // </AuthGuard>
  );
};

export default RootLayout;
