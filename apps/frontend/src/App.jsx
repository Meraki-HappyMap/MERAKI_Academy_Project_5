import { Routes, Route, Navigate } from "react-router";
import { ThemeProvider } from "./components/theme/theme-provider";
import { AuthGuard } from "./lib/AuthGuard";
import { useSelector } from "react-redux";

import {
  HomePage,
  ExplorePage,
  ProfilePage,
  SigninPage,
  RoleSelectionPage,
  NotFoundPage,
  OopsPage,
  PlaceDetailedPage,
} from "./views/pages";

import RootLayout from "./views/layouts/RootLayout";
import OwnersLayout from "./views/layouts/OwnersLayout";
// import PageTransition from "./components/PageTransition";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <ThemeProvider defaultTheme="system" storageKey="happymap-theme">
      <Routes>
        {/* Public routes */}
        <Route
          path="signin"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <SigninPage />
          }
        />

        {/* TODO: add a 404 page and 500 page with redirect button to home */}
        <Route path="/oops" element={<OopsPage />} />
        <Route path="/404" element={<NotFoundPage />} />

        <Route
          path="role-selection"
          element={
            <AuthGuard>
              {user?.role !== "unassigned" ? (
                <Navigate to="/" replace />
              ) : (
                <RoleSelectionPage />
              )}
            </AuthGuard>
          }
        />

        {/* Protected routes */}

        {/* Root layout */}
        {/* <Route element={<PageTransition />}> */}
        <Route element={<RootLayout />}>
          {
            <Route
              index
              element={
                isAuthenticated && user?.role === "unassigned" ? (
                  <Navigate to="/role-selection" replace />
                ) : (
                  <HomePage />
                )
              }
            />
          }
          <Route path="explore" element={<ExplorePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="place/:id" element={<PlaceDetailedPage />} />
          <Route path="category/gaming" element={<PlaceDetailedPage />} />
          <Route path="category/cafes" element={<Navigate to="/owners" />} />
        </Route>

        {/* Owners routes */}
        <Route
          path="owners"
          element={
            <AuthGuard>
              <OwnersLayout />
            </AuthGuard>
          }
        >
          <Route index element={<div>Owner Dashboard</div>} />
        </Route>
        {/* </Route> */}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
