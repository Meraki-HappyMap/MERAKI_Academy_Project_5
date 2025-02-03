import { Outlet } from "react-router";
import Navbar from "@/components/layout/Navbar";

// TODO:Implement Guard System and AuthGuard Provider

const RootLayout = () => {
  return (
    // <AuthGuard>
    <div className="min-h-screen flex flex-col">
      <Navbar />
      

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-400">
          <p>© 2024 HappyMap. All rights reserved.</p>
        </div>
      </footer>
    </div>
    // </AuthGuard>
  );
};

export default RootLayout;
