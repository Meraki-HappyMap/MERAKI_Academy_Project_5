import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function LoginForm({ className, ...props }) {
  const loginWithGoogle = (e) => {
    e.preventDefault();
    const backendUrl = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, "");
    window.location.href = `${backendUrl}/auth/google`;
  };

  return (
    <div className={cn("w-full max-w-sm mx-auto", className)} {...props}>
      <Card className="backdrop-blur-xl bg-white/10 border-white/20">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center space-y-2">
              <h1 className="text-2xl font-bold text-white">Welcome back</h1>
              <p className="text-sm text-gray-400">
                Login to your HappyMap account
              </p>
            </div>

            <div className="grid gap-4">
              <Button
                variant="outline"
                className="w-full bg-white/10 hover:bg-white/20 border-white/20 text-white"
                onClick={loginWithGoogle}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Continue with Google
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-transparent px-2 text-gray-400">
                    or continue with
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full bg-white/10 hover:bg-white/20 border-white/20 text-white"
                disabled
              >
                <svg
                  className="w-5 h-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09z"
                    fill="currentColor"
                  />
                </svg>
                Coming Soon ...
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <p className="mt-4 text-center text-sm text-gray-400">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline hover:text-white">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline hover:text-white">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
