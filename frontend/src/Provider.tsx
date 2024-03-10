import { ReactNode } from "react";
import { HomeProvider } from "./app/home/context/HomeContext";
import { UserProvider } from "./app/home/context/UserContext";
import { LoginProvider } from "./app/home/context/LoginContext";
import { EmailProvider } from "./app/home/context/EmailContext";
import { CarrinhoProvider } from "./app/home/context/CarrinhoContext";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <CarrinhoProvider>
      <LoginProvider>
        <UserProvider>
          <EmailProvider>
            <HomeProvider>{children}</HomeProvider>
          </EmailProvider>
        </UserProvider>
      </LoginProvider>
    </CarrinhoProvider>
  );
};

export default Provider;
