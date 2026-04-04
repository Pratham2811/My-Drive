import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { ProfilePage } from "./pages/ProfilePage";
import LoginPage from "./pages/auth/LoginPage";
import { Toaster } from "sonner";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginForm from "./features/auth/login/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./features/auth/thunks/sessionThunk";
import { getIntegrationsInfo } from "./features/appIntegrations/slice/integrationThunk";
import { useEffect, useState } from "react";
import ExplorerPage from "./pages/ExplorerPage";
import ProtectedRoute from "./ProtectedRoute";
import UserManagementPage from "./pages/UserManagmentPage";
import { Spinner } from "./shared/components/ui/Spinner";
import ExplorerView from "./features/Explorer/components/ExplorerView";
import AdminRoute from "./utils/AdminRoute";

function App() {
  const dispatch = useDispatch();
  const [appReady, setAppReady] = useState(false);
  const { status, user } = useSelector((state) => state.auth);
  useEffect(() => {
    const bootstrap = async () => {
      try {
        const response = await dispatch(getUser()).unwrap();
        await dispatch(getIntegrationsInfo()).unwrap();
      } catch (error) {
        console.log(error);
      } finally {
        setAppReady(true);
      }
    };

    bootstrap();
  }, []);

  if (!appReady) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <Toaster richColors position="top-right" />

      <Routes>
        {/* public routes */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<ExplorerPage />}>
            {/* Explorer */}
            <Route index element={<ExplorerView />} />
            <Route path=":dirId" element={<ExplorerView />} />

            {/* Google Drive */}
            <Route path="gdrive" element={<ExplorerView />} />
            <Route path="gdrive/:dirId" element={<ExplorerView />} />

            {/* Other Pages */}
            <Route path="user-profile" element={<ProfilePage />} />
            <Route element={<AdminRoute />}>
              <Route path="admin/users" element={<UserManagementPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
