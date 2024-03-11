import { createContext, ReactNode, useReducer, useMemo } from "react";
import {PromocaoState } from "./types";
import PromocaoService from "./service";
import promocaoStateReducer from "./reducer";
import { ApiService } from "../../../../shared/services/ApiService";
import RequestStatus from "../../../../shared/types/request-status";
import usePrevious from "../../../../shared/hooks/usePrevious";

interface PromocaoContextProps {
  state:PromocaoState;
  prevState?:PromocaoState;
  service:PromocaoService;
}

export const PromocaoContext = createContext<PromocaoContextProps>(
  {} as PromocaoContextProps
);

interface PromocaoProviderProps {
  children: ReactNode;
}

export const PromocaoProvider = ({ children }:PromocaoProviderProps) => {
  const [state, dispatch] = useReducer(promocaoStateReducer, {
    createPromocaoRequestStatus: RequestStatus.idle(),
    getPromocaoRequestStatus: RequestStatus.idle(),
    updatePromocaoRequestStatus: RequestStatus.idle(),
  });

  const prevState = usePrevious(state);

  const apiService = useMemo(() => {
    return new ApiService({});
  }, []);
  const service = useMemo(
    () =>
      new PromocaoService({
        apiService,
        dispatch,
      }),
    [apiService]
  );

  return (
    <PromocaoContext.Provider
      value={{
        state,
        prevState,
        service,
      }}
    >
      {children}
    </PromocaoContext.Provider>
  );
};
