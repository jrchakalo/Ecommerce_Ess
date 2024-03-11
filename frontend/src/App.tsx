import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateUser from "./app/home/pages/CreateUser";
import UpdateUser from "./app/home/pages/UpdateUser";
import CreatePromocao from "./app/home/pages/CreatePromocao";
import UpdatePromocao from "./app/home/pages/UpdatePromocao";
import HomePage from "./app/home/pages/HomePage";
import EmailsPage from "./app/home/pages/ListEmails";
import EmailsSpam from "./app/home/pages/ListEmailsSpam";
import Login from "./app/home/pages/Login";
import UserProfile from "./app/home/pages/UserProfile";
import Logout from "./app/home/pages/Logout";
import PromocaoProfile from "./app/home/pages/PromocaoProfile";
import ListPromocoes from "./app/home/pages/ListPromocoes";
import ListPromocoesUser from "./app/home/pages/ListPromocoesUser";

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
    path: "/create-user",
    Component: CreateUser,
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
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/profile/:id",
    Component: UserProfile
  },
  {
    path: "/logout/:id",
    Component: Logout
  },
  {
    path: "/update-promocao/:id",
    Component: UpdatePromocao,
  },
  {
    path: "/create-promocao",
    Component: CreatePromocao,
  },
  {
    path: "/promocao/:id",
    Component: PromocaoProfile,
  },
  {
    path: "/promocoes",
    Component: ListPromocoes,
  },
  {
    path: "/promocoes/user/:id",
    Component: ListPromocoesUser,
  },
]); 

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
