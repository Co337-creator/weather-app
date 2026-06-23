import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
