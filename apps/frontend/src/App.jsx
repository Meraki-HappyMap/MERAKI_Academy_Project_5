import { Routes, Route } from "react-router";
import { ThemeProvider } from "./components/theme/theme-provider";

// Layouts
import RootLayout from "./views/layouts/RootLayout";

// Pages
import {
  HomePage,
  ExplorePage,
  ProfilePage,
  LoginPage,
  RegisterPage,
} from "./views/pages";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="happymap-theme">
      <Routes>
        {/* public routes */}
        <Route path="register" element={<RegisterPage />} />
        <Route path="signin" element={<LoginPage />} />

        {/* TODO: add a 404 page and 500 page with redirect button to home */}
        <Route path="/oops" element={<div>Oops</div>} />
        <Route path="/404" element={<div>404</div>} />

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
