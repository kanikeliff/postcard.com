import { RouterProvider } from "react-router-dom";
import { router } from "./router";

/**
 * Providers — uygulamanın tüm global provider'larını saran wrapper.
 * İleride auth, theme, query client gibi provider'lar buraya eklenir.
 *
 * Kullanım (main.jsx):
 *   <Providers />
 */
export default function Providers() {
  return <RouterProvider router={router} />;
}import { RouterProvider } from "react-router-dom";
import { router } from "./router";

/**
 * Providers — uygulamanın tüm global provider'larını saran wrapper.
 * İleride auth, theme, query client gibi provider'lar buraya eklenir.
 *
 * Kullanım (main.jsx):
 *   <Providers />
 */
export default function Providers() {
  return <RouterProvider router={router} />;
}