import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import CreatePostcardPage from "../pages/CreatePostcardPage";
import PublicPostcardPage from "../pages/PublicPostcardPage";
import SentPage from "../pages/SentPage";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from "../pages/ProfilePage";
import InboxPage from "../pages/InboxPage";
import ProtectedRoute from "../components/ui/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "p/:shareToken", element: <PublicPostcardPage /> },
      { path: "create", element: <ProtectedRoute><CreatePostcardPage /></ProtectedRoute> },
      { path: "sent", element: <ProtectedRoute><SentPage /></ProtectedRoute> },
      { path: "profile", element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },
      { path: "inbox", element: <ProtectedRoute><InboxPage /></ProtectedRoute> },
    ],
  },
]);
