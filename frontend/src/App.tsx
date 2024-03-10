import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTest from "./app/home/pages/CreateTest";
import ListTests from "./app/home/pages/ListTests";
import CreateUser from "./app/home/pages/CreateUser";
import ListUsers from "./app/home/pages/ListUsers";
import UpdateUser from "./app/home/pages/UpdateUser";
import HomePage from "./app/home/pages/HomePage";
import EmailsPage from "./app/home/pages/ListEmails";
import EmailsSpam from "./app/home/pages/ListEmailsSpam";

const router = createBrowserRouter([
  {
    path: "*",
    Component: HomePage,
  },
  {
    path: "/home",
    Component: HomePage,
  },
  {
    path: "/create-test",
    Component: CreateTest,
  },
  {
    path: "/tests",
    Component: ListTests,
  },
  {
    path: "/create-user",
    Component: CreateUser,
  },
  {
    path: "/users",
    Component: ListUsers,
  },
  {
    path: "/update-user/:id",
    Component: UpdateUser,
  },
  {
    path: "/emails",
    Component: EmailsPage,
  },
  {
    path: "/emailsSpam",
    Component: EmailsSpam,
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
