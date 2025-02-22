import { Routes, Route, Navigate } from "react-router";
import { ThemeProvider } from "./components/theme/theme-provider";
import { AuthGuard } from "./lib/AuthGuard";
import { useSelector } from "react-redux";

import {
  HomePage,
  ExplorePage,
  SigninPage,
  RoleSelectionPage,
  NotFoundPage,
  OopsPage,
  PlaceDetailedPage,
  ManageBookingPage,
  ManageBookingForUser,
  OwnerProfilePage,
  AddPlacePage,
  CategoryPage,
  UserProfilePage,
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
          <Route path="me" element={<UserProfilePage />} />
          <Route path="place/:id" element={<PlaceDetailedPage />} />
          <Route path="category/fitness" element={<ManageBookingPage />} />
          <Route path="category/parks" element={<AddPlacePage />} />
          <Route path="category/sports" element={<ManageBookingForUser />} />
          <Route path="category/cafes" element={<Navigate to="/owners" />} />
          <Route path="category/Camping" element={<OwnerProfilePage />} />
          <Route path="category/:categorySlug" element={<CategoryPage />} />
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

        {/* Error pages */}
        <Route path="oops" element={<OopsPage />} />
        <Route path="404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
