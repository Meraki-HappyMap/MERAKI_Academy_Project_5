import { Outlet } from "react-router";
import { AuthGuard } from "@/lib/AuthGuard";

import Navbar from "@/components/layout/Navbar";
import Categories from "@/components/layout/Categories";

const RootLayout = () => {
  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 transition-colors duration-300">
        <Navbar />
        <div className="pt-20">
          <Categories />
        </div>

        {/* Main Content */}
        <main className="flex-grow max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600 dark:text-gray-400">
            <p>© 2025 HappyMap. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </AuthGuard>
  );
};

export default RootLayout;
