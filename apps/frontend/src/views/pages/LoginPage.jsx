import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const loginWithGoogle = (e) => {
    e.preventDefault();
    const backendUrl = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, "");
    window.location.href = `${backendUrl}/auth/google`;
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <p className="mt-4 text-center text-gray-600">
          <Button variant="outline" onClick={loginWithGoogle} className="w-52">
            Login with Google
          </Button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
