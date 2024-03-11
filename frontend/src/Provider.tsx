import { ReactNode } from "react";
import { HomeProvider } from "./app/home/context/HomeContext";
import { UserProvider } from "./app/home/context/UserContext";
import { PromocaoProvider } from "./app/home/context/PromocaoContext";
import { LoginProvider } from "./app/home/context/LoginContext";
import { EmailProvider } from "./app/home/context/EmailContext";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <LoginProvider>    
      <UserProvider>
        <PromocaoProvider>
          <EmailProvider>
            <HomeProvider>{children}</HomeProvider>
          </EmailProvider>
        </PromocaoProvider>
      </UserProvider>
    </LoginProvider>
  );
};

export default Provider;
