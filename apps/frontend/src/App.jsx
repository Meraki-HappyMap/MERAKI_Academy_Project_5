import { Routes, Route, Navigate } from "react-router";
import { ThemeProvider } from "./components/theme/theme-provider";
import { AuthGuard } from "./lib/AuthGuard";
// import { useSelector } from "react-redux";

import {
  HomePage,
  ExplorePage,
  ProfilePage,
  SigninPage,
  RoleSelectionPage,
} from "./views/pages";

import RootLayout from "./views/layouts/RootLayout";
import PageTransition from "./components/PageTransition";

function App() {
  // const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <ThemeProvider defaultTheme="system" storageKey="happymap-theme">
      <Routes>
        {/* public routes */}
        <Route path="signin" element={<SigninPage />} />

        {/* TODO: add a 404 page and 500 page with redirect button to home */}
        <Route path="/oops" element={<div>Oops</div>} />
        <Route path="/404" element={<div>404</div>} />

        {/* private routes */}
        <Route
          path="role-selection"
          element={
            <AuthGuard>
              <RoleSelectionPage />
            </AuthGuard>
          }
        />

        <Route element={<PageTransition />}>
          <Route element={<RootLayout />}>
            {/* <Route
              index
              element={
                isAuthenticated && user?.role === "unassigned" ? (
                  <Navigate to="/role-selection" replace />
                ) : (
                  <HomePage />
                )
              }
            /> */}
            <Route index element={<Navigate to="/role-selection" replace />} />
            <Route path="explore" element={<ExplorePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="category/gaming" element={<HomePage />} />
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
