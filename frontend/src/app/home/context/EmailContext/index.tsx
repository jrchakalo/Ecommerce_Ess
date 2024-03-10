import { createContext, ReactNode, useReducer, useMemo } from "react";
import { EmailState } from "./types";
import EmailService from "./service";
import emailStateReducer from "./reducer";
import { ApiService } from "../../../../shared/services/ApiService";
import RequestStatus from "../../../../shared/types/request-status";
import usePrevious from "../../../../shared/hooks/usePrevious";

interface EmailContextProps {
  state: EmailState;
  prevState?: EmailState;
  service: EmailService;
}

export const EmailContext = createContext<EmailContextProps>(
  {} as EmailContextProps
);

interface EmailProviderProps {
  children: ReactNode;
}

export const EmailProvider = ({ children }: EmailProviderProps) => {
  const [state, dispatch] = useReducer(emailStateReducer, {
    createEmailRequestStatus: RequestStatus.idle(),
    getEmailRequestStatus: RequestStatus.idle(),
    getEmailSpamRequestStatus: RequestStatus.idle(),
  });

  const prevState = usePrevious(state);

  const apiService = useMemo(() => {
    return new ApiService({});
  }, []);
  const service = useMemo(
    () =>
      new EmailService({
        apiService,
        dispatch,
      }),
    [apiService]
  );

  return (
    <EmailContext.Provider
      value={{
        state,
        prevState,
        service,
      }}
    >
      {children}
    </EmailContext.Provider>
  );
};
