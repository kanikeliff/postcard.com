 import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import CreatePostcardPage from "../pages/CreatePostcardPage";
import PublicPostcardPage from "../pages/PublicPostcardPage";
import SentPage from "../pages/SentPage";
import NotFoundPage from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "create", element: <CreatePostcardPage /> },
      { path: "sent", element: <SentPage /> },
      { path: "p/:shareToken", element: <PublicPostcardPage /> },
    ],
  },
]);
